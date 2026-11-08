/* Trivia Lens™ — full prototype (v1.4 build pass).
   Static, zero network, everything in localStorage key `triviaLens.v1`.
   Game engine, banks, lifelines, streaks, daily challenge and challenge links
   ported from the v1.3 build in ~/workspace/your_files/infinite-trivia/;
   the category WHEEL is new here, per wheel-feature-spec.md (Oct 23, 2026). */
(function () {
  "use strict";
  var LS_KEY = "triviaLens.v1";
  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return Array.from(document.querySelectorAll(s)); };
  var CATS = TRIVIA_CATS.map(function (c) { return c.name; });
  var QTIME = 20, ROUND_N = 10;

  /* ================= persisted state ================= */
  function defaults() {
    return {
      settings: { name: "", level: "High School", sound: true, lensers: false },
      records: { rounds: 0, partyGames: 0, totalCorrect: 0, totalAnswered: 0, bestStreak: 0, bestPct: 0, wheelSpins: 0, wheelRounds: 0, perfectRounds: 0 },
      earned: {},
      history: [],
      wheelHistory: []
    };
  }
  var S = defaults();
  (function load() {
    try {
      var saved = JSON.parse(localStorage.getItem(LS_KEY) || "null");
      if (saved) {
        if (saved.settings) Object.keys(S.settings).forEach(function (k) { if (typeof saved.settings[k] === typeof S.settings[k]) S.settings[k] = saved.settings[k]; });
        if (saved.records) Object.keys(S.records).forEach(function (k) { if (typeof saved.records[k] === "number") S.records[k] = saved.records[k]; });
        if (saved.earned && typeof saved.earned === "object") S.earned = saved.earned;
        if (Array.isArray(saved.history)) S.history = saved.history;
        if (Array.isArray(saved.wheelHistory)) S.wheelHistory = saved.wheelHistory;
      }
    } catch (e) { /* fresh marquee */ }
  })();
  function save() { try { localStorage.setItem(LS_KEY, JSON.stringify(S)); } catch (e) {} }
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function toast(msg) { var t = $("#toast"); t.textContent = msg; t.hidden = false; clearTimeout(t._h); t._h = setTimeout(function () { t.hidden = true; }, 2800); }

  /* ================= views / family / wire ================= */
  function showView(name) {
    $$(".view").forEach(function (v) { v.classList.toggle("active", v.id === "view-" + name); });
    $$("#mainTabs .tab").forEach(function (b) { b.classList.toggle("active", b.getAttribute("data-view") === name); });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  $$("#mainTabs .tab").forEach(function (b) { b.addEventListener("click", function () { showView(b.getAttribute("data-view")); }); });
  $$("[data-goto]").forEach(function (b) { b.addEventListener("click", function () { showView(b.getAttribute("data-goto")); }); });
  $("#familyGlassBtn").addEventListener("click", function () {
    var p = $("#familyPanel"), open = p.hidden;
    p.hidden = !open; this.setAttribute("aria-expanded", String(open));
  });

  var wireIdx = 0, wirePaused = false;
  function renderWire() {
    var w = TRIVIA_WIRE[wireIdx % TRIVIA_WIRE.length];
    $("#tickerText").innerHTML = esc(w.text) + ' &nbsp;<span class="sampletag">' + esc(w.tag) + "</span>";
  }
  renderWire();
  setInterval(function () { if (!wirePaused) { wireIdx++; var el = $("#tickerText"); el.style.opacity = "0"; setTimeout(function () { renderWire(); el.style.opacity = "1"; }, 300); } }, 4600);
  $("#tickerPause").addEventListener("click", function () { wirePaused = !wirePaused; this.textContent = wirePaused ? "▶" : "❚❚"; });

  /* teaser rotation (ported) */
  var TEASERS = ["How many hearts does an octopus have?", "Which metal is liquid at room temperature?", "What gas makes a balloon float?", "How many points is a touchdown worth?", "Which planet is called the Red Planet?", "How many strings does a guitar have?"];
  var teaserIdx = 0;
  setInterval(function () {
    var el = $("#teaser"); el.classList.add("fade");
    setTimeout(function () { teaserIdx = (teaserIdx + 1) % TEASERS.length; $("#teaserQ").textContent = TEASERS[teaserIdx]; el.classList.remove("fade"); }, 360);
  }, 4200);

  /* marquee bulbs — the signature animation */
  var bulbTimer = null, bulbPhase = 0;
  function buildBulbs() {
    ["bulbsTop", "bulbsBottom"].forEach(function (id) {
      var row = document.getElementById(id); row.innerHTML = "";
      for (var i = 0; i < 18; i++) { var b = document.createElement("i"); if (i % 2 === 0) b.className = "on"; row.appendChild(b); }
    });
  }
  function chaseBulbs(speedMs) {
    if (bulbTimer) clearInterval(bulbTimer);
    bulbTimer = setInterval(function () {
      bulbPhase = 1 - bulbPhase;
      $$(".bulbs i").forEach(function (b, i) { b.classList.toggle("on", (i % 2 === 0) === (bulbPhase === 0)); });
    }, speedMs);
  }
  buildBulbs(); chaseBulbs(650);

  /* confetti (ported) */
  var cv = $("#confetti"), ctx = cv.getContext("2d"), parts = [], raf = null;
  function sizeCanvas() { cv.width = innerWidth; cv.height = innerHeight; }
  addEventListener("resize", sizeCanvas); sizeCanvas();
  function burst(n, power) {
    var colors = ["#f2a93b", "#ffd34d", "#22c55e", "#fff8e7", "#ef4444", "#7c3aed", "#db2777", "#2563eb"];
    for (var i = 0; i < n; i++) parts.push({ x: innerWidth / 2 + (Math.random() - .5) * innerWidth * .4, y: innerHeight * .35, vx: (Math.random() - .5) * 10 * (power || 1), vy: -Math.random() * 9 - 3, g: .28 + Math.random() * .12, s: 5 + Math.random() * 6, r: Math.random() * Math.PI, vr: (Math.random() - .5) * .3, c: colors[i % colors.length], life: 70 + Math.random() * 40 });
    if (!raf) tickConfetti();
  }
  function tickConfetti() {
    ctx.clearRect(0, 0, cv.width, cv.height);
    parts = parts.filter(function (p) { return p.life > 0; });
    parts.forEach(function (p) { p.x += p.vx; p.y += p.vy; p.vy += p.g; p.r += p.vr; p.life--; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * .62); ctx.restore(); });
    raf = parts.length ? requestAnimationFrame(tickConfetti) : (ctx.clearRect(0, 0, cv.width, cv.height), null);
  }

  /* ================= question pool (ported) ================= */
  function poolFor(cat, lvl) {
    var mc = ((QUESTION_BANK[cat] || {})[lvl] || []).map(function (q) { return { type: "mc", q: q.q, choices: q.choices, answer: q.answer, why: q.why }; });
    var fb = ((FIB_BANK[cat] || {})[lvl] || []).map(function (q) { return { type: "fib", q: q.q, accept: q.accept, why: q.why }; });
    return mc.concat(fb);
  }
  function shuffle(a, rng) { var arr = a.slice(), r = rng || Math.random; for (var i = arr.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)); var t = arr[i]; arr[i] = arr[j]; arr[j] = t; } return arr; }
  function mulberry32(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function norm(s) { return String(s || "").toLowerCase().trim().replace(/[.!?]+$/, "").replace(/\s+/g, " ").replace(/^the /, ""); }
  function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

  /* ================= badges ================= */
  var BADGES = [
    { id: "perfect", icon: "💯", name: "First Perfect Round", desc: "A flawless 10 of 10 in a solo, daily, or wheel round.", test: function () { return S.records.perfectRounds >= 1; }, prog: function () { return S.records.perfectRounds ? "" : "No perfect round yet — one clean run takes it."; } },
    { id: "wheel", icon: "🎡", name: "Wheel Debut", desc: "Your first round dealt by the category wheel.", test: function () { return S.records.wheelRounds >= 1; }, prog: function () { return S.records.wheelRounds ? "" : "Spin the wheel and play the arena it lands on."; } },
    { id: "streak3", icon: "🔥", name: "Hot Streak", desc: "Three correct answers in a row, in any round.", test: function () { return S.records.bestStreak >= 3; }, prog: function () { return "Best streak so far: " + S.records.bestStreak + " of 3"; } },
    { id: "streak6", icon: "☄️", name: "On Fire", desc: "Six correct answers in a row, in any round.", test: function () { return S.records.bestStreak >= 6; }, prog: function () { return "Best streak so far: " + S.records.bestStreak + " of 6"; } },
    { id: "regular", icon: "🎟️", name: "Stage Regular", desc: "Five rounds completed under the lights.", test: function () { return S.records.rounds + S.records.partyGames >= 5; }, prog: function () { return (S.records.rounds + S.records.partyGames) + " of 5 rounds completed"; } },
    { id: "host", icon: "🎉", name: "Party Host", desc: "A full party game played to a winner.", test: function () { return S.records.partyGames >= 1; }, prog: function () { return S.records.partyGames ? "" : "Finish one pass-the-phone party game."; } }
  ];
  function syncBadges(announce) {
    var today = new Date().toISOString().slice(0, 10), changed = false;
    BADGES.forEach(function (b) {
      if (b.test() && !S.earned[b.id]) { S.earned[b.id] = today; changed = true; if (announce) toast("🏅 Badge earned: " + b.name); }
    });
    if (changed) save();
    return changed;
  }
  function renderBadges() {
    $("#badgeGrid").innerHTML = BADGES.map(function (b) {
      var on = !!S.earned[b.id];
      return '<div class="badgecard' + (on ? " earned" : "") + '" data-badge="' + b.id + '"><div class="medallion">' + b.icon + '</div><h4>' + esc(b.name) + "</h4><p>" + esc(b.desc) + "</p>" +
        (on ? '<div class="earned-on">★ Earned ' + esc(S.earned[b.id]) + "</div>" : '<div class="progress">' + esc(b.prog()) + "</div>") + "</div>";
    }).join("");
  }

  /* ================= records ================= */
  function renderRecords() {
    var r = S.records;
    var acc = r.totalAnswered ? Math.round(r.totalCorrect / r.totalAnswered * 100) : 0;
    var stats = [
      [r.rounds, "Solo rounds"], [r.partyGames, "Party games"], [acc + "%", "Accuracy"],
      [r.bestStreak, "Best streak"], [r.bestPct + "%", "Best round"], [r.wheelSpins, "Wheel spins"]
    ];
    $("#recordGrid").innerHTML = stats.map(function (s) { return '<div class="rec-stat"><b>' + s[0] + "</b><span>" + s[1] + "</span></div>"; }).join("");
    $("#historyList").innerHTML = S.history.length
      ? S.history.slice(0, 6).map(function (h) { return '<div class="hist-row"><b>' + esc(h.cat) + "</b> · " + esc(h.lvl) + " · " + esc(h.mode) + " — <b>" + h.correct + "/" + h.total + "</b> (" + h.pct + "%) · " + esc(h.date) + "</div>"; }).join("")
      : '<p class="hint">No rounds on your record yet. The marquee is lit — take the stage.</p>';
    $("#wheelSpinCount").textContent = r.wheelSpins;
    $("#wheelRoundCount").textContent = r.wheelRounds;
    $("#wheelHistory").innerHTML = S.wheelHistory.slice(0, 5).map(function (h) { return '<div class="wheel-hist">🎡 ' + esc(h.label) + " · " + esc(h.date) + "</div>"; }).join("");
  }

  /* ================= Lensers (verdict: Later — opt-in preview only) ================= */
  var SAMPLE_LENSERS = [
    { name: "Marquee Meg", note: "Perfect round in The Spotlight", pts: 120 },
    { name: "Quiz Kid Rae", note: "9-streak in The Jukebox", pts: 105 },
    { name: "Professor P.", note: "Expert clears in The Lab", pts: 95 }
  ];
  function renderLensers() {
    var body = $("#lensersBody");
    if (!S.settings.lensers) {
      body.innerHTML = '<p class="hint">Trivia\'s community layer is <strong>Later</strong> by design — group play in the room comes first; leagues and season leaderboards land with multiplayer depth. Presence is <strong>off</strong> and stays off until you turn it on in Settings. Nobody is visible by default, ever.</p>';
      return;
    }
    var mine = S.records.totalCorrect * 10;
    body.innerHTML = '<p class="hint">You opted in — here is the <strong>shape</strong> of a future league board. Every other Lenser below is a demo, tagged Sample. Your row is your real on-device record.</p>' +
      SAMPLE_LENSERS.map(function (l) { return '<div class="lenser-row"><span>' + esc(l.name) + ' <span class="sampletag">Sample</span><br><span class="hint">' + esc(l.note) + '</span></span><b>' + l.pts + " pts</b></div>"; }).join("") +
      '<div class="lenser-row"><span><b>You</b>' + (S.settings.name ? " · " + esc(S.settings.name) : "") + '<br><span class="hint">' + S.records.rounds + ' rounds · best streak ' + S.records.bestStreak + '</span></span><b>' + mine + " pts</b></div>";
  }

  /* ================= setup wiring (ported) ================= */
  var G = {
    mode: "solo", category: S.settings.level ? CATS[0] : CATS[0], level: S.settings.level || "High School",
    players: [], target: 50, pool: [], deck: [], deckIdxs: [], drawIdx: 0,
    qNum: 0, soloTotal: ROUND_N, correct: 0, bonus: 0, points: 0,
    turn: 0, review: [], locked: false, current: null,
    streaks: {}, lifelines: {}, challenge: null, timer: null, timeLeft: QTIME, source: "stage"
  };
  G.category = CATS[0];
  function actorKey() { return G.mode === "party" ? "p" + G.turn : "solo"; }
  function streakOf(k) { return G.streaks[k] || 0; }

  function catChipHTML(cat, i) {
    var m = TRIVIA_CATS[i];
    return '<span class="cat-ico">' + m.icon + '</span><span class="cat-name">' + esc(cat) + '</span><span class="cat-nick">' + esc(m.arena) + "</span>";
  }
  CATS.forEach(function (cat, i) {
    var b = document.createElement("button");
    b.className = "chip cat-" + i + (i === 0 ? " on" : ""); b.innerHTML = catChipHTML(cat, i); b.dataset.cat = cat;
    b.addEventListener("click", function () { $$("#catChips .chip").forEach(function (c) { c.classList.remove("on"); }); b.classList.add("on"); G.category = cat; });
    $("#catChips").appendChild(b);
    var h = document.createElement("button");
    h.className = "chip cat-" + i; h.innerHTML = catChipHTML(cat, i); h.dataset.cat = cat;
    h.addEventListener("click", function () {
      $$("#houseChips .chip").forEach(function (c) { c.classList.remove("on"); }); h.classList.add("on");
      housePick = cat;
      $("#wheelResult").innerHTML = 'The house chose <span class="arena-name">' + esc(cat) + " — " + esc(TRIVIA_CATS[i].arena) + "</span>. Play it!";
      var pb = $("#playWheelBtn"); pb.classList.remove("hidden"); pb.textContent = "▶ Play " + cat;
    });
    $("#houseChips").appendChild(h);
  });
  function segWire(id, attr, fn) {
    $$("#" + id + " button").forEach(function (b) { b.addEventListener("click", function () { $$("#" + id + " button").forEach(function (x) { x.classList.remove("on"); }); b.classList.add("on"); fn(b.dataset[attr]); }); });
  }
  segWire("modeSeg", "mode", function (v) { G.mode = v; $("#partyOpts").classList.toggle("hidden", v !== "party"); });
  segWire("countSeg", "n", function (v) { var n = parseInt(v, 10); [1, 2, 3, 4].forEach(function (i) { $("#p" + i).classList.toggle("hidden", i > n); }); });
  segWire("targetSeg", "t", function (v) { G.target = parseInt(v, 10); });
  $$("#lvlChips .chip").forEach(function (b) { b.addEventListener("click", function () { $$("#lvlChips .chip").forEach(function (x) { x.classList.remove("on"); }); b.classList.add("on"); G.level = b.dataset.lvl; }); });
  function setLevel(lvl) {
    G.level = lvl;
    $$("#lvlChips .chip").forEach(function (ch) { ch.classList.toggle("on", ch.dataset.lvl === lvl); });
    $$("#setLvlSeg button").forEach(function (ch) { ch.classList.toggle("on", ch.dataset.lvl === lvl); });
  }
  var AGE2LVL = { kids: "Middle School", teen: "High School", adult: "High School", mixed: "High School" };
  var AGE_NOTES = {
    kids: "Young room: modern questions pitched at middle school — today's shows, games, and stars, nothing dusty.",
    teen: "Teen room: today's artists, games, and stars — pitched at high school, with Expert for the stretch. No 1950s deep cuts.",
    adult: "Adult room: the modern bank at high-school pitch. Bump the level to Expert for hard questions about the world you actually live in now.",
    mixed: "Mixed room: pitched mid-room so your youngest can score, and Expert is there when the adults want to sweat."
  };
  segWire("ageSeg", "age", function (v) { setLevel(AGE2LVL[v] || "High School"); var n = $("#ageNote"); if (n) n.textContent = AGE_NOTES[v] || ""; });

  /* challenge links (ported) */
  function encodeChallenge(o) { return btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); }
  function decodeChallenge(s) { try { return JSON.parse(decodeURIComponent(escape(atob(s.replace(/-/g, "+").replace(/_/g, "/"))))); } catch (e) { return null; } }
  var incoming = null;
  if (location.hash.indexOf("#c=") === 0) {
    var c0 = decodeChallenge(location.hash.slice(3));
    if (c0 && c0.cat && c0.lvl && Array.isArray(c0.idx)) incoming = c0;
  }
  if (incoming) {
    var bn = $("#challengeBanner"); bn.classList.remove("hidden");
    bn.innerHTML = "⚔️ <b>" + esc(incoming.name || "A friend") + "</b> challenged you at <b>" + esc(incoming.cat) + "</b> · <b>" + esc(incoming.lvl) + "</b> and scored <b>" + esc(String(incoming.score != null ? incoming.score : "?")) + "/10</b>. Same 10 questions — beat it!";
    G.category = incoming.cat; setLevel(incoming.lvl);
    $$("#catChips .chip").forEach(function (ch) { ch.classList.toggle("on", ch.dataset.cat === incoming.cat); });
    $("#startBtn").textContent = "⚔️ Accept the Challenge";
  }

  /* ================= decks (ported) ================= */
  function buildDeck() {
    G.pool = poolFor(G.category, G.level);
    var idxs = G.pool.map(function (_, i) { return i; });
    if (G.mode === "daily") {
      var now = new Date(), seed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
      G.deckIdxs = shuffle(idxs, mulberry32(seed)).slice(0, G.soloTotal);
    } else if (G.mode === "challenge" && incoming) {
      G.deckIdxs = incoming.idx.slice(0, G.soloTotal);
    } else {
      G.deckIdxs = shuffle(idxs);
    }
    G.deck = G.deckIdxs.map(function (i) { return G.pool[i]; });
    G.drawIdx = 0;
  }
  function draw() {
    if (G.drawIdx >= G.deck.length) {
      var idxs = shuffle(G.pool.map(function (_, i) { return i; }));
      G.deck = idxs.map(function (i) { return G.pool[i]; }); G.deckIdxs = idxs; G.drawIdx = 0;
    }
    return G.deck[G.drawIdx++];
  }

  /* ================= game flow (ported + records) ================= */
  function resetLifelines() {
    G.lifelines = {}; G.streaks = {};
    var keys = G.mode === "party" ? G.players.map(function (_, i) { return "p" + i; }) : ["solo"];
    keys.forEach(function (k) { G.lifelines[k] = { fifty: true, skip: true }; G.streaks[k] = 0; });
  }
  function startGame(modeOverride, opts) {
    opts = opts || {};
    if (modeOverride) G.mode = modeOverride;
    if (opts.category) {
      G.category = opts.category;
      $$("#catChips .chip").forEach(function (ch) { ch.classList.toggle("on", ch.dataset.cat === opts.category); });
    }
    G.source = opts.source || "stage";
    if (G.mode === "daily") {
      var now = new Date(), start = new Date(now.getFullYear(), 0, 0);
      var doy = Math.floor((now - start) / 86400000);
      G.category = CATS[doy % CATS.length];
    }
    if (G.mode === "challenge" && incoming) G.challenge = { name: incoming.name || "Your friend", score: incoming.score };
    buildDeck();
    G.qNum = 0; G.correct = 0; G.bonus = 0; G.points = 0; G.review = []; G.turn = 0;
    if (G.mode === "party") {
      var n = parseInt(($("#countSeg .on") || {}).dataset ? $("#countSeg .on").dataset.n : "2", 10);
      G.players = [];
      for (var i = 1; i <= n; i++) G.players.push({ name: ($("#p" + i).value || "").trim() || ("Player " + i), score: 0 });
      $("#board").classList.remove("hidden");
    } else { $("#board").classList.add("hidden"); }
    resetLifelines();
    showView("stage");
    $("#setup").classList.add("hidden"); $("#results").classList.add("hidden"); $("#game").classList.remove("hidden");
    nextQuestion();
  }
  function renderBoard() {
    var board = $("#board"); board.innerHTML = "";
    G.players.forEach(function (p, i) {
      var d = document.createElement("div"); d.className = "p" + (i === G.turn ? " act" : "");
      var nm = document.createElement("span"); nm.textContent = p.name + " ";
      var sc = document.createElement("b"); sc.textContent = p.score;
      d.appendChild(nm); d.appendChild(sc); board.appendChild(d);
    });
  }
  function renderStreak() {
    var el = $("#streakLine"), s = streakOf(actorKey());
    el.textContent = s >= 2 ? "🔥 Streak: " + s + " in a row" + (s % 3 === 2 ? " — one more for a +5 bonus!" : "") : "";
    el.classList.toggle("hot", s >= 3);
  }
  function renderLifelines() {
    var k = actorKey(), L = G.lifelines[k] || { fifty: false, skip: false };
    $("#lifeRow").classList.toggle("hidden", G.mode === "challenge");
    $("#life5050").disabled = !L.fifty || !G.current || G.current.type !== "mc" || G.locked;
    $("#lifeSkip").disabled = !L.skip || G.locked;
  }
  function startTimer() {
    stopTimer(); G.timeLeft = QTIME;
    var bar = $("#gTimer"); bar.style.width = "100%"; bar.classList.remove("low");
    G.timer = setInterval(function () {
      G.timeLeft = Math.max(0, G.timeLeft - 0.1);
      bar.style.width = (G.timeLeft / QTIME * 100) + "%";
      bar.classList.toggle("low", G.timeLeft <= 5);
      if (G.timeLeft <= 0) { stopTimer(); onTimeout(); }
    }, 100);
  }
  function stopTimer() { if (G.timer) { clearInterval(G.timer); G.timer = null; } }

  function nextQuestion() {
    G.locked = false;
    var q = draw(); G.current = q;
    /* RESTYLE 2026-10-27 (cosmetic hook): tint the big board with the current
       arena's color and re-deal the question + answers with a fresh animation. */
    var ci = CATS.indexOf(G.category);
    var gEl = $("#game");
    gEl.style.setProperty("--catc", ci >= 0 ? TRIVIA_CATS[ci].color : "#f2a93b");
    gEl.classList.remove("deal"); void gEl.offsetWidth; gEl.classList.add("deal");
    if (G.mode !== "party") {
      G.qNum++;
      var label = G.mode === "daily" ? "📅 Daily Challenge" : G.mode === "challenge" ? "⚔️ Challenge" : G.source === "wheel" ? "🎡 Wheel Round" : G.category;
      $("#gMeta").textContent = label + " · " + G.category + " · " + G.level;
      $("#gScore").textContent = "Question " + G.qNum + " of " + G.soloTotal;
      $("#gBar").style.width = ((G.qNum - 1) / G.soloTotal * 100) + "%";
      $("#turnLine").textContent = "";
    } else {
      $("#gMeta").textContent = G.category + " · " + G.level;
      $("#gScore").textContent = "First to " + G.target;
      $("#turnLine").textContent = G.players[G.turn].name + "'s turn — pass the phone!";
      var lead = Math.max.apply(null, G.players.map(function (x) { return x.score; }));
      $("#gBar").style.width = Math.min(100, lead / G.target * 100) + "%";
      renderBoard();
    }
    renderStreak(); renderLifelines();
    $("#gType").textContent = q.type === "fib" ? "Fill in the blank" : "Multiple choice";
    $("#gQ").textContent = q.q;
    var box = $("#gAns"); box.innerHTML = "";
    if (q.type === "mc") {
      q.choices.forEach(function (ch, i) {
        var b = document.createElement("button");
        b.className = "ans"; b.textContent = ch;
        b.addEventListener("click", function () { answerMC(i, b); });
        box.appendChild(b);
      });
    } else {
      var row = document.createElement("div"); row.className = "fibrow";
      var inp = document.createElement("input");
      inp.type = "text"; inp.placeholder = "Type your answer…"; inp.id = "fibInput"; inp.setAttribute("autocomplete", "off");
      var btn = document.createElement("button"); btn.textContent = "Answer";
      btn.addEventListener("click", function () { answerFIB(inp.value); });
      inp.addEventListener("keydown", function (e) { if (e.key === "Enter") answerFIB(inp.value); });
      row.appendChild(inp); row.appendChild(btn); box.appendChild(row);
      setTimeout(function () { inp.focus(); }, 60);
    }
    $("#gWhy").classList.add("hidden"); $("#nextBtn").classList.add("hidden");
    renderLifelines(); startTimer();
  }

  function finishAnswer(right, pickedText, correctText) {
    G.locked = true; stopTimer();
    var q = G.current, card = $("#game");
    card.classList.remove("pop", "shake"); void card.offsetWidth;
    card.classList.add(right ? "pop" : "shake");
    var why = $("#gWhy");
    why.textContent = (right ? "✅ Correct! " : "❌ Not quite. ") + q.why;
    why.classList.remove("hidden");
    var k = actorKey();
    if (right) {
      G.streaks[k] = streakOf(k) + 1;
      if (streakOf(k) > S.records.bestStreak) { S.records.bestStreak = streakOf(k); }
      if (G.streaks[k] % 3 === 0) {
        if (G.mode === "party") G.players[G.turn].score += 5; else { G.bonus += 5; G.points += 5; }
        why.textContent = "🔥 " + G.streaks[k] + " in a row — +5 streak bonus! " + q.why;
        burst(60, 1);
      } else burst(22, .6); /* RESTYLE 2026-10-27: a small confetti pop on every correct answer, not just streaks */
    } else G.streaks[k] = 0;
    if (G.mode === "party") {
      if (right) { G.players[G.turn].score += 10; }
      renderBoard();
      $("#nextBtn").textContent = "Pass & Next";
    } else {
      if (right) { G.correct++; G.points += 10; }
      S.records.totalAnswered++; if (right) S.records.totalCorrect++;
      G.review.push({ q: q.q, picked: pickedText, correct: correctText, right: right, why: q.why });
      $("#nextBtn").textContent = G.qNum >= G.soloTotal ? "See My Result" : "Next";
    }
    save(); syncBadges(true); renderBadges();
    renderStreak(); renderLifelines();
    $("#nextBtn").classList.remove("hidden");
  }
  function markMC(pickedIdx) {
    var q = G.current, buttons = $$("#gAns .ans");
    buttons.forEach(function (b) { b.disabled = true; });
    if (buttons[q.answer]) buttons[q.answer].classList.add("right");
    if (pickedIdx !== null && pickedIdx !== q.answer && buttons[pickedIdx]) buttons[pickedIdx].classList.add("wrong");
  }
  function answerMC(i) { if (G.locked) return; markMC(i); finishAnswer(i === G.current.answer, G.current.choices[i], G.current.choices[G.current.answer]); }
  function answerFIB(text) {
    if (G.locked) return;
    var q = G.current, right = q.accept.some(function (a) { return norm(a) === norm(text); });
    var inp = $("#fibInput"); if (inp) inp.disabled = true;
    var btn = $("#gAns .fibrow button"); if (btn) btn.disabled = true;
    finishAnswer(right, text || "(no answer)", cap(q.accept[0]));
  }
  function onTimeout() {
    if (G.locked) return;
    var q = G.current;
    if (q.type === "mc") markMC(null);
    else { var inp = $("#fibInput"); if (inp) inp.disabled = true; var b = $("#gAns .fibrow button"); if (b) b.disabled = true; }
    finishAnswer(false, "(time ran out)", q.type === "mc" ? q.choices[q.answer] : cap(q.accept[0]));
    $("#gWhy").textContent = "⏰ Time's up! " + q.why;
  }
  $("#life5050").addEventListener("click", function () {
    var k = actorKey(), L = G.lifelines[k];
    if (!L || !L.fifty || G.locked || G.current.type !== "mc") return;
    L.fifty = false;
    var wrong = G.current.choices.map(function (_, i) { return i; }).filter(function (i) { return i !== G.current.answer; });
    shuffle(wrong).slice(0, 2).forEach(function (i) { var b = $$("#gAns .ans")[i]; if (b) b.classList.add("gone"); });
    renderLifelines();
  });
  $("#lifeSkip").addEventListener("click", function () {
    var k = actorKey(), L = G.lifelines[k];
    if (!L || !L.skip || G.locked) return;
    L.skip = false; stopTimer();
    if (G.mode !== "party") G.qNum--;
    nextQuestion();
  });
  function partyLeaders() {
    var top = Math.max.apply(null, G.players.map(function (p) { return p.score; }));
    if (top < G.target) return null;
    return G.players.filter(function (p) { return p.score === top; });
  }
  $("#nextBtn").addEventListener("click", function () {
    if (G.mode !== "party") {
      if (G.qNum >= G.soloTotal) return showResults();
      return nextQuestion();
    }
    G.turn = (G.turn + 1) % G.players.length;
    if (G.turn === 0) { var leaders = partyLeaders(); if (leaders) return showResults(leaders); }
    nextQuestion();
  });

  function gradeFor(pct) {
    if (pct >= 90) return ["A", "Outstanding — you own this subject."];
    if (pct >= 80) return ["B", "Strong. A little polish and it's an A."];
    if (pct >= 70) return ["C", "Solid base — review the misses below and run it back."];
    if (pct >= 60) return ["D", "Getting there. The explanations below are your study guide."];
    return ["F", "Everyone starts somewhere — read the whys, then take the rematch."];
  }
  var lastResultText = "";
  function showResults(leaders) {
    stopTimer();
    $("#game").classList.add("hidden"); $("#results").classList.remove("hidden");
    var body = $("#resBody"); body.innerHTML = "";
    var isParty = G.mode === "party";
    $("#challengeBtn").classList.toggle("hidden", isParty || G.mode === "challenge");
    $("#againBtn").textContent = isParty ? "Rematch" : "Play Again";
    var today = new Date().toISOString().slice(0, 10);
    if (!isParty) {
      var pct = Math.round(G.correct / G.soloTotal * 100);
      var gr = gradeFor(pct);
      S.records.rounds++;
      if (pct > S.records.bestPct) S.records.bestPct = pct;
      if (pct === 100) S.records.perfectRounds++;
      if (G.source === "wheel") S.records.wheelRounds++;
      S.history.unshift({ date: today, mode: G.mode, cat: G.category, lvl: G.level, correct: G.correct, total: G.soloTotal, pct: pct, points: G.points });
      S.history = S.history.slice(0, 12);
      save(); syncBadges(true); renderBadges(); renderRecords(); renderLensers();
      var grade = document.createElement("div"); grade.className = "grade"; grade.textContent = gr[0];
      var pc = document.createElement("div"); pc.className = "pct";
      pc.textContent = pct + "% — " + G.correct + " of " + G.soloTotal + " correct · " + G.points + " pts" + (G.bonus ? " (incl. 🔥 +" + G.bonus + " streak bonus)" : "");
      pc.id = "resScore";
      var vd = document.createElement("div"); vd.className = "verdict";
      var head = G.category + " · " + G.level;
      if (G.mode === "daily") head = "📅 Daily Challenge — " + head;
      if (G.source === "wheel") head = "🎡 Wheel Round — " + head;
      if (G.mode === "challenge" && G.challenge) {
        var mine = G.correct, theirs = G.challenge.score;
        head = mine > theirs ? "⚔️ You beat " + G.challenge.name + " " + mine + "–" + theirs + "!"
          : mine < theirs ? "⚔️ " + G.challenge.name + " takes this one, " + theirs + "–" + mine + ". Run it back!"
          : "⚔️ Dead even with " + G.challenge.name + ", " + mine + "–" + theirs + "!";
      }
      vd.textContent = head + " — " + gr[1];
      body.appendChild(grade); body.appendChild(pc); body.appendChild(vd);
      lastResultText = "Trivia Lens: I scored " + pct + "% (grade " + gr[0] + ") on " + G.category + " · " + G.level + " — " + G.correct + "/10, " + G.points + " pts. Think you can beat it?";
      if (pct >= 70) burst(120, 1.3);
      var rev = document.createElement("div"); rev.className = "review";
      G.review.forEach(function (r) {
        var d = document.createElement("div"); d.className = "rev";
        var rq = document.createElement("div"); rq.className = "rq"; rq.textContent = r.q;
        var ra = document.createElement("div");
        ra.innerHTML = r.right ? '<span class="ok">✓ ' + esc(r.correct) + "</span>" : '<span class="no">✗ You said: ' + esc(r.picked) + '</span> · <span class="ok">Answer: ' + esc(r.correct) + "</span>";
        var rw = document.createElement("div"); rw.textContent = r.why;
        d.appendChild(rq); d.appendChild(ra); d.appendChild(rw); rev.appendChild(d);
      });
      body.appendChild(rev);
    } else {
      S.records.partyGames++;
      S.history.unshift({ date: today, mode: "party", cat: G.category, lvl: G.level, correct: Math.max.apply(null, G.players.map(function (p) { return p.score; })), total: G.target, pct: 100, points: Math.max.apply(null, G.players.map(function (p) { return p.score; })) });
      S.history = S.history.slice(0, 12);
      save(); syncBadges(true); renderBadges(); renderRecords(); renderLensers();
      var win = document.createElement("div"); win.className = "winner";
      win.textContent = leaders.length === 1 ? "🏆 " + leaders[0].name + " wins!" : "🤝 It's a tie: " + leaders.map(function (p) { return p.name; }).join(" & ") + "!";
      body.appendChild(win); burst(140, 1.4);
      var ul = document.createElement("ul"); ul.className = "standings";
      G.players.slice().sort(function (a, b) { return b.score - a.score; }).forEach(function (p) {
        var li = document.createElement("li");
        var nm = document.createElement("span"); nm.textContent = p.name;
        var sc = document.createElement("b"); sc.textContent = p.score + " pts";
        li.appendChild(nm); li.appendChild(sc); ul.appendChild(li);
      });
      body.appendChild(ul);
      lastResultText = "Trivia Lens party: " + leaders.map(function (p) { return p.name; }).join(" & ") + " won with " + Math.max.apply(null, G.players.map(function (p) { return p.score; })) + " points on " + G.category + " · " + G.level + "!";
    }
  }

  function copyText(t, btn, doneLabel) {
    var done = function () { var old = btn.textContent; btn.textContent = doneLabel; setTimeout(function () { btn.textContent = old; }, 2000); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(done, done);
    else { var ta = document.createElement("textarea"); ta.value = t; document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); } catch (e) {} document.body.removeChild(ta); done(); }
  }
  $("#shareBtn").addEventListener("click", function (e) { copyText(lastResultText, e.currentTarget, "✓ Copied!"); });
  $("#challengeBtn").addEventListener("click", function (e) {
    var name = S.settings.name || prompt("Your name for the challenge:", "A friend") || "A friend";
    var payload = { v: 1, cat: G.category, lvl: G.level, idx: G.deckIdxs.slice(0, G.soloTotal), name: name, score: G.correct };
    copyText(location.href.split("#")[0] + "#c=" + encodeChallenge(payload), e.currentTarget, "✓ Challenge link copied — send it!");
  });
  $("#startBtn").addEventListener("click", function () { if (incoming) return startGame("challenge"); startGame(G.mode === "party" ? "party" : "solo"); });
  $("#dailyBtn").addEventListener("click", function () { startGame("daily"); });
  $("#wheelBtnSetup").addEventListener("click", function () { showView("wheel"); });
  $("#againBtn").addEventListener("click", function () {
    if (G.mode === "challenge") startGame("solo", { source: G.source });
    else startGame(G.mode, { source: G.source });
  });
  $("#newBtn").addEventListener("click", function () {
    $("#results").classList.add("hidden"); $("#setup").classList.remove("hidden");
    if (location.hash.indexOf("#c=") === 0) history.replaceState(null, "", location.href.split("#")[0]);
    incoming = null; G.challenge = null; $("#challengeBanner").classList.add("hidden");
  });

  /* ================= THE WHEEL ================= */
  var SEG = 360 / WHEEL_WEDGES.length;
  var wheelRotation = 0, wheelSpinning = false, lastWheel = null, housePick = null;
  function polar(cx, cy, r, deg) { var rad = (deg - 90) * Math.PI / 180; return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)]; }
  function buildWheel() {
    var svg = $("#wheelSvg"), NS = "http://www.w3.org/2000/svg";
    var rotor = document.createElementNS(NS, "g"); rotor.id = "wheelRotor";
    WHEEL_WEDGES.forEach(function (w, i) {
      var a0 = i * SEG, a1 = a0 + SEG;
      var p0 = polar(160, 160, 154, a0), p1 = polar(160, 160, 154, a1);
      var path = document.createElementNS(NS, "path");
      path.setAttribute("d", "M160,160 L" + p0[0].toFixed(1) + "," + p0[1].toFixed(1) + " A154,154 0 0 1 " + p1[0].toFixed(1) + "," + p1[1].toFixed(1) + " Z");
      path.setAttribute("fill", w.color); path.setAttribute("stroke", "#0d1526"); path.setAttribute("stroke-width", "2.5");
      path.setAttribute("data-wedge", String(i));
      rotor.appendChild(path);
      var mid = a0 + SEG / 2, lp = polar(160, 160, 104, mid);
      var t = document.createElementNS(NS, "text");
      t.setAttribute("x", lp[0]); t.setAttribute("y", lp[1]);
      t.setAttribute("transform", "rotate(" + mid + " " + lp[0] + " " + lp[1] + ")");
      t.setAttribute("text-anchor", "middle"); t.setAttribute("fill", "#fff");
      t.setAttribute("font-size", "13.5"); t.setAttribute("font-weight", "800");
      t.setAttribute("style", "text-shadow:0 1px 2px rgba(0,0,0,.6)");
      t.textContent = w.icon + " " + (w.house ? "House" : w.name.split(" ")[0]);
      rotor.appendChild(t);
      var t2 = document.createElementNS(NS, "text");
      var lp2 = polar(160, 160, 88, mid);
      t2.setAttribute("x", lp2[0]); t2.setAttribute("y", lp2[1]);
      t2.setAttribute("transform", "rotate(" + mid + " " + lp2[0] + " " + lp2[1] + ")");
      t2.setAttribute("text-anchor", "middle"); t2.setAttribute("fill", "rgba(255,255,255,.85)");
      t2.setAttribute("font-size", "8.5"); t2.setAttribute("font-weight", "700"); t2.setAttribute("letter-spacing", ".08em");
      t2.textContent = w.house ? "CHOICE" : w.arena.replace("The ", "").toUpperCase();
      rotor.appendChild(t2);
    });
    var rim = document.createElementNS(NS, "circle");
    rim.setAttribute("cx", "160"); rim.setAttribute("cy", "160"); rim.setAttribute("r", "156");
    rim.setAttribute("fill", "none"); rim.setAttribute("stroke", "#d4af37"); rim.setAttribute("stroke-width", "5");
    svg.appendChild(rotor); svg.appendChild(rim);
    /* RESTYLE 2026-10-27 (cosmetic only): rim light dots at every wedge boundary,
       alternating gold/white like cabinet bulbs, plus a fixed light sheen over the
       wheel face — the rotor spins beneath it, the light stays put. */
    WHEEL_WEDGES.forEach(function (w, i) {
      var bp = polar(160, 160, 147, i * SEG);
      var dot = document.createElementNS(NS, "circle");
      dot.setAttribute("cx", bp[0].toFixed(1)); dot.setAttribute("cy", bp[1].toFixed(1)); dot.setAttribute("r", "4.2");
      dot.setAttribute("fill", i % 2 === 0 ? "#ffd34d" : "#fff6da");
      dot.setAttribute("stroke", "rgba(13,21,38,.55)"); dot.setAttribute("stroke-width", "1");
      svg.appendChild(dot);
    });
    var sheen = document.createElementNS(NS, "circle");
    sheen.setAttribute("cx", "160"); sheen.setAttribute("cy", "160"); sheen.setAttribute("r", "154");
    sheen.setAttribute("fill", "url(#wheelSheen)"); sheen.setAttribute("pointer-events", "none");
    svg.appendChild(sheen);
  }
  buildWheel();
  function landedIndexForRotation(rot) {
    var eff = ((-rot) % 360 + 360) % 360;
    return Math.floor(eff / SEG) % WHEEL_WEDGES.length;
  }
  var audioCtx = null;
  function tickSound() {
    if (!S.settings.sound) return;
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      var o = audioCtx.createOscillator(), g = audioCtx.createGain();
      o.type = "square"; o.frequency.value = 1400; g.gain.value = 0.03;
      o.connect(g); g.connect(audioCtx.destination);
      o.start(); o.stop(audioCtx.currentTime + 0.03);
    } catch (e) { /* sound is a garnish, never a blocker */ }
  }
  function spinWheel(forcedIdx) {
    if (wheelSpinning) return null;
    var target = (typeof forcedIdx === "number") ? forcedIdx : Math.floor(Math.random() * WHEEL_WEDGES.length);
    var center = target * SEG + SEG / 2;
    var desired = ((360 - center) % 360 + 360) % 360;
    var cur = ((wheelRotation % 360) + 360) % 360;
    var delta = ((desired - cur) % 360 + 360) % 360;
    if (delta < 60) delta += 360;
    var total = wheelRotation + 360 * 5 + delta;
    wheelSpinning = true; housePick = null;
    /* RESTYLE 2026-10-27 (cosmetic hook): clear the previous landed-wedge glow. */
    $$("#wheelSvg path.landed").forEach(function (p) { p.classList.remove("landed"); });
    $("#spinBtn").disabled = true;
    $("#playWheelBtn").classList.add("hidden");
    $("#housePicker").classList.add("hidden");
    $("#wheelResult").textContent = "The wheel is spinning…";
    chaseBulbs(110);
    var rotor = document.getElementById("wheelRotor");
    rotor.style.transformBox = "fill-box";
    rotor.style.transformOrigin = "center";
    rotor.style.transform = "rotate(" + total + "deg)";
    wheelRotation = total;
    var ticks = 0, tickInt = setInterval(function () { tickSound(); if (++ticks > 26) clearInterval(tickInt); }, 120);
    setTimeout(function () {
      clearInterval(tickInt); chaseBulbs(650);
      var landed = landedIndexForRotation(wheelRotation);
      var w = WHEEL_WEDGES[landed];
      /* RESTYLE 2026-10-27 (cosmetic hook): light up the landed wedge. */
      var lp = document.querySelector('#wheelSvg path[data-wedge="' + landed + '"]');
      if (lp) lp.classList.add("landed");
      lastWheel = { index: landed, wedge: w, rotation: wheelRotation, target: target, match: landed === target };
      wheelSpinning = false; $("#spinBtn").disabled = false;
      S.records.wheelSpins++;
      var label = w.house ? "⭐ House Choice" : w.icon + " " + w.name + " — " + w.arena;
      S.wheelHistory.unshift({ date: new Date().toISOString().slice(0, 10), label: label });
      S.wheelHistory = S.wheelHistory.slice(0, 10);
      save(); renderRecords();
      if (w.house) {
        $("#wheelResult").innerHTML = '⭐ <span class="arena-name">House Choice!</span> The room votes below.';
        $("#housePicker").classList.remove("hidden");
      } else {
        $("#wheelResult").innerHTML = 'The wheel lands on <span class="arena-name">' + esc(w.name) + " — " + esc(w.arena) + "</span>!";
        var pb = $("#playWheelBtn"); pb.classList.remove("hidden"); pb.textContent = "▶ Play " + w.name + " (" + G.level + ")";
        burst(40, 0.8);
      }
    }, 3550);
    return target;
  }
  $("#spinBtn").addEventListener("click", function () { spinWheel(); });
  $("#playWheelBtn").addEventListener("click", function () {
    if (!lastWheel) return;
    var cat = lastWheel.wedge.house ? housePick : lastWheel.wedge.name;
    if (!cat) { toast("The house still has to pick an arena."); return; }
    var mode = G.mode === "party" ? "party" : "solo";
    startGame(mode, { category: cat, source: "wheel" });
    /* Wheel Debut is earned when the wheel round completes (records.wheelRounds in showResults). */
  });

  /* ================= settings ================= */
  function bindSettings() {
    $("#setName").value = S.settings.name;
    $("#setName").addEventListener("change", function () { S.settings.name = this.value.trim(); save(); renderLensers(); toast("Saved on this device."); });
    $$("#setLvlSeg button").forEach(function (b) {
      b.classList.toggle("on", b.dataset.lvl === S.settings.level);
      b.addEventListener("click", function () { S.settings.level = b.dataset.lvl; setLevel(b.dataset.lvl); save(); toast("Default level: " + b.dataset.lvl); });
    });
    if (!incoming) setLevel(S.settings.level || "High School");
    $("#setSound").checked = !!S.settings.sound;
    $("#setSound").addEventListener("change", function () { S.settings.sound = this.checked; save(); });
    $("#setLensers").checked = !!S.settings.lensers;
    $("#setLensers").addEventListener("change", function () { S.settings.lensers = this.checked; save(); renderLensers(); toast(this.checked ? "Lensers preview on — Sample-tagged in the Badge Case." : "Lensers presence off."); });
  }
  $("#btnExport").addEventListener("click", function () {
    var box = $("#exportBox"); box.hidden = false; box.textContent = JSON.stringify(S, null, 2);
  });
  $("#btnClear").addEventListener("click", function () {
    try { localStorage.removeItem(LS_KEY); } catch (e) {}
    S = defaults(); save();
    renderBadges(); renderRecords(); renderLensers(); bindSettings();
    toast("Trivia data cleared. A fresh marquee awaits.");
  });

  /* ================= init ================= */
  bindSettings();
  syncBadges(false);
  renderBadges(); renderRecords(); renderLensers();

  window.__TRIVIA = {
    state: function () { return S; },
    game: function () { return G; },
    badges: BADGES,
    spinWheel: spinWheel,
    lastWheel: function () { return lastWheel; },
    landedIndexForRotation: landedIndexForRotation,
    startGame: startGame,
    poolFor: poolFor,
    wedges: WHEEL_WEDGES
  };
})();

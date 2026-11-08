// Infinite Trivia - verified question bank
// Structure: QUESTION_BANK[category][level] = array of 12 questions.
// Each question: { q, choices[4], answer (index of correct choice), why }

const QUESTION_BANK = {
  "Pop Culture": {
    "Middle School": [
      { q: "Which superhero's real name is Peter Parker?", choices: ["Batman","The Hulk","Superman","Spider-Man"], answer: 3, why: "Peter Parker was bitten by a radioactive spider and became Spider-Man." },
      { q: "Which 2021 animated film features the magical Madrigal family — and a certain song about not talking about Bruno?", choices: ["Frozen","Coco","Moana","Encanto"], answer: 3, why: "Encanto follows the Madrigals and their living house, Casita, in Colombia." },
      { q: "Which app is famous for short videos, sounds, and dance trends?", choices: ["YouTube","Netflix","Twitch","TikTok"], answer: 3, why: "TikTok built its name on short, scrollable videos and viral sounds." },
      { q: "Which game lets you build with blocks, mine underground, and watch out for creepers?", choices: ["Roblox","Fortnite","Minecraft","Terraria"], answer: 2, why: "Minecraft's blocky world is full of creepers that hiss before they explode." },
      { q: "What is the name of Mario's green-clad brother?", choices: ["Wario","Yoshi","Toad","Luigi"], answer: 3, why: "Luigi is Mario's taller, greener brother." },
      { q: "In The Mandalorian, what is Baby Yoda's real name?", choices: ["Grogu","Yaddle","Minch","Grogu Jr."], answer: 0, why: "The Child's name is Grogu, revealed in the second season." },
      { q: "In Inside Out 2, which new orange emotion shows up in Riley's head?", choices: ["Joy","Sadness","Anxiety","Envy"], answer: 2, why: "Anxiety — orange, frazzled, and always planning ahead — arrives in Inside Out 2 (2024)." },
      { q: "Wednesday Addams attends which spooky school in the series Wednesday?", choices: ["Hogwarts","Starfleet Academy","Xavier's School","Nevermore Academy"], answer: 3, why: "Wednesday is sent to Nevermore Academy, the school for outcasts." },
      { q: "Who sang the 2024 hit Espresso?", choices: ["Olivia Rodrigo","Chappell Roan","Billie Eilish","Sabrina Carpenter"], answer: 3, why: "Sabrina Carpenter's Espresso was one of the biggest songs of 2024." },
      { q: "In Fortnite, what do you earn for being the last player or team standing?", choices: ["Chicken Dinner","Final Circle","Battle Crown","Victory Royale"], answer: 3, why: "A Fortnite win is called a Victory Royale." },
      { q: "The cartoon dog Bluey and her family live in which country?", choices: ["United States","United Kingdom","Australia","Canada"], answer: 2, why: "Bluey is an Australian blue heeler pup from Brisbane." },
      { q: "In The Super Mario Bros. Movie, what job do Mario and Luigi have in Brooklyn?", choices: ["Chefs","Builders","Taxi drivers","Plumbers"], answer: 3, why: "The brothers run a plumbing business before the warp pipe changes everything." }
    ],
    "High School": [
      { q: "Which film won Best Picture at the 2024 Academy Awards?", choices: ["Barbie","Killers of the Flower Moon","Poor Things","Oppenheimer"], answer: 3, why: "Oppenheimer, Christopher Nolan's atomic-bomb drama, won Best Picture in March 2024." },
      { q: "Who directed Dune: Part Two (2024)?", choices: ["Ridley Scott","David Lynch","Christopher Nolan","Denis Villeneuve"], answer: 3, why: "Denis Villeneuve directed both Dune films; Lynch made the 1984 version." },
      { q: "Who directed Barbie (2023)?", choices: ["Greta Gerwig","Sofia Coppola","Ava DuVernay","Lana Wachowski"], answer: 0, why: "Greta Gerwig directed and co-wrote Barbie, 2023's biggest film." },
      { q: "Squid Game, the deadly-competition series, comes from which country?", choices: ["Japan","China","South Korea","Thailand"], answer: 2, why: "Squid Game is a South Korean series and one of Netflix's biggest hits ever." },
      { q: "Whose Eras Tour became the highest-grossing concert tour of all time?", choices: ["Beyoncé","Ed Sheeran","Coldplay","Taylor Swift"], answer: 3, why: "Taylor Swift's Eras Tour passed a billion dollars and kept going." },
      { q: "Miles Morales is the hero of which animated film series?", choices: ["The Incredibles","How to Train Your Dragon","Big Hero 6","Spider-Man: Into and Across the Spider-Verse"], answer: 3, why: "Miles Morales leads the Spider-Verse films, voiced by Shameik Moore." },
      { q: "Which game won Game of the Year at The Game Awards 2023?", choices: ["The Legend of Zelda: Tears of the Kingdom","Hogwarts Legacy","Alan Wake 2","Baldur's Gate 3"], answer: 3, why: "Baldur's Gate 3 took Game of the Year in 2023." },
      { q: "The Last of Us games were made by which studio?", choices: ["Naughty Dog","Santa Monica Studio","Guerrilla Games","Sucker Punch"], answer: 0, why: "Naughty Dog created The Last of Us before HBO adapted it." },
      { q: "House of the Dragon follows which great house of Westeros?", choices: ["House Stark","House Lannister","House Targaryen","House Baratheon"], answer: 2, why: "The series chronicles the Targaryens and their dragons, centuries of civil war included." },
      { q: "Who plays Ken opposite Margot Robbie in Barbie?", choices: ["Ryan Gosling","Timothée Chalamet","Austin Butler","Jacob Elordi"], answer: 0, why: "Ryan Gosling's Ken — and his song 'I'm Just Ken' — stole scenes in Barbie." },
      { q: "Stranger Things is set in the fictional town of Hawkins in which state?", choices: ["Ohio","Michigan","Illinois","Indiana"], answer: 3, why: "Hawkins, Indiana is home to the Hawkins Lab and the Upside Down." },
      { q: "Top Gun: Maverick (2022) stars which actor as Pete 'Maverick' Mitchell?", choices: ["Val Kilmer","Glen Powell","Miles Teller","Tom Cruise"], answer: 3, why: "Tom Cruise returned as Maverick more than 35 years after the original." }
    ],
    "Expert": [
      { q: "Which Sean Baker film won the Palme d'Or in 2024 and Best Picture in 2025?", choices: ["The Brutalist","Conclave","Emilia Pérez","Anora"], answer: 3, why: "Anora swept both honors, an indie breakout on the biggest stages." },
      { q: "Who composed the Oscar-winning score for Oppenheimer?", choices: ["Hans Zimmer","Michael Giacchino","Trent Reznor","Ludwig Göransson"], answer: 3, why: "Ludwig Göransson won his second Oscar for the Oppenheimer score." },
      { q: "Who directed the game Elden Ring?", choices: ["Hidetaka Miyazaki","Hideo Kojima","Todd Howard","Neil Druckmann"], answer: 0, why: "FromSoftware's Hidetaka Miyazaki directed Elden Ring, with world-building help from George R.R. Martin." },
      { q: "What was the highest-grossing film worldwide in 2023?", choices: ["The Super Mario Bros. Movie","Guardians of the Galaxy Vol. 3","Oppenheimer","Barbie"], answer: 3, why: "Barbie earned about 1.45 billion dollars worldwide in 2023." },
      { q: "The series Severance streams on which service?", choices: ["Hulu","Netflix","Apple TV+","Max"], answer: 2, why: "Severance is an Apple TV+ original about work selves split from real selves." },
      { q: "Baldur's Gate 3 was developed by which studio?", choices: ["BioWare","CD Projekt Red","Obsidian Entertainment","Larian Studios"], answer: 3, why: "Belgium's Larian Studios spent six years building Baldur's Gate 3." },
      { q: "The series The Bear is set in which city?", choices: ["New York","Philadelphia","Boston","Chicago"], answer: 3, why: "Carmy runs his family's sandwich shop in Chicago." },
      { q: "Who won the Best Actor Oscar for playing J. Robert Oppenheimer?", choices: ["Paul Giamatti","Bradley Cooper","Cillian Murphy","Colman Domingo"], answer: 2, why: "Cillian Murphy won at the 2024 ceremony." },
      { q: "Andor is a prequel series to which Star Wars film?", choices: ["Solo","Return of the Jedi","Rogue One","The Force Awakens"], answer: 2, why: "Andor leads directly into Rogue One and Cassian Andor's final mission." },
      { q: "Who created Squid Game?", choices: ["Bong Joon Ho","Park Chan-wook","Hwang Dong-hyuk","Kim Jee-woon"], answer: 2, why: "Hwang Dong-hyuk wrote and directed Squid Game after years of rejections." },
      { q: "Everything Everywhere All at Once was directed by a duo billed as what?", choices: ["The Daniels","The Russos","The Coens","The Farrellys"], answer: 0, why: "Daniel Kwan and Daniel Scheinert direct together as Daniels." },
      { q: "Which game won Game of the Year at The Game Awards 2024?", choices: ["Astro Bot","Black Myth: Wukong","Metaphor: ReFantazio","Balatro"], answer: 0, why: "Astro Bot won Game of the Year in December 2024." }
    ]
  },
  "Music": {
    "Middle School": [
      { q: "How many strings does a standard guitar have?", choices: ["Five","Four","Six","Seven"], answer: 2, why: "A standard guitar has six strings." },
      { q: "How many keys does a full-size piano have?", choices: ["76","84","88","96"], answer: 2, why: "A piano has 52 white keys and 36 black keys — 88 in total." },
      { q: "Who sang Old Town Road?", choices: ["Post Malone","Travis Scott","Lil Nas X","Drake"], answer: 2, why: "Lil Nas X's Old Town Road ruled the charts for a record 19 weeks in 2019." },
      { q: "The song Dynamite was a worldwide hit for which group?", choices: ["BLACKPINK","EXO","BTS","TWICE"], answer: 2, why: "Dynamite (2020) was BTS's first song recorded fully in English." },
      { q: "Who sang Shake It Off and Blank Space?", choices: ["Taylor Swift","Ariana Grande","Selena Gomez","Demi Lovato"], answer: 0, why: "Both songs are from Taylor Swift's album 1989." },
      { q: "Who sang Blinding Lights?", choices: ["Drake","The Weeknd","Ed Sheeran","Bruno Mars"], answer: 1, why: "The Weeknd's Blinding Lights became one of the most-streamed songs ever." },
      { q: "Who sang the 2023 hit Flowers?", choices: ["Miley Cyrus","Dua Lipa","SZA","Lizzo"], answer: 0, why: "Miley Cyrus's Flowers topped charts and won Record of the Year." },
      { q: "Who sang As It Was?", choices: ["Harry Styles","Shawn Mendes","Justin Bieber","Niall Horan"], answer: 0, why: "Harry Styles released As It Was in 2022, from Harry's House." },
      { q: "Who sang Levitating?", choices: ["Camila Cabello","Dua Lipa","Billie Eilish","Doja Cat"], answer: 1, why: "Dua Lipa's Levitating, from Future Nostalgia, was a chart marathon runner." },
      { q: "What do you call a large group of singers performing together?", choices: ["Orchestra","Band","Choir","Duet"], answer: 2, why: "A choir is an ensemble of singers." },
      { q: "Which superstar is known to fans as Queen Bey?", choices: ["Beyoncé","Rihanna","Nicki Minaj","Adele"], answer: 0, why: "Beyoncé's fan base, the BeyHive, calls her Queen Bey." },
      { q: "What do you call the words of a song?", choices: ["Melody","Rhythm","Tempo","Lyrics"], answer: 3, why: "The words are the lyrics; the tune is the melody." }
    ],
    "High School": [
      { q: "Kendrick Lamar won the Pulitzer Prize for Music for which album?", choices: ["DAMN.","To Pimp a Butterfly","good kid, m.A.A.d city","Mr. Morale & The Big Steppers"], answer: 0, why: "DAMN. won the 2018 Pulitzer — a first for a popular music artist." },
      { q: "Olivia Rodrigo's debut album, with drivers license and good 4 u, is titled what?", choices: ["SOUR","GUTS","Fearless","Future Nostalgia"], answer: 0, why: "SOUR arrived in 2021, when Rodrigo was 18." },
      { q: "Billie Eilish writes and records most of her music with which family member?", choices: ["Her brother Finneas","Her father","Her cousin","Her uncle"], answer: 0, why: "Finneas O'Connell, Billie's brother, is her producer and co-writer." },
      { q: "Bad Bunny comes from which Caribbean island?", choices: ["Cuba","Puerto Rico","Dominican Republic","Jamaica"], answer: 1, why: "Bad Bunny is from Vega Baja, Puerto Rico." },
      { q: "Which Kate Bush song shot back up the charts in 2022 thanks to Stranger Things?", choices: ["Wuthering Heights","Running Up That Hill","Hounds of Love","Babooshka"], answer: 1, why: "Max's favorite song, Running Up That Hill, became a hit all over again in 2022." },
      { q: "Who performed the Super Bowl halftime show in 2023?", choices: ["Beyoncé","Rihanna","Katy Perry","Lady Gaga"], answer: 1, why: "Rihanna's 2023 halftime show doubled as a pregnancy reveal." },
      { q: "Which album won Album of the Year at the 2024 Grammys?", choices: ["Midnights","SOS","GUTS","World Music Radio"], answer: 0, why: "Taylor Swift's Midnights made her the first artist to win Album of the Year four times." },
      { q: "What is Spotify's year-end recap of your listening called?", choices: ["Spotify Wrapped","Spotify Replay","Spotify Rewind","Your Year in Sound"], answer: 0, why: "Wrapped lands every December and floods social media." },
      { q: "Pop star Lizzo is classically trained on which instrument?", choices: ["Violin","Flute","Trumpet","Clarinet"], answer: 1, why: "Lizzo is a trained flutist — her flute is named Sasha Flute." },
      { q: "What is The Weeknd's real first and last name?", choices: ["Abel Tesfaye","Adam Levine","Aubrey Graham","Peter Hernandez"], answer: 0, why: "The Weeknd was born Abel Tesfaye in Toronto." },
      { q: "In 2023, which group became the first K-pop act to headline Coachella?", choices: ["BTS","BLACKPINK","TWICE","Stray Kids"], answer: 1, why: "BLACKPINK headlined Coachella in April 2023." },
      { q: "The musical Hamilton tells the story of which Founding Father?", choices: ["Thomas Jefferson","George Washington","Benjamin Franklin","Alexander Hamilton"], answer: 3, why: "Lin-Manuel Miranda's musical follows the first Treasury Secretary." }
    ],
    "Expert": [
      { q: "As of the 2025 Grammys, Beyoncé holds the all-time record with how many Grammy wins?", choices: ["28","32","35","40"], answer: 2, why: "Beyoncé reached 35 wins in 2025, more than any artist in history." },
      { q: "Which album won Album of the Year at the 2025 Grammys?", choices: ["Cowboy Carter","BRAT","Short n' Sweet","Hit Me Hard and Soft"], answer: 0, why: "Beyoncé's Cowboy Carter finally took Album of the Year in 2025." },
      { q: "Who headlined the Super Bowl LIX halftime show in 2025?", choices: ["Usher","Kendrick Lamar","Rihanna","Bad Bunny"], answer: 1, why: "Kendrick Lamar headlined in New Orleans in February 2025." },
      { q: "Which song was the first ever to reach one billion streams on Spotify?", choices: ["One Dance by Drake","Shape of You by Ed Sheeran","Rockstar by Post Malone","Closer by The Chainsmokers"], answer: 0, why: "Drake's One Dance crossed one billion streams in 2016, a first." },
      { q: "Frank Ocean's album Blonde was released in which year?", choices: ["2012","2014","2016","2018"], answer: 2, why: "Blonde arrived in August 2016, a day after his visual album Endless." },
      { q: "Taylor Swift's 'Taylor's Version' albums exist mainly so she can what?", choices: ["Add new songs only","Own the master recordings of her first six albums","Change the album artwork","Re-record with new singers"], answer: 1, why: "Re-recording lets Swift own the masters of her first six albums." },
      { q: "Who won the Oscar for scoring Joker (2019)?", choices: ["Ludwig Göransson","Hildur Guðnadóttir","Trent Reznor","Jon Batiste"], answer: 1, why: "Hildur Guðnadóttir's cello-driven Joker score won the Oscar and a Golden Globe." },
      { q: "The 2024 album that turned 'brat' into a whole summer belongs to whom?", choices: ["Charli XCX","Billie Eilish","Chappell Roan","Sabrina Carpenter"], answer: 0, why: "Charli XCX's BRAT defined the summer of 2024." },
      { q: "Billie Eilish's Grammy-sweeping 2020 album is titled what?", choices: ["Happier Than Ever","When We All Fall Asleep, Where Do We Go?","Don't Smile at Me","Future Nostalgia"], answer: 1, why: "It made her the youngest artist to win all four major Grammy categories in one night." },
      { q: "Tyler, the Creator's 2024 album is titled what?", choices: ["IGOR","Chromakopia","Call Me If You Get Lost","Flower Boy"], answer: 1, why: "Chromakopia dropped in October 2024." },
      { q: "Who won Best New Artist at the 2025 Grammys?", choices: ["Sabrina Carpenter","Chappell Roan","Shaboozey","Doechii"], answer: 1, why: "Chappell Roan won Best New Artist in 2025 — Doechii took Best Rap Album." },
      { q: "Doechii's Grammy-winning Best Rap Album (2025) is titled what?", choices: ["Alligator Bites Never Heal","Might Delete Later","The Death of Slim Shady","GNX"], answer: 0, why: "Alligator Bites Never Heal made Doechii the third woman to win Best Rap Album." }
    ]
  },
  "Sports": {
    "Middle School": [
      { q: "How many players does a soccer team have on the field at one time?", choices: ["Nine","Eleven","Ten","Seven"], answer: 1, why: "Eleven per side, including the goalkeeper." },
      { q: "In basketball, how many points is a free throw worth?", choices: ["Two","Three","Zero","One"], answer: 3, why: "A free throw is worth one point." },
      { q: "Soccer superstar Cristiano Ronaldo is famous for which jersey nickname?", choices: ["CR7","LM10","The King","O Fenômeno"], answer: 0, why: "CR7 combines Ronaldo's initials with his number 7." },
      { q: "Simone Biles is a superstar in which sport?", choices: ["Swimming","Gymnastics","Track and field","Tennis"], answer: 1, why: "Biles is the most decorated gymnast of all time." },
      { q: "How many holes are played in a standard round of golf?", choices: ["Nine","Twelve","Eighteen","Twenty-four"], answer: 2, why: "A full round is eighteen holes." },
      { q: "In American football, how many points is a touchdown worth?", choices: ["Three","Seven","Six","Two"], answer: 2, why: "Six points for the touchdown; the extra try comes after." },
      { q: "Caitlin Clark became a college basketball sensation playing for which school?", choices: ["UConn","Iowa","LSU","South Carolina"], answer: 1, why: "Clark packed arenas playing for the Iowa Hawkeyes before going pro." },
      { q: "About how long is a marathon race?", choices: ["10 miles","20 miles","26.2 miles","31 miles"], answer: 2, why: "A marathon is 26 miles 385 yards — about 42.2 kilometers." },
      { q: "In which sport would a player perform a slam dunk?", choices: ["Basketball","Volleyball","Tennis","Soccer"], answer: 0, why: "A slam dunk is a basketball shot powered down through the hoop." },
      { q: "How many rings appear on the Olympic flag?", choices: ["Four","Five","Six","Seven"], answer: 1, why: "The five rings represent the inhabited continents in Olympic symbolism." },
      { q: "Shohei Ohtani is a two-way superstar in which sport?", choices: ["Baseball","Soccer","Hockey","Golf"], answer: 0, why: "Ohtani both pitches and hits at an elite level in Major League Baseball." },
      { q: "How many pins are set up in standard bowling?", choices: ["Eight","Nine","Twelve","Ten"], answer: 3, why: "Tenpin bowling uses ten pins." }
    ],
    "High School": [
      { q: "Lionel Messi finally won the World Cup in 2022 with which country?", choices: ["Brazil","France","Argentina","Portugal"], answer: 2, why: "Argentina beat France on penalties in a classic 2022 final in Qatar." },
      { q: "In 2023, LeBron James passed which legend to become the NBA's all-time leading scorer?", choices: ["Michael Jordan","Kareem Abdul-Jabbar","Kobe Bryant","Karl Malone"], answer: 1, why: "LeBron passed Kareem Abdul-Jabbar's 38,387 points in February 2023." },
      { q: "Patrick Mahomes plays quarterback for which NFL team?", choices: ["Kansas City Chiefs","Buffalo Bills","Philadelphia Eagles","Cincinnati Bengals"], answer: 0, why: "Mahomes leads the Kansas City Chiefs." },
      { q: "Which city hosted the 2024 Summer Olympics?", choices: ["London","Paris","Los Angeles","Tokyo"], answer: 1, why: "Paris hosted in 2024; Los Angeles is next in 2028." },
      { q: "Which quarterback has won the most Super Bowls as a starter?", choices: ["Joe Montana","Tom Brady","Terry Bradshaw","Troy Aikman"], answer: 1, why: "Tom Brady won seven Super Bowls, six with New England and one with Tampa Bay." },
      { q: "The FIFA World Cup is held every how many years?", choices: ["Two","Three","Five","Four"], answer: 3, why: "The World Cup runs on a four-year cycle." },
      { q: "In 2024, Shohei Ohtani became the first player ever to hit 50 home runs and steal 50 bases in one season. This is known as the what club?", choices: ["The 40-40 club","The 50-50 club","The Triple Crown club","The Cycle club"], answer: 1, why: "Ohtani founded the 50-50 club in September 2024 with the Dodgers." },
      { q: "As of 2024, which player holds the record for most men's Grand Slam tennis titles, with 24?", choices: ["Roger Federer","Rafael Nadal","Pete Sampras","Novak Djokovic"], answer: 3, why: "Novak Djokovic won his 24th major in 2023." },
      { q: "In which year did the Chicago Cubs end their 108-year drought by winning the World Series?", choices: ["2015","2016","2017","2014"], answer: 1, why: "The Cubs beat Cleveland in seven games in November 2016." },
      { q: "Which country has won the most FIFA World Cups?", choices: ["Germany","Argentina","Brazil","Italy"], answer: 2, why: "Brazil has won five World Cups, the most of any nation." },
      { q: "In ice hockey, a hat trick means one player scores how many goals in a game?", choices: ["Two","Three","Four","Five"], answer: 1, why: "Three goals in a single game is a hat trick." },
      { q: "Counting her World Championship and Olympic medals through Paris 2024, Simone Biles has won how many in total?", choices: ["32","37","41","45"], answer: 2, why: "Biles has 41 combined world and Olympic medals — the most by any gymnast." }
    ],
    "Expert": [
      { q: "Which NHL player holds the record for most career points, with 2,857?", choices: ["Mark Messier","Gordie Howe","Wayne Gretzky","Mario Lemieux"], answer: 2, why: "Gretzky's 2,857 points may never be touched." },
      { q: "Which NBA player scored 100 points in a single game in 1962?", choices: ["Bill Russell","Kareem Abdul-Jabbar","Elgin Baylor","Wilt Chamberlain"], answer: 3, why: "Wilt Chamberlain scored 100 for Philadelphia in Hershey, Pennsylvania." },
      { q: "Max Verstappen won how many consecutive Formula 1 world titles from 2021 to 2024?", choices: ["Two","Three","Four","Five"], answer: 2, why: "Verstappen's streak hit four straight titles in 2024." },
      { q: "Shohei Ohtani's 10-year Dodgers contract, signed in late 2023, was reported at how much?", choices: ["500 million dollars","600 million dollars","700 million dollars","900 million dollars"], answer: 2, why: "Ohtani's deal was a record 700 million dollars over ten years." },
      { q: "Through Paris 2024, Katie Ledecky has won how many Olympic gold medals?", choices: ["Seven","Eight","Nine","Ten"], answer: 2, why: "Ledecky's nine golds include four straight in the 800m freestyle." },
      { q: "Noah Lyles won the Paris 2024 Olympic 100m by what razor-thin margin?", choices: ["Five thousandths of a second","Half a second","One full second","A photo-finish tie"], answer: 0, why: "Lyles beat Kishane Thompson by 0.005 seconds in Paris." },
      { q: "In 2024, Caitlin Clark passed which player to become NCAA Division I basketball's all-time leading scorer, men and women combined?", choices: ["Pete Maravich","Lynette Woodard","Kelsey Plum","Pearl Moore"], answer: 0, why: "Clark passed Pete Maravich's 3,667 points in March 2024." },
      { q: "The Kansas City Chiefs beat which team in overtime to win Super Bowl LVIII in 2024?", choices: ["Philadelphia Eagles","San Francisco 49ers","Buffalo Bills","Baltimore Ravens"], answer: 1, why: "The Chiefs topped the 49ers 25-22 in overtime in Las Vegas." },
      { q: "In golf, an albatross on a hole means scoring how many strokes under par?", choices: ["Three under par","Two under par","One under par","Four under par"], answer: 0, why: "An albatross — a double eagle — is three under on one hole." },
      { q: "Which nation won the 2023 Women's World Cup?", choices: ["England","Spain","United States","Sweden"], answer: 1, why: "Spain beat England 1-0 in the Sydney final." },
      { q: "Which runner completed a marathon in under two hours in a special 2019 event in Vienna?", choices: ["Kenenisa Bekele","Mo Farah","Haile Gebrselassie","Eliud Kipchoge"], answer: 3, why: "Kipchoge ran 1:59:40 at the INEOS 1:59 Challenge." },
      { q: "Who was the first overall pick in the 2024 NFL Draft?", choices: ["Jayden Daniels","Caleb Williams","Drake Maye","Marvin Harrison Jr."], answer: 1, why: "The Bears took USC quarterback Caleb Williams first overall." }
    ]
  },
  "Biology": {
    "Middle School": [
      { q: "Through photosynthesis, green plants make which food substance?", choices: ["Carbon dioxide", "Glucose (sugar)", "Nitrogen", "Salt"], answer: 1, why: "Plants convert sunlight, water, and carbon dioxide into glucose." },
      { q: "How many legs does a spider have?", choices: ["Six", "Ten", "Four", "Eight"], answer: 3, why: "Spiders are arachnids, and arachnids have eight legs." },
      { q: "Which organ pumps blood all through your body?", choices: ["Heart", "Liver", "Lung", "Stomach"], answer: 0, why: "The heart pumps blood through the circulatory system." },
      { q: "Which of these animals is a mammal?", choices: ["Shark", "Octopus", "Dolphin", "Penguin"], answer: 2, why: "Dolphins are warm-blooded mammals that nurse their young with milk." },
      { q: "What gas in the air do humans need to breathe to live?", choices: ["Carbon dioxide", "Nitrogen", "Oxygen", "Helium"], answer: 2, why: "Our cells use oxygen to release energy from food." },
      { q: "Which part of a plant absorbs water and minerals from the soil?", choices: ["Roots", "Leaves", "Stem", "Flower"], answer: 0, why: "Roots anchor the plant and take in water from the ground." },
      { q: "A baby frog that hatches from an egg and swims with a tail is called what?", choices: ["Cub", "Pup", "Calf", "Tadpole"], answer: 3, why: "Tadpoles later grow legs and lose their tails as they become frogs." },
      { q: "Which of these animals is a herbivore, eating only plants?", choices: ["Lion", "Cow", "Wolf", "Eagle"], answer: 1, why: "Cows graze on grass and other plants." },
      { q: "How many senses do humans traditionally have?", choices: ["Five", "Four", "Six", "Three"], answer: 0, why: "Sight, hearing, smell, taste, and touch are the five traditional senses." },
      { q: "What is the largest animal on Earth?", choices: ["African elephant", "Giraffe", "Blue whale", "Polar bear"], answer: 2, why: "The blue whale is the largest animal known to have ever lived." },
      { q: "Which blood cells carry oxygen around the body?", choices: ["White blood cells", "Red blood cells", "Platelets", "Skin cells"], answer: 1, why: "Red blood cells contain hemoglobin, which binds oxygen." },
      { q: "What sweet liquid do bees collect from flowers to make honey?", choices: ["Pollen", "Sap", "Dew", "Nectar"], answer: 3, why: "Bees convert flower nectar into honey." }
    ],
    "High School": [
      { q: "Which organelle is known as the powerhouse of the cell because it produces most of the cell's ATP?", choices: ["Nucleus", "Mitochondrion", "Ribosome", "Golgi apparatus"], answer: 1, why: "Mitochondria generate most ATP through cellular respiration." },
      { q: "DNA is built from four bases: adenine, thymine, cytosine, and which fourth base?", choices: ["Uracil", "Adenosine", "Phosphate", "Guanine"], answer: 3, why: "The four DNA bases are adenine, thymine, cytosine, and guanine." },
      { q: "Which process do plants use to convert sunlight, water, and carbon dioxide into glucose?", choices: ["Photosynthesis", "Respiration", "Fermentation", "Transpiration"], answer: 0, why: "Photosynthesis stores light energy in the bonds of glucose." },
      { q: "How many chromosomes are found in a typical human body (somatic) cell?", choices: ["23", "92", "46", "44"], answer: 2, why: "Human somatic cells have 46 chromosomes in 23 pairs." },
      { q: "Who authored On the Origin of Species, setting out evolution by natural selection?", choices: ["Gregor Mendel", "Louis Pasteur", "Charles Darwin", "James Watson"], answer: 2, why: "Darwin published the book in 1859 after decades of research." },
      { q: "Which organelle is the site of protein synthesis in the cell?", choices: ["Ribosome", "Lysosome", "Vacuole", "Nucleus"], answer: 0, why: "Ribosomes assemble amino acids into proteins." },
      { q: "An organism with two different alleles for a trait, such as Aa, is described as what?", choices: ["Homozygous", "Haploid", "Recessive", "Heterozygous"], answer: 3, why: "Heterozygous means carrying two different alleles for the same gene." },
      { q: "Which blood type is known as the universal donor for red blood cell transfusions?", choices: ["AB positive", "O negative", "A negative", "O positive"], answer: 1, why: "O negative blood lacks A, B, and Rh antigens, so it can be given to almost anyone." },
      { q: "What green pigment in plant cells absorbs light for photosynthesis?", choices: ["Chlorophyll", "Carotene", "Melanin", "Hemoglobin"], answer: 0, why: "Chlorophyll in chloroplasts captures light energy." },
      { q: "Which part of the brain is chiefly responsible for balance and coordination?", choices: ["Cerebrum", "Brainstem", "Cerebellum", "Hypothalamus"], answer: 2, why: "The cerebellum fine-tunes movement and balance." },
      { q: "Ordinary cell division by mitosis produces how many daughter cells from one parent cell?", choices: ["Four", "Two", "One", "Eight"], answer: 1, why: "Mitosis yields two genetically identical daughter cells." },
      { q: "Mushrooms, molds, and yeasts belong to which kingdom?", choices: ["Plantae", "Protista", "Bacteria", "Fungi"], answer: 3, why: "All three are fungi, which absorb nutrients from their surroundings." }
    ],
    "Expert": [
      { q: "Which enzyme unwinds and separates the two strands of the DNA double helix during replication?", choices: ["Ligase", "Helicase", "Primase", "Polymerase I"], answer: 1, why: "Helicase breaks the hydrogen bonds between base pairs at the replication fork." },
      { q: "In the E. coli lac operon, which molecule binds the repressor so transcription can proceed when lactose is present?", choices: ["Glucose", "cAMP", "Tryptophan", "Allolactose"], answer: 3, why: "Allolactose, derived from lactose, inactivates the lac repressor." },
      { q: "Which stop codon is nicknamed the amber codon?", choices: ["UAG", "UAA", "UGA", "AUG"], answer: 0, why: "UAG is amber, UAA is ochre, and UGA is opal; AUG is the start codon." },
      { q: "The Calvin cycle of photosynthesis takes place in which part of the chloroplast?", choices: ["Thylakoid membrane", "Grana", "Stroma", "Outer membrane"], answer: 2, why: "Carbon fixation occurs in the stroma, while the light reactions occur on thylakoid membranes." },
      { q: "Which enzyme fixes carbon dioxide in the first step of the Calvin cycle in C3 plants?", choices: ["ATP synthase", "PEP carboxylase", "Rubisco", "Carbonic anhydrase"], answer: 2, why: "Rubisco attaches CO2 to RuBP and is considered the most abundant enzyme on Earth." },
      { q: "What is the net gain of ATP molecules from glycolysis of one glucose molecule?", choices: ["Two", "Four", "Six", "Eight"], answer: 0, why: "Glycolysis makes four ATP but invests two, for a net of two." },
      { q: "The CRISPR-Cas9 system was adapted from a defense mechanism found in which organisms?", choices: ["Viruses", "Fungi", "Plants", "Bacteria"], answer: 3, why: "Bacteria use CRISPR and Cas enzymes to cut invading viral DNA." },
      { q: "During which phase of the cell cycle is the cell's DNA replicated?", choices: ["G1 phase", "S phase", "G2 phase", "M phase"], answer: 1, why: "The S, or synthesis, phase of interphase is when DNA is copied." },
      { q: "Telomerase extends the ends of chromosomes using what built-in template?", choices: ["Its own RNA template", "A DNA polymerase template", "A primer protein", "The lagging strand"], answer: 0, why: "Telomerase is a reverse transcriptase carrying its own short RNA template." },
      { q: "A point mutation that changes an amino acid codon into a stop codon is called what?", choices: ["Silent mutation", "Missense mutation", "Nonsense mutation", "Frameshift mutation"], answer: 2, why: "A nonsense mutation creates a premature stop codon, truncating the protein." },
      { q: "In chemiosmosis in the mitochondrion, ATP synthesis is driven by a gradient of which particles?", choices: ["Electrons", "Protons", "Sodium ions", "ADP molecules"], answer: 1, why: "Protons flowing through ATP synthase power ATP production." },
      { q: "Rosalind Franklin's X-ray diffraction image that revealed DNA's helical structure is known as what?", choices: ["Frame 23", "The Helix Photo", "Diffraction X", "Photo 51"], answer: 3, why: "Photo 51, taken in 1952, showed the clear X pattern of a helix." }
    ]
  },
  "Periodic Table": {
    "Middle School": [
      { q: "Which element do humans need to breathe in from the air to live?", choices: ["Carbon", "Oxygen", "Iron", "Gold"], answer: 1, why: "We breathe in oxygen, which our bodies use to release energy." },
      { q: "What is the chemical symbol for gold?", choices: ["Gd", "Ag", "Fe", "Au"], answer: 3, why: "Au comes from aurum, the Latin word for gold." },
      { q: "Which light metal element is used to make soda cans and foil?", choices: ["Aluminum", "Helium", "Sulfur", "Carbon"], answer: 0, why: "Aluminum is light, strong, and does not rust easily." },
      { q: "What gas is put in balloons to make them float?", choices: ["Oxygen", "Carbon dioxide", "Helium", "Nitrogen"], answer: 2, why: "Helium is lighter than air, so helium balloons rise." },
      { q: "Which element makes up about 78 percent of Earth's atmosphere?", choices: ["Oxygen", "Argon", "Nitrogen", "Hydrogen"], answer: 2, why: "Nitrogen is by far the most common gas in the air." },
      { q: "Diamonds are made of which element?", choices: ["Carbon", "Silicon", "Iron", "Calcium"], answer: 0, why: "A diamond is pure carbon arranged in a crystal structure." },
      { q: "What is the chemical symbol for iron?", choices: ["Ir", "In", "F", "Fe"], answer: 3, why: "Fe comes from ferrum, the Latin word for iron." },
      { q: "Which of these elements is a gas at room temperature?", choices: ["Iron", "Oxygen", "Gold", "Copper"], answer: 1, why: "Oxygen is a gas; the others are solid metals at room temperature." },
      { q: "Which element is the lightest of all and fuels the Sun?", choices: ["Hydrogen", "Helium", "Oxygen", "Carbon"], answer: 0, why: "Hydrogen is the lightest element and the Sun's main fuel." },
      { q: "Table salt is made of sodium and which other element?", choices: ["Oxygen", "Fluorine", "Chlorine", "Bromine"], answer: 2, why: "Salt is sodium chloride, a compound of sodium and chlorine." },
      { q: "Which liquid metal element was once common in glass thermometers?", choices: ["Lead", "Mercury", "Tin", "Zinc"], answer: 1, why: "Mercury is the only metal that is liquid at room temperature." },
      { q: "As of 2024, how many elements are on the modern periodic table?", choices: ["92", "100", "108", "118"], answer: 3, why: "The table is complete through element 118, oganesson." }
    ],
    "High School": [
      { q: "What is the atomic number of carbon?", choices: ["12", "6", "8", "14"], answer: 1, why: "Carbon has six protons, so its atomic number is 6." },
      { q: "The noble gases occupy which group of the periodic table?", choices: ["Group 1", "Group 2", "Group 17", "Group 18"], answer: 3, why: "Group 18 contains helium, neon, argon, and the other noble gases." },
      { q: "What is the most abundant element in the universe?", choices: ["Hydrogen", "Helium", "Oxygen", "Carbon"], answer: 0, why: "Hydrogen makes up roughly three quarters of normal matter in the universe." },
      { q: "Which element has the chemical symbol K?", choices: ["Krypton", "Calcium", "Potassium", "Phosphorus"], answer: 2, why: "K comes from kalium, the Latin name for potassium." },
      { q: "What is the maximum number of electrons the first electron shell can hold?", choices: ["Eight", "Eighteen", "Two", "Six"], answer: 2, why: "The first shell holds at most two electrons." },
      { q: "Which of these elements is a halogen?", choices: ["Chlorine", "Argon", "Sodium", "Calcium"], answer: 0, why: "Chlorine is in Group 17, the halogen family." },
      { q: "An atom's atomic mass is determined mainly by which particles in its nucleus?", choices: ["Electrons only", "Protons only", "Neutrons only", "Protons and neutrons"], answer: 3, why: "Protons and neutrons each weigh about one atomic mass unit; electrons weigh almost nothing." },
      { q: "Silver has which chemical symbol?", choices: ["Si", "Ag", "Au", "Sv"], answer: 1, why: "Ag comes from argentum, the Latin word for silver." },
      { q: "Who published the first widely recognized periodic table in 1869?", choices: ["Dmitri Mendeleev", "John Dalton", "Antoine Lavoisier", "Niels Bohr"], answer: 0, why: "Mendeleev arranged elements by mass and properties, predicting undiscovered ones." },
      { q: "What is the chemical symbol for tungsten?", choices: ["Tu", "Tg", "W", "Tn"], answer: 2, why: "W comes from wolfram, the element's German name." },
      { q: "Elements arranged in the same vertical column of the periodic table are called what?", choices: ["Periods", "Groups", "Blocks", "Series"], answer: 1, why: "Vertical columns are groups; horizontal rows are periods." },
      { q: "Which element has the highest electronegativity of all elements?", choices: ["Oxygen", "Chlorine", "Nitrogen", "Fluorine"], answer: 3, why: "Fluorine attracts electrons more strongly than any other element." }
    ],
    "Expert": [
      { q: "Which synthetic element, atomic number 94, is named after a dwarf planet?", choices: ["Uranium", "Plutonium", "Americium", "Curium"], answer: 1, why: "Plutonium follows uranium and neptunium in the planet-naming sequence." },
      { q: "What is the ground-state electron configuration of a neutral iron atom (atomic number 26)?", choices: ["[Ar] 3d8", "[Ar] 4s2 3d4", "[Ar] 3d6 4s0", "[Ar] 4s2 3d6"], answer: 3, why: "Iron's 26 electrons fill as [Ar] 4s2 3d6." },
      { q: "Which metal has the highest melting point of any metal, at about 3,422 degrees Celsius?", choices: ["Tungsten", "Rhenium", "Osmium", "Chromium"], answer: 0, why: "Tungsten's extreme melting point made it ideal for light bulb filaments." },
      { q: "The lanthanide elements belong to which block of the periodic table?", choices: ["s-block", "d-block", "f-block", "p-block"], answer: 2, why: "Lanthanides and actinides fill the f orbitals, forming the f-block." },
      { q: "Which element did Marie and Pierre Curie discover in 1898 and name after Marie's homeland of Poland?", choices: ["Radium", "Radon", "Polonium", "Francium"], answer: 2, why: "Polonium, named for Poland, was announced in July 1898, months before radium." },
      { q: "What is the atomic number of uranium?", choices: ["92", "90", "94", "88"], answer: 0, why: "Uranium has 92 protons and is the heaviest naturally occurring element in quantity." },
      { q: "Element 118, oganesson, is classified in which group of the periodic table?", choices: ["Halogens", "Alkali metals", "Transition metals", "Noble gases"], answer: 3, why: "Oganesson completes Group 18, the noble gases, though it is predicted to be unusually reactive." },
      { q: "Whose 1829 law of triads was an early step toward the periodic table?", choices: ["Johann Dobereiner", "John Newlands", "Lothar Meyer", "Henry Moseley"], answer: 1, why: "Dobereiner grouped elements in threes with similar properties, such as chlorine, bromine, and iodine." },
      { q: "The element gallium takes its name from the Latin word for which ancient region?", choices: ["Gaul (France)", "Greece", "Germany", "Wales"], answer: 0, why: "Gallia is Latin for Gaul, roughly modern France." },
      { q: "Which superheavy element, atomic number 114, is named for the founder of the Flerov Laboratory, Georgy Flyorov?", choices: ["Moscovium", "Copernicium", "Flerovium", "Nihonium"], answer: 2, why: "Flerovium, symbol Fl, honors the Russian physicist Georgy Flyorov." },
      { q: "Henry Moseley's X-ray work established that an element's identity is determined by what?", choices: ["Atomic mass", "Nuclear charge (proton count)", "Electron shells", "Neutron count"], answer: 1, why: "Moseley's law showed atomic number equals the number of protons." },
      { q: "Which element is generally cited as the densest of all elements?", choices: ["Lead", "Gold", "Iridium", "Osmium"], answer: 3, why: "Osmium's density of about 22.6 grams per cubic centimeter edges out iridium." }
    ]
  },
  "US History": {
    "Middle School": [
      { q: "Who was the first President of the United States?", choices: ["Thomas Jefferson", "George Washington", "Abraham Lincoln", "John Adams"], answer: 1, why: "George Washington served as president from 1789 to 1797." },
      { q: "In which year did the United States declare independence from Britain?", choices: ["1775", "1783", "1800", "1776"], answer: 3, why: "The Declaration of Independence was adopted on July 4, 1776." },
      { q: "Which ship carried the Pilgrims to America in 1620?", choices: ["Mayflower", "Santa Maria", "Nina", "Constitution"], answer: 0, why: "The Mayflower brought the Pilgrims to Plymouth in 1620." },
      { q: "The Statue of Liberty was a gift to the United States from which country?", choices: ["England", "Spain", "France", "Italy"], answer: 2, why: "France gave the statue, which was dedicated in New York Harbor in 1886." },
      { q: "Who was president of the United States during the Civil War?", choices: ["George Washington", "Abraham Lincoln", "Andrew Jackson", "Ulysses S. Grant"], answer: 2, why: "Abraham Lincoln led the Union through the Civil War, 1861 to 1865." },
      { q: "What is the title of the national anthem of the United States?", choices: ["The Star-Spangled Banner", "America the Beautiful", "God Bless America", "Yankee Doodle"], answer: 0, why: "Francis Scott Key wrote the words during the War of 1812." },
      { q: "How many British colonies originally formed the United States?", choices: ["Ten", "Fifty", "Seven", "Thirteen"], answer: 3, why: "The thirteen colonies are remembered in the flag's thirteen stripes." },
      { q: "Who delivered the famous I Have a Dream speech in 1963?", choices: ["John F. Kennedy", "Martin Luther King Jr.", "Rosa Parks", "Barack Obama"], answer: 1, why: "King gave the speech at the March on Washington before the Lincoln Memorial." },
      { q: "Which ocean borders the East Coast of the United States?", choices: ["Atlantic Ocean", "Pacific Ocean", "Indian Ocean", "Arctic Ocean"], answer: 0, why: "The Atlantic lies to the east; the Pacific borders the West Coast." },
      { q: "The first ten amendments to the Constitution are known as what?", choices: ["The Preamble", "The Articles", "The Bill of Rights", "The Federalist Papers"], answer: 2, why: "The Bill of Rights was ratified in 1791 to protect individual freedoms." },
      { q: "Which famous American document begins with the words We the People?", choices: ["The Declaration of Independence", "The U.S. Constitution", "The Emancipation Proclamation", "The Gettysburg Address"], answer: 1, why: "We the People opens the Preamble to the Constitution." },
      { q: "Who was the first person to walk on the Moon, in 1969?", choices: ["Buzz Aldrin", "Yuri Gagarin", "Michael Collins", "Neil Armstrong"], answer: 3, why: "Neil Armstrong stepped onto the Moon on July 20, 1969; Aldrin followed minutes later." }
    ],
    "High School": [
      { q: "In the Louisiana Purchase of 1803, the United States bought a vast territory from which country?", choices: ["Spain", "France", "Britain", "Mexico"], answer: 1, why: "Napoleon's France sold the territory, roughly doubling the size of the U.S." },
      { q: "Which constitutional amendment abolished slavery in the United States?", choices: ["14th Amendment", "15th Amendment", "12th Amendment", "13th Amendment"], answer: 3, why: "The 13th Amendment was ratified in December 1865." },
      { q: "The first shots of the American Civil War were fired at which South Carolina fort?", choices: ["Fort Sumter", "Fort Ticonderoga", "Fort McHenry", "Fort Knox"], answer: 0, why: "Confederate forces bombarded Fort Sumter in Charleston Harbor in April 1861." },
      { q: "Which president issued the Emancipation Proclamation in 1863?", choices: ["Andrew Johnson", "Ulysses S. Grant", "Abraham Lincoln", "James Buchanan"], answer: 2, why: "Lincoln's proclamation freed enslaved people in the rebelling states." },
      { q: "The phrase shot heard round the world describes the opening fighting of which 1775 battle?", choices: ["Bunker Hill", "Saratoga", "Lexington and Concord", "Yorktown"], answer: 2, why: "Emerson's poem recalled the first battles of the Revolutionary War in Massachusetts." },
      { q: "Kamala Harris made history in 2021 by becoming the first woman to hold which office?", choices: ["Secretary of State", "Vice President", "Chief Justice", "Speaker of the House"], answer: 1, why: "Harris was sworn in as Vice President on January 20, 2021 — the first woman, and first Black and South Asian American, in the role." },
      { q: "In which year did the 19th Amendment give women the right to vote nationwide?", choices: ["1910", "1925", "1848", "1920"], answer: 3, why: "The amendment was ratified in August 1920." },
      { q: "Which president resigned in 1974 because of the Watergate scandal?", choices: ["Lyndon Johnson", "Richard Nixon", "Gerald Ford", "Jimmy Carter"], answer: 1, why: "Nixon resigned on August 9, 1974, the only president ever to do so." },
      { q: "The attack on Pearl Harbor that brought the United States into World War II happened on what date?", choices: ["December 7, 1941", "September 1, 1939", "June 6, 1944", "August 6, 1945"], answer: 0, why: "Japan attacked the naval base at Pearl Harbor, Hawaii, on December 7, 1941." },
      { q: "Which 1823 doctrine warned European powers against new colonization in the Americas?", choices: ["The Truman Doctrine", "The Marshall Plan", "The Monroe Doctrine", "The Roosevelt Corollary"], answer: 2, why: "President James Monroe announced the doctrine in his 1823 address to Congress." },
      { q: "Who was the principal author of the Declaration of Independence?", choices: ["John Adams", "Thomas Jefferson", "Benjamin Franklin", "James Madison"], answer: 1, why: "Jefferson drafted the Declaration, with edits from Adams and Franklin." },
      { q: "Juneteenth became a United States federal holiday in which year?", choices: ["2019", "2020", "2021", "2023"], answer: 2, why: "Juneteenth — marking the end of slavery in Texas on June 19, 1865 — became a federal holiday in June 2021." }
    ],
    "Expert": [
      { q: "Which 1803 Supreme Court case established the principle of judicial review?", choices: ["McCulloch v. Maryland", "Marbury v. Madison", "Gibbons v. Ogden", "Dred Scott v. Sandford"], answer: 1, why: "Chief Justice John Marshall's opinion asserted the Court's power to strike down laws." },
      { q: "The Compromise of 1850 admitted which territory as a free state, upsetting the Senate balance?", choices: ["Texas", "Oregon", "Kansas", "California"], answer: 3, why: "California entered the Union as a free state in September 1850." },
      { q: "Which president signed the Indian Removal Act of 1830?", choices: ["Andrew Jackson", "Martin Van Buren", "James Monroe", "John Quincy Adams"], answer: 0, why: "Jackson championed the act that led to the forced relocation of southeastern tribes." },
      { q: "The famed Black regiment the 54th Massachusetts made its celebrated 1863 assault on which fort?", choices: ["Fort Sumter", "Fort Pillow", "Fort Wagner", "Fort Donelson"], answer: 2, why: "The 54th attacked Fort Wagner near Charleston in July 1863." },
      { q: "Which 1848 treaty ended the Mexican-American War?", choices: ["Treaty of Paris", "Treaty of Ghent", "Treaty of Guadalupe Hidalgo", "Adams-Onis Treaty"], answer: 2, why: "The treaty gave the U.S. California and much of the Southwest." },
      { q: "The financial Panic of 1837 began just weeks after which president took office?", choices: ["Martin Van Buren", "Andrew Jackson", "William Henry Harrison", "John Tyler"], answer: 0, why: "Van Buren inherited the crisis in March 1837, though Jackson's bank policies helped cause it." },
      { q: "Which amendment repealed national Prohibition in 1933?", choices: ["18th Amendment", "19th Amendment", "20th Amendment", "21st Amendment"], answer: 3, why: "The 21st Amendment repealed the 18th, the only amendment ever fully repealed." },
      { q: "The XYZ Affair of 1797 involved agents of which country demanding bribes from American diplomats?", choices: ["Britain", "France", "Spain", "The Netherlands"], answer: 1, why: "French agents, labeled X, Y, and Z, demanded bribes before talks could begin." },
      { q: "Which June 1942 battle is considered the turning point of the Pacific Theater in World War II?", choices: ["Battle of Midway", "Battle of the Coral Sea", "Battle of Leyte Gulf", "Battle of Iwo Jima"], answer: 0, why: "U.S. forces sank four Japanese carriers at Midway, halting Japan's advance." },
      { q: "The Seneca Falls Convention of 1848 issued which document, modeled on the Declaration of Independence?", choices: ["The Declaration of Rights", "The Woman's Manifesto", "The Declaration of Sentiments", "The Seneca Statement"], answer: 2, why: "Elizabeth Cady Stanton drafted the Declaration of Sentiments demanding women's rights." },
      { q: "Shays' Rebellion of 1786-87, which helped spur the Constitutional Convention, erupted in which state?", choices: ["Virginia", "Massachusetts", "Pennsylvania", "New York"], answer: 1, why: "Indebted Massachusetts farmers, led by Daniel Shays, rose against the state government." },
      { q: "The accusation of a corrupt bargain arose from which presidential election, decided by the House of Representatives?", choices: ["1800", "1828", "1876", "1824"], answer: 3, why: "In 1824 the House chose John Quincy Adams, who then made Henry Clay Secretary of State." }
    ]
  }
};

// Trivia Lens — fill-in-the-blank bank. accept[] lists every normalized answer that counts.
// Normalization at play time: lowercase, trim, strip trailing punctuation, collapse spaces, drop a leading "the ".
const FIB_BANK = {
  "Pop Culture": {
    "Middle School": [
      { q: "In the movie Frozen, the snowman who loves summer is named ____.", accept: ["olaf"], why: "Olaf the snowman dreams of experiencing summer." },
      { q: "The Marvel superhero bitten by a radioactive spider is ____.", accept: ["spider-man", "spider man", "spiderman", "peter parker"], why: "Peter Parker becomes Spider-Man after the spider bite." }
    ],
    "High School": [
      { q: "The Netflix hit about a deadly playground-games competition from South Korea is ____ Game.", accept: ["squid"], why: "Squid Game became one of Netflix's most-watched series ever." },
      { q: "Baby Yoda's real name in The Mandalorian is ____.", accept: ["grogu"], why: "Grogu's name was revealed in the second season of The Mandalorian." }
    ],
    "Expert": [
      { q: "Wolverine's claws and skeleton are coated in the fictional metal ____.", accept: ["adamantium"], why: "Adamantium is the near-indestructible Marvel Comics alloy." },
      { q: "The 2023 Christopher Nolan film about the atomic bomb is titled ____.", accept: ["oppenheimer"], why: "Oppenheimer won Best Picture at the 2024 Academy Awards." }
    ]
  },
  "Music": {
    "Middle School": [
      { q: "Complete the nursery rhyme: 'Twinkle, twinkle, little ____.'", accept: ["star"], why: "The rhyme pairs 'star' with 'what you are.'" },
      { q: "The instrument with 88 keys, played by pressing them with your fingers, is the ____.", accept: ["piano"], why: "A standard piano has 52 white keys and 36 black keys — 88 total." }
    ],
    "High School": [
      { q: "Taylor Swift's re-recorded albums carry the label '____'s Version.'", accept: ["taylor"], why: "The (Taylor's Version) releases let Swift own her master recordings." },
      { q: "Kendrick Lamar's 2024 anthem that swept the 2025 Grammys is 'Not Like ____.'", accept: ["us"], why: "'Not Like Us' won Record and Song of the Year at the 2025 Grammys." }
    ],
    "Expert": [
      { q: "Beyoncé's 2024 country album is titled 'Cowboy ____.'", accept: ["carter"], why: "Cowboy Carter won Album of the Year at the 2025 Grammys." },
      { q: "A scale built from five notes is called a ____ scale.", accept: ["pentatonic"], why: "Pentatonic scales appear in folk and rock music worldwide." }
    ]
  },
  "Sports": {
    "Middle School": [
      { q: "A soccer team fields ____ players per side during a match.", accept: ["11", "eleven"], why: "Eleven per side, including the goalkeeper." },
      { q: "The Olympic flag displays ____ interlaced rings.", accept: ["5", "five"], why: "The five rings represent the inhabited continents." }
    ],
    "High School": [
      { q: "A regulation baseball game lasts ____ innings.", accept: ["9", "nine"], why: "Nine innings, unless tied — then extras." },
      { q: "A marathon covers 26.2 miles, which is about ____ kilometers.", accept: ["42", "42.2", "42km", "42 km"], why: "The official marathon distance is 42.195 km." }
    ],
    "Expert": [
      { q: "Usain Bolt's 100m world record, set in 2009, stands at ____ seconds.", accept: ["9.58"], why: "Bolt ran 9.58 in Berlin in 2009 — still the record." },
      { q: "In the NFL, a touchdown is worth ____ points.", accept: ["6", "six"], why: "Six for the touchdown; the kick or conversion comes after." }
    ]
  },
  "Biology": {
    "Middle School": [
      { q: "The part of the cell known as its powerhouse is the ____.", accept: ["mitochondria", "mitochondrion"], why: "Mitochondria produce most of the cell's energy (ATP)." },
      { q: "Plants make their own food using sunlight in a process called ____.", accept: ["photosynthesis"], why: "Photosynthesis turns light, water, and CO2 into sugar and oxygen." }
    ],
    "High School": [
      { q: "DNA is famous for its twisted-ladder shape, called a double ____.", accept: ["helix"], why: "Watson and Crick described the double helix in 1953." },
      { q: "Cell division that produces two identical daughter cells is called ____.", accept: ["mitosis"], why: "Mitosis is how the body grows and repairs tissue." }
    ],
    "Expert": [
      { q: "The stop codon UAG is nicknamed the ____ codon.", accept: ["amber"], why: "The three stop codons are amber (UAG), ochre (UAA), and opal (UGA)." },
      { q: "During DNA replication, the enzyme that unzips the double helix is ____.", accept: ["helicase"], why: "Helicase breaks the hydrogen bonds between base pairs." }
    ]
  },
  "Periodic Table": {
    "Middle School": [
      { q: "The chemical symbol for gold is ____.", accept: ["au"], why: "Au comes from 'aurum,' the Latin word for gold." },
      { q: "The lightest element in the universe is ____.", accept: ["hydrogen"], why: "Hydrogen, atomic number 1, is the lightest element." }
    ],
    "High School": [
      { q: "The chemical symbol for sodium is ____.", accept: ["na"], why: "Na comes from 'natrium,' sodium's Latin name." },
      { q: "The most abundant gas in Earth's atmosphere is ____.", accept: ["nitrogen"], why: "Nitrogen makes up about 78% of the air." }
    ],
    "Expert": [
      { q: "The element named after Marie Curie's homeland, Poland, is ____.", accept: ["polonium"], why: "Curie named polonium for Poland in 1898." },
      { q: "The heaviest naturally occurring element is ____.", accept: ["uranium"], why: "Uranium (atomic number 92) is the heaviest primordial element." }
    ]
  },
  "US History": {
    "Middle School": [
      { q: "The first President of the United States was George ____.", accept: ["washington"], why: "George Washington served from 1789 to 1797." },
      { q: "The Declaration of Independence was adopted in the year ____.", accept: ["1776"], why: "July 4, 1776 — the date Independence Day celebrates." }
    ],
    "High School": [
      { q: "The war fought between the Union and the Confederacy is the ____ War.", accept: ["civil"], why: "The Civil War was fought from 1861 to 1865." },
      { q: "Slavery was abolished in the United States by the ____ Amendment.", accept: ["13th", "thirteenth", "13"], why: "The 13th Amendment was ratified in 1865." }
    ],
    "Expert": [
      { q: "The 1803 land deal that roughly doubled the size of the United States was the ____ Purchase.", accept: ["louisiana"], why: "The Louisiana Purchase cost about $15 million." },
      { q: "The scandal that led to President Nixon's resignation is known as ____.", accept: ["watergate"], why: "Nixon resigned in August 1974 over Watergate." }
    ]
  }
};

// Trivia Lens — category arenas, wheel wedges, and the Tonight at the Marquee wire.
// Ported from the v1.3 build (arena names/colors) + wheel-feature-spec.md (Oct 23, 2026).
const TRIVIA_CATS = [
  { name: "Pop Culture", icon: "\uD83C\uDFAC", arena: "The Spotlight", color: "#7c3aed" },
  { name: "Music", icon: "\uD83C\uDFB5", arena: "The Jukebox", color: "#db2777" },
  { name: "Sports", icon: "\uD83C\uDFC6", arena: "The Stadium", color: "#ea580c" },
  { name: "Biology", icon: "\uD83E\uDDEC", arena: "The Lab", color: "#0891b2" },
  { name: "Periodic Table", icon: "\u2697\uFE0F", arena: "The Element Vault", color: "#2563eb" },
  { name: "US History", icon: "\uD83C\uDFDB\uFE0F", arena: "The Time Machine", color: "#b45309" }
];
const WHEEL_WEDGES = TRIVIA_CATS.map(function (c) { return { name: c.name, arena: c.arena, color: c.color, icon: c.icon, house: false }; })
  .concat([{ name: "House Choice", arena: "The House Decides", color: "#d4af37", icon: "\u2B50", house: true }]);
// Living ticker — "Tonight at the Marquee" wire. Seeded prototype items; every item is
// a community-style report shape and is tagged Sample per the living-ticker rule.
const TRIVIA_WIRE = [
  { text: "A room in Plano just cleared The Element Vault at Expert \u2014 perfect round under the lights", tag: "Sample" },
  { text: "Tonight\u2019s most-spun arena so far: The Jukebox (Music)", tag: "Sample" },
  { text: "Streak watch: a 9-in-a-row run is live in The Stadium (Sports)", tag: "Sample" },
  { text: "House Choice came up twice at one table last night \u2014 the room voted History both times", tag: "Sample" },
  { text: "Daily Challenge crowd favorite: The Lab (Biology) at High School level", tag: "Sample" },
  { text: "New personal best reported from the marquee floor: 10 of 10 in The Spotlight", tag: "Sample" }
];

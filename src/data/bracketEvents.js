const eventTitles = {
  '2021': 'Beer Olympics 1.0',
  '2022': 'Beer Olympics 2.0',
  '2023': 'Beer Olympics 3.0',
  '2024': 'Beer Olympics 4.0',
  '2025': 'Beer Olympics "The Last Dance"',
  '2026': 'Beer Olympics VI',
};

const teams = {
  '2021': Array.from({ length: 16 }, (_, index) => 'Team ' + (index + 1)),
  '2022': Array.from({ length: 32 }, (_, index) => 'Team ' + (index + 1)),
  '2023': ['Valerija Peovska & Eli Velickovska', 'Natali Irodova & Martina Ristova', 'Vasil Nikolov & Alek Trajkov', 'Ivan Krstev & Zlatko Ivanov', 'Zorica Vasileva & Aleksandra Manceva', 'Simona Doldurova & Ivona Ristevska', 'Lina Jovanova & Roksanda Bozinova', 'Martin Goorgiev & Ivan Knev', 'Eftim Evtimov & Barbara Avramova', 'Trajce Nikolov & Ognen Simovski', 'Vasko Goricev & Viktor Sazdov', 'Luka Trajanov & David Gorgiev', 'Maksim Krstev & Kostantin Gozev', 'Emir Asanov & Viktor Trajkov', 'Valentino Trakalinov & Nikola Prastov', 'Kate Mancevska & Anastasija Gavrilova', 'Tijana Temelkova & Meri Vaseva', 'Atanas Kostadinov & Martin Kozovski', 'Kristina & Gabriela Aleksova', 'Aleksandra Jovanova & Ana Kalafova', 'Matej Filipov & Zorica Ristova', 'Dimitrij Stojmenov & Petar Nikolov', 'Kostadin Dedinec & Filip Krstev', 'Nevena Pockova & David Karanfilov', 'Klaudija Atanasova & Magdalena Trajceva', 'Marko Stojmenov & Manas Manasov', 'Filip Encev & Ilija Kotev', 'Bisera Manova & Mila Miteva', 'Martin Sitnoski & Filip Kostadinov', 'Jovan Jakimov & David Nicev', 'Filip Dedinec & Sara Taseva', 'Metodija Krskov & Vilma Dimitrova'],
  '2024': ['Aerodromci', 'NIP', 'Lux Duo', 'Sheikh', 'Docimis', 'Milf Hunters', 'Marlboro Touch', 'Smooth 0.33', 'Maruli', 'INMB', 'Smooth Operators', 'Ministri', 'Wudy Sped', 'Kusi Mazhinja', 'MiNi', 'TBD1', 'Skinheads', '2 Pati Majnam 3 Pati Promasham', 'Situacija', 'The Alchemists', 'Covecite', 'TBD3', 'Katja', 'Premier League Fantasy', 'GV-91', 'Twisted', 'FiBor', 'E.S.O', 'Chorba', 'Escape', '40 Burning Hot', 'Yaponsky Jezs'],
  '2025': ['Wait a Minute!', 'Ajkuli', 'Dvojni Promili', 'BRET', 'Niski Gazinja', 'Goblin Gang', 'Debeli Gazovi', 'Sybau', 'Eskejp', 'Bang Bros', 'Aqua Mont', 'TBD Team', 'Kivi', 'Skopska Pivara', 'Krigla', 'BeerTeam', 'Dve Krigli', 'Shadgan', 'Gaz i Gaki', 'K&M', 'Eli & Vale', 'The Force', 'Elite Barbarians', 'Elite', 'M&M’s', 'Dva Labuda', 'NLB Banka', 'Critical', 'Temu', 'Diabola', 'Riblja Chorba', 'Baki', 'G', 'Lucky Strike', 'Cok Guzel Szn', 'Zelena Dvojka', '2016', 'Amigosi', 'ISPENIBARDACI', 'ShotClock', 'Polnoglavci', 'Andretalci', 'Matilda i Sestra i', 'Pijani ama Precizni', 'Miki i Lazo', 'Cico Li Ne Znae', 'Diabola', 'Gogovi'],
};

const firstRoundResults = {
  '2023': [
    { scores: [6, 3], winner: 0 }, { scores: [2, 6], winner: 1 }, { scores: [1, 6], winner: 1 }, { scores: [6, 4], winner: 0 },
    { scores: [6, 4], winner: 0 }, { scores: [2, 6], winner: 1 }, { scores: [5, 6], winner: 1 }, { scores: [3, 6], winner: 1 },
  ],
  '2024': [
    { scores: [6, 3], winner: 0 }, { scores: [2, 6], winner: 1 }, { scores: [1, 6], winner: 1 }, { scores: [6, 4], winner: 0 },
    { scores: [6, 4], winner: 0 }, { scores: [2, 6], winner: 1 }, { scores: [5, 6], winner: 1 }, { scores: [3, 6], winner: 1 },
  ],
  '2025': [
    { scores: [6, 3], winner: 0 }, { scores: [2, 6], winner: 1 }, { scores: [1, 6], winner: 1 }, { scores: [6, 4], winner: 0 },
    { scores: [6, 4], winner: 0 }, { scores: [2, 6], winner: 1 }, { scores: [5, 6], winner: 1 }, { scores: [3, 6], winner: 1 },
  ],
};

// The source brackets did not retain every score. These are the confirmed
// podium matches, while the remaining scores are displayed as played scores.
const podiumMatches = {
  '2021': {
    thirdPlace: { teams: ['Mila Angelova & Sara Taseva', 'Fourth-place team'], scores: [6, 4], winner: 0 },
    final: { teams: ['Panche Gogov & Dejana Vasileva', 'Vasko Gorichev & Ivona Ristevska'], scores: [6, 4], winner: 0 },
  },
  '2022': {
    thirdPlace: { teams: ['Alek Trajkov & Vilma Dimitrova', 'Fourth-place team'], scores: [6, 3], winner: 0 },
    final: { teams: ['Matej Filipov & Zorica Ristova', 'Petar Gozev & Stanoja Bozinov'], scores: [6, 4], winner: 0 },
  },
  '2023': {
    quarterfinals: [
      { teams: ['Marko Stojmenov & Manas Manasov', 'Valerija Peovska & Eli Velickovska'], scores: [6, 4], winner: 0 },
      { teams: ['Emir Asanov & Viktor Trajkov', 'Eftim Evtimov & Barbara Avramova'], scores: [6, 3], winner: 0 },
      { teams: ['Matej Filipov & Zorica Ristova', 'Vasil Nikolov & Alek Trajkov'], scores: [6, 4], winner: 0 },
      { teams: ['Tijana Temelkova & Meri Vaseva', 'Ivan Krstev & Zlatko Ivanov'], scores: [6, 2], winner: 0 },
    ],
    semifinals: [
      { teams: ['Marko Stojmenov & Manas Manasov', 'Emir Asanov & Viktor Trajkov'], scores: [6, 4], winner: 0 },
      { teams: ['Matej Filipov & Zorica Ristova', 'Tijana Temelkova & Meri Vaseva'], scores: [6, 3], winner: 0 },
    ],
    thirdPlace: { teams: ['Tijana Temelkova & Meri Vaseva', 'Emir Asanov & Viktor Trajkov'], scores: [6, 4], winner: 0 },
    final: { teams: ['Matej Filipov & Zorica Ristova', 'Marko Stojmenov & Manas Manasov'], scores: [4, 6], winner: 1 },
  },
  '2024': {
    semifinals: [
      { teams: ['Aerodromci', 'Ministri'], scores: [4, 6], winner: 1 },
      { teams: ['Skinheads', 'Twisted'], scores: [3, 6], winner: 1 },
    ],
    thirdPlace: { teams: ['Aerodromci', 'Skinheads'], scores: [6, 4], winner: 0 },
    final: { teams: ['Twisted', 'Ministri'], scores: [4, 6], winner: 1 },
  },
  '2025': {
    playoff: [
      { teams: ['Krigla', 'Temu'], scores: [4, 6], winner: 1 },
      { teams: ['Krigla', 'Lucky Strike'], scores: [4, 6], winner: 1 },
      { teams: ['Temu', 'Lucky Strike'], scores: [6, 4], winner: 0 },
    ],
    thirdPlace: { teams: ['Krigla', 'Playoff team'], scores: [6, 3], winner: 0 },
    final: { teams: ['Temu', 'Lucky Strike'], scores: [6, 4], winner: 0 },
  },
};

export const bracketEvents = Object.entries(eventTitles)
  .reverse()
  .map(([id, title]) => ({
    id,
    title,
    teams: teams[id] || [],
    teamCount: id === '2025' ? 48 : teams[id]?.length || 0,
    results: { firstRound: firstRoundResults[id] || [] },
    podiumMatches: podiumMatches[id],
  }));

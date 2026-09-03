export const eventDate = '2026-07-23T19:00:00+02:00';

export const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Games', href: '#games' },
  { label: 'Brackets', href: '/bracket.html' },
  { label: 'Tickets', href: '/tickets.html' },
  { label: 'T-Shirts', href: '/t-shirts.html' },
  { label: 'Hall of Fame', href: '/halloffame.html' },
  { label: 'Gallery', href: '/gallery.html' },
  { label: 'Contact', href: '#contact' },
];

export const tagCloudImages = Array.from(
  { length: 10 },
  (_, index) => `/media/tagcloud/tag${index + 1}.jpg`,
);

export const games = [
  {
    id: 'pong',
    title: ['Beer Pong', 'Duos'],
    description: 'The classic beer game to get the night started right!',
    image: '/media/beerPong.png',
    blob: '/media/pongBlob.png',
    imageAlt: 'Beer Pong',
    reversed: true,
    modalTitle: 'Beer Pong Duos rules',
    modalImage: '/media/beerPongModal.webp',
    rules: [
      'The cup formation is 3-2-1 (6 cups).',
      'Each game lasts 10 minutes; overtime lasts 2 minutes.',
      'Each team may reform the cups once per game.',
      'Both players shoot a ball and may shoot simultaneously.',
      'A standard shot is worth one cup; a bounce shot is worth two.',
      'A bounce shot can be blocked. Illegal blocks cost one cup.',
      'If both shooters score in the same cup, the opposing team loses additional cups.',
      'When a team wins with one cup left, the other team gets two shots to force overtime.',
    ],
    modalLink: { label: 'Prize Pool', href: '/prizepool.html' },
  },
  {
    id: 'moment',
    title: ['Own', 'The Moment'],
    description: 'Take part in our newest competition and win a great prize!',
    image: '/media/polaroid.png',
    blob: '/media/chugBlob.png',
    imageAlt: 'Own The Moment',
    modalTitle: 'Own The Moment',
    modalImage: '/media/gallery-optimized/BeerOlympics_2023_20.webp',
    rules: [
      'Show us your best moment from Beer Olympics and compete to be crowned the one who owned the night.',
      'Own a Beer Olympics T-shirt.',
      'Take a photo with at least two people in it.',
      'Post it to an Instagram story, tag @beerolympics.official, and use #OwnTheMoment.',
      'The winner is selected by voting.',
    ],
    modalLink: { label: 'Vote', href: '/ownthemoment.html' },
  },
  {
    id: 'lottery',
    title: ['', 'Lottery'],
    description: 'Buy your tickets and get a shot at winning prizes!',
    image: '/media/Beer Olympics Lottery.jpg',
    blob: '/media/pongBlob.png',
    imageAlt: 'Beer Olympics Lottery',
    reversed: true,
    modalTitle: 'Beer Olympics Lottery',
    modalImage: '/media/alcohol.webp',
    rules: [
      'Buying a ticket is the only condition for entering the lottery.',
      'A ticket costs 50 MKD.',
      'Each person can buy up to ten tickets.',
      'Three prizes are awarded through a random ticket draw.',
    ],
    modalLink: { label: 'See Prizes', href: '/lottery.html' },
  },
];

export interface Coupon {
  id: string;
  title: string;
  image: string;
  rating: number;
  type: string;
  description: string;
  couponsLeft: number;
  usesToday: number;
  category: string;
  details: string;
  isStudentOnly?: boolean;
}

export const COUPONS: Coupon[] = [
  {
    id: '1',
    title: 'Apple Discount for students',
    image: 'https://i.postimg.cc/YC7vTjX4/appleeducation.jpg',
    rating: 5.0,
    type: '90% OFF Apple student discount',
    description: 'Apple Discount for students 90% off your purchase',
    couponsLeft: 478,
    usesToday: 51,
    category: 'Discount',
    details: '90% OFF Apple student discount — available for verified students. Applies automatically at checkout on eligible products like iPhone 17 and Pink MacBook Neo. Limited time only.',
    isStudentOnly: true
  },
  {
    id: '11',
    title: 'Target Discount for students',
    image: 'https://i.postimg.cc/MKysH2cs/free-Target-gift-card.jpg',
    rating: 5.0,
    type: '80% OFF Target student discount',
    description: 'Target Discount for students 90% off your purchase',
    couponsLeft: 278,
    usesToday: 71,
    category: 'Discount',
    details: '80% OFF Target student discount — available for verified students. Applies automatically at checkout on eligible products like iPhone 17 and Pink MacBook Neo. Limited time only.',
    isStudentOnly: true
  },
  {
    id: '12',
    title: ' Starbucks discount for students',
    image: 'https://i.postimg.cc/8kvGmqZ7/shutterstock-editorial-14418023bd.jpg',
    rating: 5.0,
    type: '90% off drinks & food',
    description: '90% off drinks & food — no code needed, the discount applies automatically.',
    couponsLeft: 278,
    usesToday: 71,
    category: 'Discount',
    details: '90% OFF Starbucks student discount — available for verified students. Applies automatically at checkout on eligible drinks and menu items. Limited time only.',
    isStudentOnly: true
  },
  {
    id: '2',
    title: 'PS Plus Discount Codes',
    image: 'https://coldcoupons.com/public/assets/uploads/coupon_banners/coupon_109_344c5554fd2d5da4.webp',
    rating: 4.8,
    type: 'Free PS Plus',
    description: 'Get 12 Months of PS Plus Premium',
    couponsLeft: 678,
    usesToday: 36,
    category: 'Games',
    details: 'PlayStation Plus Premium offers access to hundreds of PS4 and PS5 games, classic titles from PS1, PS2, and PSP, cloud streaming, game trials, monthly games, exclusive discounts, online multiplayer, cloud saves, and Share Play.'
  },
  {
    id: '3',
    title: 'Xbox Game Pass Ultimate',
    image: 'https://thecodechest.com/public/assets/uploads/coupon_banners/coupon_36_d791fe586706c356.png',
    rating: 4.9,
    type: '12 Months Free',
    description: 'Get 12 Months of Game Pass Ultimate',
    couponsLeft: 959,
    usesToday: 38,
    category: 'Games',
    details: 'Enjoy 12 Months of Free Xbox Game Pass with this one-time use code. Redeem it directly on the platform to access a wide library of games and exclusive member benefits.'
  },
  {
    id: '4',
    title: 'EA SPORTS FC™ 26 Free Game Key',
    image: 'https://lulucoupons.com/public/assets/uploads/coupon_banners/coupon_196_f4c6f23166ded5cc.jpg',
    rating: 4.9,
    type: 'Free Game',
    description: 'EA SPORTS FC™ 26 Free Code',
    couponsLeft: 832,
    usesToday: 61,
    category: 'Games',
    details: 'Get EA SPORTS FC™ 26 with this free game key. Redeem it on the appropriate platform to unlock the full game and enjoy all features and gameplay content.'
  },
  {
    id: '5',
    title: 'Styx: Blades of Greed Free Game Code',
    image: 'https://i.postimg.cc/kM0ntVsS/capsule-616x353.jpg',
    rating: 4.7,
    type: 'Free Game',
    description: 'Styx: Blades of Greed Free Game Code for all platforms',
    couponsLeft: 440,
    usesToday: 42,
    category: 'Games',
    details: 'Get Styx: Blades of Greed with this free game code. Redeem it on the appropriate platform to unlock the full game and dive into a stealth-filled adventure packed with action and strategy.'
  },
  {
    id: '6',
    title: 'Season 2 Battlefield Pro Game Code',
    image: 'https://lulucoupons.com/public/assets/uploads/coupon_banners/coupon_216_17b8c9048b70a7af.jpg',
    rating: 4.9,
    type: 'Free Game',
    description: 'Battlefield 6 - Season 2 Battlefield Pro Free Code',
    couponsLeft: 365,
    usesToday: 50,
    category: 'Games',
    details: 'Unlock Season 2 Battlefield Pro with this free game code. Redeem it on the appropriate platform to access exclusive Season 2 content, rewards, and enhanced gameplay features.'
  },
  {
    id: '7',
    title: 'REANIMAL Free Game Code',
    image: 'https://lulucoupons.com/public/assets/uploads/coupon_banners/coupon_354_978062c08b46d157.jpg',
    rating: 4.9,
    type: 'Free Game',
    description: 'REANIMAL Free Digital Game Code',
    couponsLeft: 262,
    usesToday: 53,
    category: 'Games',
    details: 'Get REANIMAL with this free game code. Redeem it on the appropriate platform to unlock the full game and experience its dark, atmospheric adventure.'
  },
  {
    id: '8',
    title: 'Peacock Premium Plus',
    image: 'https://thecodechest.com/public/assets/uploads/coupon_banners/coupon_42_b4cafc8fe5a05dc7.png',
    rating: 4.8,
    type: '12 Months Free',
    description: 'Get 12 Months of Peacock Premium Plus',
    couponsLeft: 577,
    usesToday: 30,
    category: 'Games',
    details: 'Enjoy Peacock Premium Plus for 12 months with this exclusive offer. Redeem it on the platform to stream ad-free movies, hit TV shows, live sports, and more.'
  },
  {
    id: '9',
    title: 'Gemini Pro Upgrade',
    image: 'https://thecodechest.com/public/assets/uploads/coupon_banners/coupon_31_4b2d4ee9822eec8e.png',
    rating: 5.0,
    type: '12 Months Free',
    description: 'Get 12 Months of Google AI Pro',
    couponsLeft: 501,
    usesToday: 62,
    category: 'Games',
    details: 'Enjoy a free 12-month Gemini Pro upgrade with this code, giving you access to premium features, advanced tools, and full platform functionality for an entire year.'
  },
  {
    id: '10',
    title: 'Paramount+ Premium Promo Codes',
    image: 'https://thecodechest.com/public/assets/uploads/coupon_banners/coupon_40_f765716de611f55b.png',
    rating: 5.0,
    type: '12 Months Free',
    description: 'Get 12 Months of Paramount+ Premium',
    couponsLeft: 774,
    usesToday: 30,
    category: 'Games',
    details: 'Get 12 months of Paramount+ Premium with these promo codes. Redeem on the platform to enjoy ad-free streaming, blockbuster movies, exclusive originals, live sports, and more.'
  }
];

import { Product, Category, Order, CustomRequest, StoreSettings } from '../types';

export const INITIAL_SETTINGS: StoreSettings = {
  storeName: 'MY CROCHET STORE',
  tagline: 'Handmade with love • Little things, made beautifully',
  instagramHandle: 'mycrochetstore',
  instagramUrl: 'https://instagram.com',
  deliveryFee: 5,
  freeDeliveryThreshold: 50,
  contactEmail: 'hello@mycrochetstore.com',
  contactPhone: '+1 (555) 234-5678',
  currencySymbol: '$',
  adminName: 'Crochet Artisan & Owner',
  adminRole: 'Store Owner & Creator',
  adminEmail: 'admin@crochetstore.com',
  adminPhone: '+1 (555) 234-5678',
  adminPassword: 'Minnu@098',
  paymentUpiId: 'crochet.store@upi',
  paymentInstructions: 'Scan UPI QR or pay to UPI ID. DM payment screenshot on Instagram or WhatsApp.',
};

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-flowers',
    name: 'Crochet Flowers',
    slug: 'crochet-flowers',
    description: 'Forever blooms that never fade. Everlasting tulips, daisies, and sunflowers.',
    image: 'https://images.unsplash.com/photo-1590483256085-f5b252ce6480?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cat-keychains',
    name: 'Keychains',
    slug: 'keychains',
    description: 'Whimsical handmade companions for your keys, bag, or backpack.',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cat-bags',
    name: 'Bags',
    slug: 'bags',
    description: 'Lightweight, durable granny-square totes, crossbody pouches, and clutches.',
    image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cat-plushies',
    name: 'Plushies',
    slug: 'plushies',
    description: 'Lovingly hand-stitched amigurumi plushies made with ultra-soft yarn.',
    image: 'https://images.unsplash.com/photo-1559715745-e1b123c5c407?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cat-magnets',
    name: 'Magnets',
    slug: 'magnets',
    description: 'Charming mini crochet fridge magnets to brighten your daily kitchen.',
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cat-accessories',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Hair scrunchies, bandana headbands, and cozy cup sleeves.',
    image: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cat-gifts',
    name: 'Gifts',
    slug: 'gifts',
    description: 'Curated gift hampers, letter charms, and celebration sets.',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cat-other',
    name: 'Other',
    slug: 'other',
    description: 'Special seasonal drops and unique handcrafted home accents.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Pastel Tulip Blossom in Clay Pot',
    price: 24,
    description: 'An everlasting handcrafted crochet tulip nestled in a miniature knitted terracotta pot. Handcrafted with ultra-soft 100% milk cotton yarn and detailed with a flexible stem.',
    category: 'Crochet Flowers',
    images: [
      'https://images.unsplash.com/photo-1590483256085-f5b252ce6480?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80'
    ],
    availableQuantity: 8,
    colors: ['Dusty Rose', 'Cream White', 'Soft Lavender', 'Buttercup Yellow'],
    details: [
      '100% hypoallergenic milk cotton yarn',
      'Non-allergenic soft fiberfill padding',
      'Height approx. 18cm, pot diameter 7cm',
      'Flexible internal wire to pose stem naturally'
    ],
    careInstructions: 'Spot clean gently with a damp cloth. Do not soak in water or machine wash.',
    isFeatured: true,
    isPopular: true,
    isNewArrival: false,
    createdAt: '2025-02-10T10:00:00Z',
  },
  {
    id: 'prod-2',
    name: 'Clover & Daisy Charm Keychain',
    price: 12,
    description: 'A charming lucky 4-leaf clover and sweet daisy combo attached to a durable antique brass keyring. The perfect miniature companion for backpacks, totes, or car keys.',
    category: 'Keychains',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1590483256085-f5b252ce6480?auto=format&fit=crop&w=900&q=80'
    ],
    availableQuantity: 15,
    colors: ['Sage Green & Cream', 'Matcha & Vanilla', 'Pastel Pink & White'],
    details: [
      'Reinforced double-stitch loop',
      'Rust-resistant gold alloy split ring & lobster clasp',
      'Lightweight, less than 25 grams'
    ],
    careInstructions: 'Wipe with a slightly damp microfiber towel and let air dry.',
    isFeatured: true,
    isPopular: true,
    isNewArrival: true,
    createdAt: '2025-02-14T12:00:00Z',
  },
  {
    id: 'prod-3',
    name: 'Vintage Granny Square Market Tote',
    price: 48,
    description: 'Handcrafted bohemian aesthetic crochet tote bag pieced together from 18 traditional daisy granny squares. Features reinforced shoulder straps that do not sag.',
    category: 'Bags',
    images: [
      'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=80'
    ],
    availableQuantity: 4,
    colors: ['Oatmeal & Terracotta', 'Olive & Cream', 'Earthy Neutral Mix'],
    details: [
      'Thick durable cotton cord blend',
      'Comfortable 10-inch strap drop',
      'Spacious 14 x 13 inch dimension, holds a book, tablet, and everyday essentials'
    ],
    careInstructions: 'Hand wash in cold water with mild detergent. Lay flat on towel to dry.',
    isFeatured: true,
    isPopular: true,
    isNewArrival: false,
    createdAt: '2025-01-28T09:00:00Z',
  },
  {
    id: 'prod-4',
    name: 'Sleepy Bunny Amigurumi Plushie',
    price: 36,
    description: 'Our most beloved huggable bunny amigurumi with floppy ears and cozy knitted overalls. Each bunny takes over 6 hours of patient artisan hand-crocheting.',
    category: 'Plushies',
    images: [
      'https://images.unsplash.com/photo-1559715745-e1b123c5c407?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1590483256085-f5b252ce6480?auto=format&fit=crop&w=900&q=80'
    ],
    availableQuantity: 5,
    colors: ['Warm Biscuit', 'Fluffy Oat', 'Soft Cocoa'],
    details: [
      'Child-safe embroidered safety eyes',
      'Overalls are detachable with mini wooden button details',
      'Approx. 26cm tall from toe to tip of ears'
    ],
    careInstructions: 'Gentle spot cleaning only. Keep away from excessive moisture.',
    isFeatured: true,
    isPopular: true,
    isNewArrival: true,
    createdAt: '2025-02-01T15:30:00Z',
  },
  {
    id: 'prod-5',
    name: 'Strawberry & Avocado Fridge Magnet Duo',
    price: 14,
    description: 'Set of two whimsical high-power neodymium magnet crochet miniatures: one juicy plump strawberry and one smiling ripe avocado half.',
    category: 'Magnets',
    images: [
      'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80'
    ],
    availableQuantity: 12,
    colors: ['Classic Duo', 'Pastel Fruit Set'],
    details: [
      'Strong embedded rare-earth magnet inside backing',
      'Holds up to 4 postcards or recipe cards easily',
      'Soft fabric backing protects fridge surface from scratches'
    ],
    careInstructions: 'Dust with soft dry brush.',
    isFeatured: false,
    isPopular: true,
    isNewArrival: true,
    createdAt: '2025-02-18T11:00:00Z',
  },
  {
    id: 'prod-6',
    name: 'Ruffled Milk Cotton Hair Scrunchie',
    price: 9,
    description: 'Cloud-soft voluminous crochet hair scrunchie that glides gently over your hair without tugging, snagging, or causing breakage.',
    category: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=900&q=80'
    ],
    availableQuantity: 20,
    colors: ['French Vanilla', 'Warm Chestnut', 'Sage Bloom', 'Mocha Brown'],
    details: [
      'Durable elastic core tested for 1000+ stretches',
      'Breathable milk cotton yarn wrap',
      'Diameter approx. 12cm for a puffy, romantic aesthetic'
    ],
    careInstructions: 'Hand wash gently in lukewarm water, dry flat.',
    isFeatured: false,
    isPopular: false,
    isNewArrival: true,
    createdAt: '2025-02-22T08:00:00Z',
  },
  {
    id: 'prod-7',
    name: 'Cozy Morning Ribbed Mug Hugger',
    price: 15,
    description: 'Keep your tea or coffee pleasantly warm while protecting your hands with this snug textured cup sleeve with a wooden toggle button closure.',
    category: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=80'
    ],
    availableQuantity: 0,
    colors: ['Caramel Swirl', 'Oatmeal Tweed'],
    details: [
      'Adjustable button loop fits most standard 10oz - 16oz ceramic mugs',
      'Insulating double-crochet waffle stitch',
      'Natural polished cedar wood button'
    ],
    careInstructions: 'Machine washable on cold delicate cycle in mesh wash bag.',
    isFeatured: false,
    isPopular: false,
    isNewArrival: false,
    isSoldOut: true,
    createdAt: '2025-01-15T14:00:00Z',
  },
  {
    id: 'prod-8',
    name: 'Eternal Sunflower & Baby Breath Gift Box',
    price: 42,
    description: 'A radiant crochet sunflower accompanied by mini eucalyptus stems and baby breath sprigs, hand-wrapped in vintage kraft paper with a satin ribbon.',
    category: 'Gifts',
    images: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1590483256085-f5b252ce6480?auto=format&fit=crop&w=900&q=80'
    ],
    availableQuantity: 6,
    colors: ['Sunny Golden', 'Vintage Ochre'],
    details: [
      'Includes handwritten card option',
      'Stems wrapped in durable floral tape with internal bendable steel',
      'Packaged in an eco-friendly gift box'
    ],
    careInstructions: 'Keep in a dry environment away from direct prolonged harsh sunlight.',
    isFeatured: true,
    isPopular: true,
    isNewArrival: true,
    createdAt: '2025-02-25T16:00:00Z',
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-84920',
    customerName: 'Sophie Martinez',
    phone: '+1 415-555-0192',
    email: 'sophie.m@example.com',
    address: '742 Evergreen Terrace, Apt 4B',
    city: 'San Francisco',
    state: 'CA',
    pincode: '94107',
    orderNotes: 'Please pack in gift paper if possible ♡',
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        quantity: 1,
        selectedColor: 'Dusty Rose',
      },
      {
        product: INITIAL_PRODUCTS[1],
        quantity: 2,
        selectedColor: 'Pastel Pink & White',
      }
    ],
    subtotal: 48,
    deliveryCharge: 0,
    total: 48,
    paymentMethod: 'UPI / Online Card Transfer',
    status: 'In Progress',
    createdAt: '2025-03-02T14:20:00Z',
  },
  {
    id: 'ORD-84919',
    customerName: 'Aarav Patel',
    phone: '+1 212-555-0144',
    email: 'aarav.p@example.com',
    address: '128 Bleecker Street',
    city: 'New York',
    state: 'NY',
    pincode: '10012',
    orderNotes: '',
    items: [
      {
        product: INITIAL_PRODUCTS[2],
        quantity: 1,
        selectedColor: 'Earthy Neutral Mix',
      }
    ],
    subtotal: 48,
    deliveryCharge: 5,
    total: 53,
    paymentMethod: 'Cash on Delivery (COD)',
    status: 'Confirmed',
    createdAt: '2025-03-01T18:45:00Z',
  },
  {
    id: 'ORD-84918',
    customerName: 'Chloe Chen',
    phone: '+1 310-555-0188',
    email: 'chloechen@example.com',
    address: '450 Ocean View Drive',
    city: 'Santa Monica',
    state: 'CA',
    pincode: '90401',
    orderNotes: 'Left at doorstep safely.',
    items: [
      {
        product: INITIAL_PRODUCTS[3],
        quantity: 1,
        selectedColor: 'Fluffy Oat',
      }
    ],
    subtotal: 36,
    deliveryCharge: 5,
    total: 41,
    paymentMethod: 'UPI / Online Card Transfer',
    status: 'Shipped',
    createdAt: '2025-02-27T09:10:00Z',
  }
];

export const INITIAL_CUSTOM_REQUESTS: CustomRequest[] = [
  {
    id: 'REQ-301',
    customerName: 'Maya Johnson',
    contactNumber: '+1 617-555-0177',
    email: 'maya.j@example.com',
    requirements: 'Hi! I would love a custom crochet baby blanket (approx 30x40 inches) in soft sage green, oatmeal, and blush pink with a scallop shell border. Also wondering if we could embroider the baby name "Ella" in the corner.',
    referenceImage: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80',
    dateSubmitted: '2025-03-03T11:30:00Z',
    status: 'Reviewing',
    finalPrice: 85,
    adminNote: 'Checking yarn yardage required. Can deliver by March 25th.',
  },
  {
    id: 'REQ-302',
    customerName: 'Liam Walker',
    contactNumber: '+1 503-555-0132',
    email: 'liam.w@example.com',
    requirements: 'Looking for a custom crochet golden retriever puppy amigurumi key charm as an anniversary surprise for my partner. Dark golden honey coat with a little red collar tag.',
    dateSubmitted: '2025-03-01T16:15:00Z',
    status: 'Accepted',
    finalPrice: 28,
    adminNote: 'Customer confirmed details via Instagram DM.',
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 'post-1',
    image: 'https://images.unsplash.com/photo-1590483256085-f5b252ce6480?auto=format&fit=crop&w=600&q=80',
    caption: 'Fresh batch of pastel tulips blooming on our work table today ♡ #crochetflowers',
    likes: 428,
    comments: 34,
  },
  {
    id: 'post-2',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80',
    caption: 'Lucky little daisy keychains ready to be mailed out to their new homes! #handmadewithlove',
    likes: 612,
    comments: 51,
  },
  {
    id: 'post-3',
    image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=600&q=80',
    caption: '18 granny squares and hours of slow craftsmanship later... the boho tote is complete.',
    likes: 840,
    comments: 79,
  },
  {
    id: 'post-4',
    image: 'https://images.unsplash.com/photo-1559715745-e1b123c5c407?auto=format&fit=crop&w=600&q=80',
    caption: 'Meet Barnaby the sleepy bunny amigurumi. Who needs a cuddly companion?',
    likes: 955,
    comments: 104,
  },
  {
    id: 'post-5',
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=600&q=80',
    caption: 'Mini fruit magnets bring so much warmth to the fridge door ♡ Which fruit next?',
    likes: 531,
    comments: 42,
  },
  {
    id: 'post-6',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80',
    caption: 'Wrapping up custom gift parcels with dried florals and handwritten notes. Thank you all so much!',
    likes: 719,
    comments: 63,
  },
];

export const TESTIMONIALS = [
  {
    id: 'rev-1',
    name: 'Elena Rostova',
    handle: '@elena_cozyhome',
    text: 'I ordered the pastel tulip pot and it is genuinely the most beautiful thing sitting on my study desk. The craftsmanship is flawless, so soft and warm!',
    rating: 5,
    product: 'Pastel Tulip Blossom',
  },
  {
    id: 'rev-2',
    name: 'Rohan Sharma',
    handle: '@rohan.reads',
    text: 'Submitted a custom crochet request for my girlfriend’s cat. The seller was so kind on Instagram and the final amigurumi exceeded all expectations!',
    rating: 5,
    product: 'Custom Cat Plushie',
  },
  {
    id: 'rev-3',
    name: 'Grace Miller',
    handle: '@grace.aesthetic',
    text: 'The granny square tote bag is sturdy, lightweight and holds all my weekend market treats. Getting compliments constantly wherever I go.',
    rating: 5,
    product: 'Granny Square Market Tote',
  }
];

export const CUSTOMER_REVIEWS = TESTIMONIALS;


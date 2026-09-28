import { Product, WebsiteSettings, Ingredient, Review } from '../types';
import { ProductBottleImage } from '../assets/images';

export const INITIAL_PRODUCT: Product = {
  id: 'mira-oil-100ml',
  name: 'Mira Herbal Hair Oil',
  brand: 'Mirakshi Botanicals',
  previousBrand: 'Meera Herbal Hair Oil',
  size: '100ml',
  price: 349,
  codCharge: 50,
  codTotal: 399,
  inStock: true,
  stockCount: 150,
  description: 'Home-made hair oil prepared using 100% natural ingredients. Traditionally slow-infused using time-honored Ayurvedic principles to nourish the scalp, care for hair roots, and bring natural softness and shine.',
  badge: '🌿 100% Natural Hair Care',
  benefits: [
    'Helps reduce hair fall with regular gentle scalp nourishment',
    'Helps reduce discomfort associated with dandruff & dry scalp itching',
    'Supports healthy-looking hair growth & natural hair vitality',
    'Helps make hair noticeably soft, shiny, and stronger from roots to tips',
    'Suitable for all hair types & daily hair-care routines',
    'Customers may start noticing positive differences from approximately the third wash'
  ],
  imageUrl: ProductBottleImage,
  sku: 'MB-MIRA-100ML',
  category: 'Herbal Hair Care'
};

export const INITIAL_SETTINGS: WebsiteSettings = {
  brandName: 'Mirakshi Botanicals',
  previousBrandName: 'Meera Herbal Hair Oil',
  phone: '9373080098',
  whatsapp: '9373080098',
  onlinePrice: 349,
  codCharge: 50,
  productSize: '100ml',
  heroHeading: 'Natural Care. Healthier-Looking Hair.',
  heroSubheading: 'Discover Mira Herbal Hair Oil – traditionally prepared with natural ingredients for your everyday hair-care routine.',
  ctaText: 'Order Now',
  address: 'Botanical Laboratories & Traditional Kitchen, India',
  email: 'care@mirakshibotanicals.com',
  deliveryDays: '3–5 Business Days across India',
  smsProvider: 'fast2sms',
  smsApiKey: '',
  smsSenderId: '',
  smsWebhookUrl: '',
  autoSendSmsOnBooking: true,
  autoSendSmsOnStatusChange: true
};

export const INITIAL_INGREDIENTS: Ingredient[] = [
  {
    id: 'ing-1',
    name: 'Bhringraj Extract',
    description: 'Revered in traditional Ayurveda as Keshraj (king of hair) for supporting scalp health and strengthening hair strands.',
    benefits: 'Helps nourish hair roots and calm scalp irritation.',
    active: true,
    order: 1
  },
  {
    id: 'ing-2',
    name: 'Indian Gooseberry (Amla)',
    description: 'Naturally rich in essential nutrients and antioxidants, traditionally used to support dark, lustrous hair luster.',
    benefits: 'Supports hair follicle vitality and delivers rich shine.',
    active: true,
    order: 2
  },
  {
    id: 'ing-3',
    name: 'Cold-Pressed Coconut & Sesame Oil',
    description: 'Pure, unrefined botanical base oil that deeply penetrates the scalp without heavy mineral buildup.',
    benefits: 'Provides deep hydration, softness, and protection against moisture loss.',
    active: true,
    order: 3
  },
  {
    id: 'ing-4',
    name: 'Hibiscus & Neem Leaves',
    description: 'Classic botanical botanicals traditionally brewed for soothing sensitive scalp and keeping hair conditioned.',
    benefits: 'Helps gently soothe scalp itching and maintain scalp clarity.',
    active: true,
    order: 4
  }
];

export const INITIAL_REVIEWS: Review[] = []; // Intentionally empty initially as required: "Customer reviews coming soon" or admin-managed

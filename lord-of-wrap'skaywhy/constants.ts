
import { MenuItem } from './types';

export const VALID_PINCODES = [
  '160017', '160022', '160035', '160036', '160047', '160055', '160059', '160062', '160071', '160101', '160102'
];

export const CONTACT_INFO = {
  phone: '8264093595',
  email: 'arminders422@gmail.com',
  address: 'Shop 12, Inner Market, Sector 22, Chandigarh',
};

export const MENU_ITEMS: MenuItem[] = [
  // Wraps
  {
    id: 'w1',
    name: 'Maharaja Paneer Wrap',
    description: 'Fresh paneer cubes tossed in makhani sauce wrapped in a soft tortilla.',
    price: 189,
    category: 'Wraps',
    isVeg: true,
    isBestseller: true,
    image: 'https://picsum.photos/400/300?random=1'
  },
  {
    id: 'w2',
    name: 'Fiery Chicken Tikka Wrap',
    description: 'Spicy chicken tikka chunks with onions and mint chutney.',
    price: 229,
    category: 'Wraps',
    isVeg: false,
    isSpicy: true,
    isBestseller: true,
    image: 'https://picsum.photos/400/300?random=2'
  },
  {
    id: 'w3',
    name: 'Falafel Hummus Wrap',
    description: 'Crispy falafel bullets with creamy hummus and fresh veggies.',
    price: 169,
    category: 'Wraps',
    isVeg: true,
    isBestseller: true,
    image: 'https://picsum.photos/400/300?random=3'
  },
  
  // Rolls
  {
    id: 'r1',
    name: 'Double Egg Kathi Roll',
    description: 'Classic street style roll with double egg and tangy sauces.',
    price: 129,
    category: 'Rolls',
    isVeg: false,
    isBestseller: true,
    image: 'https://picsum.photos/400/300?random=4'
  },
  {
    id: 'r2',
    name: 'Mutton Seekh Roll',
    description: 'Juicy mutton seekh kebab wrapped in a crispy paratha.',
    price: 269,
    category: 'Rolls',
    isVeg: false,
    isBestseller: true,
    image: 'https://picsum.photos/400/300?random=5'
  },
  {
    id: 'r3',
    name: 'Soya Chaap Roll',
    description: 'Marinated soya chaap roasted and rolled with onions.',
    price: 159,
    category: 'Rolls',
    isVeg: true,
    image: 'https://picsum.photos/400/300?random=6'
  },

  // Sides
  {
    id: 's1',
    name: 'Peri Peri Fries',
    description: 'Crispy french fries dusted with spicy peri peri seasoning.',
    price: 119,
    category: 'Sides',
    isVeg: true,
    isSpicy: true,
    isBestseller: true,
    image: 'https://picsum.photos/400/300?random=7'
  },
  {
    id: 's2',
    name: 'Cheesy Nachos',
    description: 'Tortilla chips loaded with liquid cheese and salsa.',
    price: 149,
    category: 'Sides',
    isVeg: true,
    image: 'https://picsum.photos/400/300?random=8'
  },

  // Beverages
  {
    id: 'b1',
    name: 'Mint Mojito',
    description: 'Refreshing virgin mojito with fresh mint and lemon.',
    price: 99,
    category: 'Beverages',
    isVeg: true,
    image: 'https://picsum.photos/400/300?random=9'
  },
  {
    id: 'b2',
    name: 'Cold Coffee',
    description: 'Thick and creamy cold coffee.',
    price: 119,
    category: 'Beverages',
    isVeg: true,
    isBestseller: true,
    image: 'https://picsum.photos/400/300?random=10'
  },
  
  // Combos
  {
    id: 'c1',
    name: 'Solo Meal Deal',
    description: '1 Veg Wrap + 1 Fries + 1 Coke.',
    price: 299,
    category: 'Combos',
    isVeg: true,
    isBestseller: true,
    image: 'https://picsum.photos/400/300?random=11'
  }
];

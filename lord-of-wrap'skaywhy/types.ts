
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Wraps' | 'Rolls' | 'Sides' | 'Beverages' | 'Combos';
  isVeg: boolean;
  image: string;
  isBestseller?: boolean;
  isSpicy?: boolean;
}

export type SpiceLevel = 'Low' | 'Medium' | 'High';

export interface CartOptions {
  extraCheese: boolean;
  extraMayo: boolean;
  spiceLevel: SpiceLevel;
}

export interface CartItem extends MenuItem {
  quantity: number;
  options?: CartOptions;
  cartId: string;
  note?: string;
}

export interface UserAddress {
  fullName: string;
  phone: string;
  houseNo: string;
  street: string;
  area: string;
  city: string;
  pincode: string;
  lat?: number;
  lng?: number;
  instructions?: string;
}

export type OrderStatus = 'Placed' | 'Preparing' | 'Out for Delivery' | 'Delivered';

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  address: UserAddress;
  status: OrderStatus;
  createdAt: string;
  paymentMethod: 'COD' | 'ONLINE';
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem, options?: CartOptions) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, delta: number) => void;
  updateItemNote: (cartId: string, note: string) => void;
  clearCart: () => void;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  getCartItemPrice: (item: CartItem) => number;
}

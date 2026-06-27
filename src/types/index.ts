export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  category: string;
  price: number;
  discount: number;
  available: boolean;
  height: string;
  potSize: string;
  careLevel: 'Easy' | 'Moderate' | 'Expert';
  sunlight: string;
  waterNeeds: string;
  description: string;
  images: string[];
  featured: boolean;
  createdAt: string;
  rating: number;
  reviews: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  plantCount: number;
  description: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  avatar: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  featured: boolean;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: string;
  width: number;
  height: number;
  type: 'image' | 'video';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Order {
  id: string;
  customer: string;
  email: string;
  phone: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  address: string;
  notes: string;
}

export interface OrderItem {
  plantId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  joinedDate: string;
  address: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

export interface Review {
  id: string;
  plantId: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  approved: boolean;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  role: 'superadmin' | 'admin' | 'editor';
  avatar: string;
  lastLogin: string;
}

export interface LandscapingRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyType: string;
  area: string;
  budget: string;
  description: string;
  date: string;
  status: 'pending' | 'contacted' | 'completed' | 'cancelled';
}

export interface HatcheryRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  quantity: number;
  description: string;
  date: string;
  status: 'pending' | 'contacted' | 'completed' | 'cancelled';
}

export interface Analytics {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  totalPlants: number;
  monthlyRevenue: { month: string; revenue: number }[];
  popularPlants: { name: string; sales: number }[];
  orderStatus: { status: string; count: number }[];
}

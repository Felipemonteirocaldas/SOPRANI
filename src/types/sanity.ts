export interface SanityProduct {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  brand: 'koenig-bauer' | 'soudronic';
  category: string;
  description: string;
  mainImage: any;
  specs: Array<{
    key: string;
    value: string;
  }>;
  order: number;
}

export interface SanityNewsPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  excerpt: string;
  mainImage: any;
  body?: any[]; // Portable Text optional 
  externalUrl?: string;
  source?: string;
  category?: string;
}

export interface SanityEvent {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  date: string;
  location: string;
  description: string;
  mainImage: any;
  registrationUrl?: string;
  externalUrl?: string;
  source?: string;
}

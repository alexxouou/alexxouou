export interface CollectionItem {
  id: number;
  title: string;
  image: string;
  price?: string;
  category: 'robes' | 'chaussures';
}

export interface BlogPost {
  id: number;
  title: string;
  category: string;
  image: string;
  date: string;
}

export interface Review {
  id: number;
  author: string;
  text: string;
  rating: number;
}

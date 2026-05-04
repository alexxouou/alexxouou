import { CollectionItem, BlogPost, Review } from '../types';
import { IMAGE_IDS, getDriveImage } from '../constants/images';

export const COLLECTIONS: CollectionItem[] = [
  { id: 1, title: 'Modèle Audrey', image: getDriveImage(IMAGE_IDS.DRESS_AUDREY), category: 'robes' },
  { id: 2, title: 'Modèle Grace', image: getDriveImage(IMAGE_IDS.DRESS_GRACE), category: 'robes' },
  { id: 3, title: 'Modèle Marilyn', image: getDriveImage(IMAGE_IDS.DRESS_MARILYN), category: 'robes' },
  { id: 4, title: 'Escarpins Cendrillon', image: getDriveImage(IMAGE_IDS.SHOE_CINDERELLA), category: 'chaussures' },
  { id: 5, title: 'Mules Hollywood', image: getDriveImage(IMAGE_IDS.SHOE_HOLLYWOOD), category: 'chaussures' },
];

export const BLOG_POSTS: BlogPost[] = [
  { id: 1, title: 'L\'art du drapé à l\'atelier', category: 'Savoir-faire', image: getDriveImage(IMAGE_IDS.BLOG_DRAPERY), date: '12 Mars 2024' },
  { id: 2, title: 'Les mariées de cinéma', category: 'Inspiration', image: getDriveImage(IMAGE_IDS.BLOG_CINEMA), date: '05 Avril 2024' },
  { id: 3, title: 'Tendances nuptiales 2024', category: 'Style', image: getDriveImage(IMAGE_IDS.BLOG_TRENDS), date: '28 Avril 2024' },
];

export const REVIEWS: Review[] = [
  { id: 1, author: "Marie L.", text: "Une expérience inoubliable. La robe de mes rêves est devenue réalité grâce aux doigts de fée de l'atelier.", rating: 5 },
  { id: 2, author: "Camille D.", text: "Un accueil chaleureux et des conseils précieux. Ma robe était parfaite jusqu'au moindre détail.", rating: 5 },
  { id: 3, author: "Sophie B.", text: "Plus qu'une robe, c'est une œuvre d'art que j'ai eu la chance de porter.", rating: 5 },
];

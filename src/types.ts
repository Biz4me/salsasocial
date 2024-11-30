export interface Event {
  id: string;
  title: string;
  description: string;
  type: 'party' | 'class' | 'festival';
  date: Date;
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
  price: number;
  organizerId: string;
  acceptedLevels: string[];
  participants: string[];
  danceStyles: string[];
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  biography?: string;
  salsaLevel: 'débutant' | 'intermédiaire' | 'avancé';
  preferredStyles: string[];
  location?: {
    latitude: number;
    longitude: number;
  };
}
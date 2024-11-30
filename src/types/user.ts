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
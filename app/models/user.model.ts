export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  biography?: string;
  salsaLevel: 'beginner' | 'intermediate' | 'advanced';
  preferredStyles: string[];
  location?: {
    latitude: number;
    longitude: number;
  };
}
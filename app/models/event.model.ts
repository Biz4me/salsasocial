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
}
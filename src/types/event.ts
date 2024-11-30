export interface Event {
  id: string;
  title: string;
  description: string;
  type: 'party' | 'class' | 'festival' | 'workshop';
  startDate: Date;
  endDate: Date;
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
  invitedFriends?: string[];
}
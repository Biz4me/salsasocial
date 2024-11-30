import { createContext, useContext, useState, ReactNode } from 'react';
import { Event } from '../types';

interface EventContextType {
  events: Event[];
  addEvent: (event: Event) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

const defaultEvents: Event[] = [
  {
    id: '1',
    title: "Soirée Salsa au Club Tropicana",
    description: "Rejoignez-nous pour une soirée de musique et de danse salsa !",
    type: 'party',
    startDate: new Date(new Date().setHours(20, 0)),
    endDate: new Date(new Date().setHours(23, 30)),
    location: {
      address: "123 Rue de la Danse, Paris",
      latitude: 48.8566,
      longitude: 2.3522
    },
    price: 10,
    organizerId: 'org1',
    acceptedLevels: [],
    participants: [],
    danceStyles: ['Salsa Cubaine', 'Salsa Porto', 'Bachata']
  },
  {
    id: '2',
    title: "Festival Latino",
    description: "Le plus grand festival de danses latines de l'année !",
    type: 'festival',
    startDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    endDate: new Date(new Date().setDate(new Date().getDate() + 9)),
    location: {
      address: "456 Avenue des Arts, Paris",
      latitude: 48.8584,
      longitude: 2.2945
    },
    price: 45,
    organizerId: 'org2',
    acceptedLevels: [],
    participants: [],
    danceStyles: ['Salsa Cubaine', 'Bachata', 'Kizomba']
  },
  {
    id: '3',
    title: "Cours de Bachata",
    description: "Apprenez la bachata avec nos meilleurs professeurs",
    type: 'class',
    startDate: new Date(new Date().setDate(new Date().getDate() + 2)),
    endDate: new Date(new Date().setDate(new Date().getDate() + 2)),
    location: {
      address: "789 Boulevard du Rythme, Paris",
      latitude: 48.8738,
      longitude: 2.2950
    },
    price: 20,
    organizerId: 'org1',
    acceptedLevels: ['débutant', 'intermédiaire'],
    participants: [],
    danceStyles: ['Bachata']
  }
];

export function EventProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>(defaultEvents);

  const addEvent = (event: Event) => {
    setEvents(prev => {
      const index = prev.findIndex(e => e.id === event.id);
      if (index !== -1) {
        // Update existing event
        const newEvents = [...prev];
        newEvents[index] = event;
        return newEvents;
      } else {
        // Add new event with a new ID and empty participants array
        const newEvent = {
          ...event,
          id: Date.now().toString(),
          participants: [],
          danceStyles: event.danceStyles || [],
          location: {
            ...event.location,
            // Default to Paris coordinates if none provided
            latitude: event.location.latitude || 48.8566,
            longitude: event.location.longitude || 2.3522
          }
        };
        return [...prev, newEvent];
      }
    });
  };

  return (
    <EventContext.Provider value={{ events, addEvent }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
}
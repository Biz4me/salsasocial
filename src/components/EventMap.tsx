import { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { Event } from '../types';
import { useNavigate } from 'react-router-dom';

interface EventMapProps {
  events: Event[];
  center?: { lat: number; lng: number };
}

const defaultCenter = {
  lat: 48.8566,
  lng: 2.3522
};

const mapContainerStyle = {
  width: '100%',
  height: '500px'
};

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }]
    }
  ]
};

export default function EventMap({ events, center = defaultCenter }: EventMapProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [geocodedEvents, setGeocodedEvents] = useState<Event[]>([]);
  const navigate = useNavigate();

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyCeQre91IppGk9fBmprxF--fH2psgn0b0U',
    libraries: ['places', 'geocoding']
  });

  useEffect(() => {
    if (isLoaded && window.google) {
      const geocoder = new google.maps.Geocoder();
      
      const geocodeEvents = async () => {
        const geocodedResults = await Promise.all(
          events.map(async (event) => {
            if (!event.location.latitude || !event.location.longitude) {
              try {
                const result = await geocoder.geocode({ address: event.location.address });
                if (result.results[0]?.geometry?.location) {
                  return {
                    ...event,
                    location: {
                      ...event.location,
                      latitude: result.results[0].geometry.location.lat(),
                      longitude: result.results[0].geometry.location.lng()
                    }
                  };
                }
              } catch (error) {
                console.error('Erreur de géocodage:', error);
              }
            }
            return event;
          })
        );
        
        setGeocodedEvents(geocodedResults);
      };

      geocodeEvents();
    }
  }, [isLoaded, events]);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loadError) {
    return (
      <div className="flex items-center justify-center h-[500px] bg-gray-100 rounded-lg">
        <p className="text-red-600">Erreur de chargement de la carte</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-[500px] bg-gray-100 rounded-lg">
        <p className="text-gray-600">Chargement de la carte...</p>
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={13}
      options={mapOptions}
    >
      {geocodedEvents.map(event => (
        <Marker
          key={event.id}
          position={{
            lat: event.location.latitude,
            lng: event.location.longitude
          }}
          onClick={() => setSelectedEvent(event)}
        />
      ))}

      {selectedEvent && (
        <InfoWindow
          position={{
            lat: selectedEvent.location.latitude,
            lng: selectedEvent.location.longitude
          }}
          onCloseClick={() => setSelectedEvent(null)}
        >
          <div className="p-2 max-w-xs">
            <h3 className="font-bold text-lg mb-1">{selectedEvent.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{selectedEvent.description}</p>
            <div className="text-sm space-y-1">
              <p>{formatDate(selectedEvent.startDate)}</p>
              <p>{formatTime(selectedEvent.startDate)} - {formatTime(selectedEvent.endDate)}</p>
              <p>{selectedEvent.location.address}</p>
              <p className="font-semibold">{selectedEvent.price}€</p>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {selectedEvent.danceStyles.map(style => (
                <span key={style} className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">
                  {style}
                </span>
              ))}
            </div>
            <button
              onClick={() => navigate(`/events/${selectedEvent.id}`)}
              className="mt-2 w-full px-3 py-1 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"
            >
              Voir les détails
            </button>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
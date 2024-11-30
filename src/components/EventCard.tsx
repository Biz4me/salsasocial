import { Event } from '../types';
import { FiMapPin, FiClock, FiUsers, FiUserPlus } from 'react-icons/fi';
import { useUser } from '../contexts/UserContext';
import { useEvents } from '../contexts/EventContext';
import { useState } from 'react';
import InviteFriendsModal from './InviteFriendsModal';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const { currentUser, friends } = useUser();
  const { events, addEvent } = useEvents();
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const isRegistered = event.participants?.includes(currentUser?.id || '');

  const handleRegistration = () => {
    if (!currentUser) return;

    const updatedEvent = {
      ...event,
      participants: isRegistered
        ? event.participants.filter(id => id !== currentUser.id)
        : [...(event.participants || []), currentUser.id]
    };

    addEvent(updatedEvent);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-soft p-6 card-hover">
      <h3 className="text-xl font-bold gradient-text mb-2">{event.title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{event.description}</p>
      
      <div className="mt-4 space-y-3">
        <div className="flex items-center text-gray-500 dark:text-gray-400">
          <FiClock className="mr-2" />
          <span>
            {new Date(event.startDate).toLocaleDateString('fr-FR', {
              weekday: 'long',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>
        
        <div className="flex items-center text-gray-500 dark:text-gray-400">
          <FiMapPin className="mr-2" />
          <span>{event.location.address}</span>
        </div>

        {event.participants.length > 0 && (
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <FiUsers className="mr-2" />
            <span>{event.participants.length} participant(s)</span>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {event.danceStyles.map(style => (
          <span 
            key={style} 
            className="px-3 py-1 bg-primary-light/20 text-primary rounded-full text-sm"
          >
            {style}
          </span>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <span className="text-2xl font-bold gradient-text">{event.price}€</span>
        <div className="flex space-x-2">
          {isRegistered && (
            <button
              onClick={() => setIsInviteModalOpen(true)}
              className="flex items-center space-x-1 px-4 py-2 bg-secondary-light text-white rounded-xl hover:bg-secondary transition-colors"
            >
              <FiUserPlus />
              <span>Inviter</span>
            </button>
          )}
          <button 
            onClick={handleRegistration}
            className={`px-6 py-2 rounded-xl transition-colors ${
              isRegistered 
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'gradient-bg text-white shadow-glow hover:opacity-90'
            }`}
          >
            {isRegistered ? 'Se désinscrire' : "S'inscrire"}
          </button>
        </div>
      </div>

      <InviteFriendsModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        friends={friends}
        eventId={event.id}
        onInvite={(friendIds) => {
          const updatedEvent = {
            ...event,
            invitedFriends: [...(event.invitedFriends || []), ...friendIds]
          };
          addEvent(updatedEvent);
        }}
      />
    </div>
  );
}
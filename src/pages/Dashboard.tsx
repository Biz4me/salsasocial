import { useState } from 'react'
import EventCard from '../components/EventCard'
import EventMap from '../components/EventMap'
import SearchModal, { SearchFilters } from '../components/SearchModal'
import CreateEventModal from '../components/CreateEventModal'
import { useUser } from '../contexts/UserContext'
import { useEvents } from '../contexts/EventContext'
import { FiMap, FiList } from 'react-icons/fi'

export default function Dashboard() {
  const { role } = useUser();
  const { events, addEvent } = useEvents();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const handleSearch = (filters: SearchFilters) => {
    console.log('Recherche avec les filtres:', filters);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {role === 'professional' 
            ? 'Tableau de bord Professionnel' 
            : 'Tableau de bord Danseur'}
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {role === 'professional'
            ? 'Gérez vos événements et créez de nouvelles expériences de danse'
            : 'Trouvez des événements et connectez-vous avec d\'autres danseurs'}
        </p>
      </div>

      {role === 'dancer' ? (
        // Interface Danseur
        <div>
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={() => setIsSearchModalOpen(true)}
              className="flex-1 p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors mr-4"
            >
              Trouver des événements
            </button>
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${
                  viewMode === 'list'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                }`}
                title="Vue liste"
              >
                <FiList className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-2 rounded-lg ${
                  viewMode === 'map'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                }`}
                title="Vue carte"
              >
                <FiMap className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Événements à proximité</h2>
            {viewMode === 'map' ? (
              <div className="rounded-lg overflow-hidden shadow-lg">
                <EventMap events={events} />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </div>

          <SearchModal 
            isOpen={isSearchModalOpen}
            onClose={() => setIsSearchModalOpen(false)}
            onSearch={handleSearch}
          />
        </div>
      ) : (
        // Interface Professionnel
        <div>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="w-full p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Créer un événement
          </button>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Mes événements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events
                .filter(event => event.organizerId === 'org1')
                .map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
            </div>
          </div>

          <CreateEventModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onSubmit={addEvent}
          />
        </div>
      )}
    </div>
  );
}
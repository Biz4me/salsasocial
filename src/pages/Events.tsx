import { useState } from 'react';
import { useEvents } from '../contexts/EventContext';
import EventCard from '../components/EventCard';
import EventMap from '../components/EventMap';
import { Event } from '../types';
import { FiMap, FiList } from 'react-icons/fi';

interface Filters {
  type?: string;
  style?: string;
  date?: string;
}

export default function Events() {
  const { events } = useEvents();
  const [filters, setFilters] = useState<Filters>({});
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const filteredEvents = events.filter(event => {
    if (filters.type && event.type !== filters.type) return false;
    if (filters.style && !event.danceStyles.includes(filters.style)) return false;
    if (filters.date) {
      const filterDate = new Date(filters.date).toDateString();
      const eventDate = new Date(event.startDate).toDateString();
      if (filterDate !== eventDate) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Événements</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${
              viewMode === 'list'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
            }`}
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
          >
            <FiMap className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={filters.type}
          onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
        >
          <option value="">Type d'événement</option>
          <option value="party">Soirée</option>
          <option value="class">Cours</option>
          <option value="festival">Festival</option>
          <option value="workshop">Stage</option>
        </select>

        <select
          className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={filters.style}
          onChange={(e) => setFilters(prev => ({ ...prev, style: e.target.value }))}
        >
          <option value="">Style de danse</option>
          <option value="Salsa Cubaine">Salsa Cubaine</option>
          <option value="Salsa Porto">Salsa Porto</option>
          <option value="Bachata">Bachata</option>
          <option value="Kizomba">Kizomba</option>
          <option value="Tango Argentin">Tango Argentin</option>
        </select>

        <input
          type="date"
          className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={filters.date}
          onChange={(e) => setFilters(prev => ({ ...prev, date: e.target.value }))}
        />
      </div>

      {viewMode === 'map' ? (
        <div className="rounded-lg overflow-hidden shadow-lg">
          <EventMap events={filteredEvents} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
import { Dialog } from '@headlessui/react'
import { useState } from 'react'
import { Event } from '../types'

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (event: Omit<Event, 'id' | 'participants'>) => void;
}

const eventTypes = [
  { id: 'party', label: 'Soirée' },
  { id: 'class', label: 'Cours' },
  { id: 'festival', label: 'Festival' },
  { id: 'workshop', label: 'Stage' }
];

const danceStyles = [
  'Salsa Cubaine',
  'Salsa Porto',
  'Bachata',
  'Kizomba',
  'Tango Argentin'
];

export default function CreateEventModal({ isOpen, onClose, onSubmit }: CreateEventModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'party',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    location: {
      address: '',
      latitude: 0,
      longitude: 0
    },
    price: 0,
    danceStyles: [] as string[],
    acceptedLevels: [] as string[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
    const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);
    
    onSubmit({
      title: formData.title,
      description: formData.description,
      type: formData.type as Event['type'],
      startDate: startDateTime,
      endDate: endDateTime,
      location: formData.location,
      price: formData.price,
      organizerId: 'org1',
      acceptedLevels: formData.type === 'class' || formData.type === 'workshop' 
        ? formData.acceptedLevels 
        : [],
      danceStyles: formData.danceStyles
    });
    
    onClose();
  };

  const handleStyleToggle = (style: string) => {
    setFormData(prev => ({
      ...prev,
      danceStyles: prev.danceStyles.includes(style)
        ? prev.danceStyles.filter(s => s !== style)
        : [...prev.danceStyles, style]
    }));
  };

  const handleLevelChange = (level: string) => {
    setFormData(prev => ({
      ...prev,
      acceptedLevels: prev.acceptedLevels.includes(level)
        ? prev.acceptedLevels.filter(l => l !== level)
        : [...prev.acceptedLevels, level]
    }));
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-lg w-full bg-white rounded-xl p-6 max-h-[90vh] overflow-y-auto">
          <Dialog.Title className="text-2xl font-bold text-gray-900 mb-6">
            Créer un événement
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type d'événement
              </label>
              <div className="grid grid-cols-2 gap-2">
                {eventTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, type: type.id }))}
                    className={`p-2 rounded-lg border ${
                      formData.type === type.id
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-500'
                    } transition-colors`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Titre
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                required
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date de début
                </label>
                <input
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.startDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Heure de début
                </label>
                <input
                  type="time"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.startTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date de fin
                </label>
                <input
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.endDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Heure de fin
                </label>
                <input
                  type="time"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.endTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Adresse
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.location.address}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  location: { ...prev.location, address: e.target.value }
                }))}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prix (€)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Styles de danse
              </label>
              <div className="grid grid-cols-2 gap-2">
                {danceStyles.map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => handleStyleToggle(style)}
                    className={`p-2 rounded-lg border ${
                      formData.danceStyles.includes(style)
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-500'
                    } transition-colors`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {(formData.type === 'class' || formData.type === 'workshop') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Niveaux acceptés
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['débutant', 'intermédiaire', 'avancé'].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => handleLevelChange(level)}
                      className={`p-2 rounded-lg border capitalize ${
                        formData.acceptedLevels.includes(level)
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-500'
                      } transition-colors`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Créer
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
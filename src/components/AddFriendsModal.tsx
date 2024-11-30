import { Dialog } from '@headlessui/react'
import { useState } from 'react'
import { User } from '../types'
import { FiUserPlus, FiCheck } from 'react-icons/fi'

interface AddFriendsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFriend: (friendIds: string[]) => void;
  currentFriends: User[];
}

const mockUsers: User[] = [
  {
    id: '2',
    email: 'maria@example.com',
    displayName: 'Maria Rodriguez',
    salsaLevel: 'intermédiaire',
    preferredStyles: ['Salsa Cubaine', 'Bachata'],
    biography: 'Passionnée de danses latines depuis 5 ans'
  },
  {
    id: '3',
    email: 'carlos@example.com',
    displayName: 'Carlos Mendoza',
    salsaLevel: 'avancé',
    preferredStyles: ['Salsa Porto', 'Bachata'],
    biography: 'Professeur de danse et amateur de musique latine'
  },
  {
    id: '4',
    email: 'sophie@example.com',
    displayName: 'Sophie Martin',
    salsaLevel: 'débutant',
    preferredStyles: ['Kizomba', 'Bachata'],
    biography: 'Débutante enthousiaste en danses latines'
  }
];

export default function AddFriendsModal({ isOpen, onClose, onAddFriend, currentFriends }: AddFriendsModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  
  const filteredUsers = mockUsers.filter(user => {
    const isAlreadyFriend = currentFriends.some(friend => friend.id === user.id);
    const matchesSearch = user.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return !isAlreadyFriend && matchesSearch;
  });

  const handleToggleFriend = (userId: string) => {
    setSelectedFriends(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSubmit = () => {
    if (selectedFriends.length > 0) {
      onAddFriend(selectedFriends);
      setSelectedFriends([]);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-lg w-full bg-white rounded-xl p-6">
          <Dialog.Title className="text-2xl font-bold text-gray-900 mb-6">
            Ajouter des amis
          </Dialog.Title>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Rechercher par nom ou email..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {filteredUsers.map(user => (
              <div 
                key={user.id} 
                className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${
                  selectedFriends.includes(user.id)
                    ? 'bg-indigo-50 border-2 border-indigo-500'
                    : 'bg-gray-50 border-2 border-transparent'
                }`}
                onClick={() => handleToggleFriend(user.id)}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl text-gray-400">
                    {user.displayName[0]}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{user.displayName}</h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <p className="text-sm text-gray-600 capitalize">Niveau: {user.salsaLevel}</p>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedFriends.includes(user.id)
                    ? 'border-indigo-500 bg-indigo-500 text-white'
                    : 'border-gray-300'
                }`}>
                  {selectedFriends.includes(user.id) && <FiCheck className="w-4 h-4" />}
                </div>
              </div>
            ))}

            {filteredUsers.length === 0 && (
              <p className="text-center text-gray-500 py-4">
                Aucun utilisateur trouvé
              </p>
            )}
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Annuler
            </button>
            <button
              onClick={handleSubmit}
              disabled={selectedFriends.length === 0}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                selectedFriends.length > 0
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <FiUserPlus className="w-4 h-4" />
              <span>Valider ({selectedFriends.length})</span>
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
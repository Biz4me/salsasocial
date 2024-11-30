import { Dialog } from '@headlessui/react'
import { useState } from 'react'
import { User } from '../types'
import { FiSend, FiCheck } from 'react-icons/fi'

interface InviteFriendsModalProps {
  isOpen: boolean;
  onClose: () => void;
  friends: User[];
  eventId: string;
  onInvite: (friendIds: string[]) => void;
}

export default function InviteFriendsModal({ isOpen, onClose, friends, eventId, onInvite }: InviteFriendsModalProps) {
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [invitationsSent, setInvitationsSent] = useState<string[]>([]);

  const filteredFriends = friends.filter(friend =>
    friend.displayName.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !invitationsSent.includes(friend.id)
  );

  const handleToggleFriend = (friendId: string) => {
    setSelectedFriends(prev =>
      prev.includes(friendId)
        ? prev.filter(id => id !== friendId)
        : [...prev, friendId]
    );
  };

  const handleInvite = () => {
    onInvite(selectedFriends);
    setInvitationsSent(prev => [...prev, ...selectedFriends]);
    setSelectedFriends([]);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-lg w-full bg-white rounded-xl p-6">
          <Dialog.Title className="text-2xl font-bold text-gray-900 mb-6">
            Inviter des amis
          </Dialog.Title>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Rechercher des amis..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {filteredFriends.map(friend => (
              <div 
                key={friend.id} 
                className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${
                  selectedFriends.includes(friend.id)
                    ? 'bg-indigo-50 border-2 border-indigo-500'
                    : 'bg-gray-50 border-2 border-transparent'
                }`}
                onClick={() => handleToggleFriend(friend.id)}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl text-gray-400">
                    {friend.displayName[0]}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{friend.displayName}</h3>
                    <p className="text-sm text-gray-600 capitalize">Niveau: {friend.salsaLevel}</p>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedFriends.includes(friend.id)
                    ? 'border-indigo-500 bg-indigo-500 text-white'
                    : 'border-gray-300'
                }`}>
                  {selectedFriends.includes(friend.id) && <FiCheck className="w-4 h-4" />}
                </div>
              </div>
            ))}

            {invitationsSent.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold text-gray-900 mb-2">Invitations envoyées</h4>
                <div className="space-y-2">
                  {friends
                    .filter(friend => invitationsSent.includes(friend.id))
                    .map(friend => (
                      <div key={friend.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg text-gray-400">
                            {friend.displayName[0]}
                          </div>
                          <span className="text-green-800">{friend.displayName}</span>
                        </div>
                        <span className="text-green-600">
                          <FiCheck className="w-5 h-5" />
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {filteredFriends.length === 0 && invitationsSent.length === 0 && (
              <p className="text-center text-gray-500 py-4">
                Aucun ami disponible à inviter
              </p>
            )}
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Fermer
            </button>
            {filteredFriends.length > 0 && (
              <button
                onClick={handleInvite}
                disabled={selectedFriends.length === 0}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  selectedFriends.length > 0
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <FiSend className="w-4 h-4" />
                <span>Inviter ({selectedFriends.length})</span>
              </button>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
import { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { Dialog } from '@headlessui/react';
import { FiEdit2, FiUserPlus, FiUsers } from 'react-icons/fi';
import AddFriendsModal from '../components/AddFriendsModal';
import FriendProfileModal from '../components/FriendProfileModal';
import { User } from '../types';

export default function Profile() {
  const { currentUser, updateProfile, friends, addFriend } = useUser();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddFriendsModalOpen, setIsAddFriendsModalOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<User | null>(null);
  const [editForm, setEditForm] = useState({
    displayName: currentUser?.displayName || '',
    biography: currentUser?.biography || '',
    salsaLevel: currentUser?.salsaLevel || 'débutant',
    preferredStyles: currentUser?.preferredStyles || []
  });

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(editForm);
    setIsEditModalOpen(false);
  };

  const handleStyleToggle = (style: string) => {
    setEditForm(prev => ({
      ...prev,
      preferredStyles: prev.preferredStyles.includes(style)
        ? prev.preferredStyles.filter(s => s !== style)
        : [...prev.preferredStyles, style]
    }));
  };

  if (!currentUser) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-3xl text-gray-400">
              {currentUser.displayName[0]}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{currentUser.displayName}</h1>
              <p className="text-gray-600">{currentUser.email}</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <FiEdit2 />
            <span>Modifier le profil</span>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">À propos</h2>
            <p className="text-gray-600">{currentUser.biography}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900">Niveau de danse</h2>
            <p className="text-gray-600 capitalize">{currentUser.salsaLevel}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900">Styles préférés</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {currentUser.preferredStyles.map(style => (
                <span key={style} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                  {style}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Friends Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <FiUsers className="mr-2" />
            Amis ({friends.length})
          </h2>
          <button 
            onClick={() => setIsAddFriendsModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <FiUserPlus />
            <span>Ajouter des amis</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {friends.map(friend => (
            <div 
              key={friend.id} 
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => setSelectedFriend(friend)}
            >
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl text-gray-400">
                {friend.displayName[0]}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{friend.displayName}</h3>
                <p className="text-sm text-gray-600 capitalize">{friend.salsaLevel}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-lg w-full bg-white rounded-xl p-6">
            <Dialog.Title className="text-2xl font-bold text-gray-900 mb-6">
              Modifier le profil
            </Dialog.Title>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom d'affichage
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  value={editForm.displayName}
                  onChange={e => setEditForm(prev => ({ ...prev, displayName: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Biographie
                </label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  rows={3}
                  value={editForm.biography}
                  onChange={e => setEditForm(prev => ({ ...prev, biography: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Niveau de danse
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  value={editForm.salsaLevel}
                  onChange={e => setEditForm(prev => ({ ...prev, salsaLevel: e.target.value as any }))}
                >
                  <option value="débutant">Débutant</option>
                  <option value="intermédiaire">Intermédiaire</option>
                  <option value="avancé">Avancé</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Styles préférés
                </label>
                <div className="space-y-2">
                  {['Salsa Cubaine', 'Salsa Porto', 'Bachata', 'Kizomba', 'Tango Argentin'].map(style => (
                    <label key={style} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={editForm.preferredStyles.includes(style)}
                        onChange={() => handleStyleToggle(style)}
                        className="mr-2"
                      />
                      {style}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Add Friends Modal */}
      <AddFriendsModal
        isOpen={isAddFriendsModalOpen}
        onClose={() => setIsAddFriendsModalOpen(false)}
        onAddFriend={addFriend}
        currentFriends={friends}
      />

      {/* Friend Profile Modal */}
      <FriendProfileModal
        isOpen={selectedFriend !== null}
        onClose={() => setSelectedFriend(null)}
        friend={selectedFriend}
      />
    </div>
  );
}
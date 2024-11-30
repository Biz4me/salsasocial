import { Dialog } from '@headlessui/react'
import { User } from '../types'
import { FiX, FiMail, FiMapPin } from 'react-icons/fi'

interface FriendProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  friend: User | null;
}

export default function FriendProfileModal({ isOpen, onClose, friend }: FriendProfileModalProps) {
  if (!friend) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-lg w-full bg-white rounded-xl p-6">
          <div className="flex justify-between items-start mb-6">
            <Dialog.Title className="text-2xl font-bold text-gray-900">
              Profil du danseur
            </Dialog.Title>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* En-tête du profil */}
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-2xl text-gray-400">
                {friend.displayName[0]}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{friend.displayName}</h2>
                <div className="flex items-center text-gray-600 mt-1">
                  <FiMail className="w-4 h-4 mr-2" />
                  <span>{friend.email}</span>
                </div>
                {friend.location && (
                  <div className="flex items-center text-gray-600 mt-1">
                    <FiMapPin className="w-4 h-4 mr-2" />
                    <span>Paris, France</span>
                  </div>
                )}
              </div>
            </div>

            {/* Informations de danse */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Niveau</h3>
                <p className="text-gray-600 capitalize">{friend.salsaLevel}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900">Styles préférés</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {friend.preferredStyles.map(style => (
                    <span 
                      key={style}
                      className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                    >
                      {style}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900">À propos</h3>
                <p className="text-gray-600">{friend.biography || "Aucune biographie disponible"}</p>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
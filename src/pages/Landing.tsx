import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { FiUser, FiBriefcase } from 'react-icons/fi';

export default function Landing() {
  const navigate = useNavigate();
  const { login } = useUser();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData.email, formData.password);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8 items-center">
        {/* Section de gauche - Présentation */}
        <div className="text-white space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            Bienvenue sur Salsa Social
          </h1>
          <p className="text-lg opacity-90">
            Rejoignez la plus grande communauté de danseurs et partagez votre passion pour la danse latine.
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <FiUser className="w-6 h-6" />
              </div>
              <p>Trouvez des événements près de chez vous</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <FiBriefcase className="w-6 h-6" />
              </div>
              <p>Organisez vos propres événements</p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-white/10 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Comptes de démonstration :</h3>
            <div className="space-y-2">
              <div>
                <p className="font-medium">Danseur :</p>
                <p>Email : dancer@demo.com</p>
                <p>Mot de passe : demo123</p>
              </div>
              <div>
                <p className="font-medium">Professionnel :</p>
                <p>Email : pro@demo.com</p>
                <p>Mot de passe : demo123</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section de droite - Connexion */}
        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Connexion
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg text-white font-medium bg-primary hover:bg-primary-dark transition-colors"
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../types';
import { useNavigate } from 'react-router-dom';

interface UserContextType {
  role: 'dancer' | 'professional';
  setRole: (role: 'dancer' | 'professional') => void;
  currentUser: User | null;
  friends: User[];
  addFriend: (friendIds: string[]) => void;
  removeFriend: (friendId: string) => void;
  updateProfile: (profile: Partial<User>) => void;
  login: (email: string, password: string) => void;
  isAuthenticated: boolean;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Comptes de démonstration
const demoAccounts = {
  dancer: {
    id: 'dancer1',
    email: 'dancer@demo.com',
    password: 'demo123',
    displayName: 'Alex Danseur',
    salsaLevel: 'intermédiaire' as const,
    preferredStyles: ['Salsa Cubaine', 'Bachata'],
    biography: 'Passionné de danses latines depuis 3 ans',
    location: {
      latitude: 48.8566,
      longitude: 2.3522
    }
  },
  professional: {
    id: 'pro1',
    email: 'pro@demo.com',
    password: 'demo123',
    displayName: 'Marie Professeur',
    salsaLevel: 'avancé' as const,
    preferredStyles: ['Salsa Cubaine', 'Salsa Porto', 'Bachata', 'Kizomba'],
    biography: 'Professeur de danse et organisatrice d\'événements',
    location: {
      latitude: 48.8566,
      longitude: 2.3522
    }
  }
};

// Amis de démonstration
const demoFriends: User[] = [
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

export function UserProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<'dancer' | 'professional'>('dancer');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [friends, setFriends] = useState<User[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté au chargement
    const savedUser = localStorage.getItem('currentUser');
    const savedRole = localStorage.getItem('userRole');
    if (savedUser && savedRole) {
      setCurrentUser(JSON.parse(savedUser));
      setRole(savedRole as 'dancer' | 'professional');
      setIsAuthenticated(true);
      if (savedRole === 'dancer') {
        setFriends(demoFriends);
      }
    }
  }, []);

  const login = (email: string, password: string) => {
    if (email === demoAccounts.dancer.email && password === demoAccounts.dancer.password) {
      setCurrentUser(demoAccounts.dancer);
      setRole('dancer');
      setFriends(demoFriends);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(demoAccounts.dancer));
      localStorage.setItem('userRole', 'dancer');
    } else if (email === demoAccounts.professional.email && password === demoAccounts.professional.password) {
      setCurrentUser(demoAccounts.professional);
      setRole('professional');
      setFriends([]);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(demoAccounts.professional));
      localStorage.setItem('userRole', 'professional');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setRole('dancer');
    setFriends([]);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRole');
  };

  const addFriend = (friendIds: string[]) => {
    const newFriends = friendIds
      .map(id => demoFriends.find(f => f.id === id))
      .filter((user): user is User => user !== undefined);
    
    setFriends(prev => {
      const uniqueFriends = [...prev];
      newFriends.forEach(newFriend => {
        if (!uniqueFriends.some(f => f.id === newFriend.id)) {
          uniqueFriends.push(newFriend);
        }
      });
      return uniqueFriends;
    });
  };

  const removeFriend = (friendId: string) => {
    setFriends(prev => prev.filter(friend => friend.id !== friendId));
  };

  const updateProfile = (profile: Partial<User>) => {
    setCurrentUser(prev => {
      const updatedUser = prev ? { ...prev, ...profile } : null;
      if (updatedUser) {
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      }
      return updatedUser;
    });
  };

  return (
    <UserContext.Provider value={{ 
      role, 
      setRole, 
      currentUser, 
      friends, 
      addFriend, 
      removeFriend,
      updateProfile,
      login,
      isAuthenticated,
      logout
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
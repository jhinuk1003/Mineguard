import { CivicAuthProvider } from '@civic/auth/react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { DashboardAdmins } from './screens/DashboardAdmins';
import { LandingPage } from './screens/LandingPage/LandingPage';
import { LoginPage } from './screens/LoginPage';
import { BatchDetailsPage } from './screens/BatchDetailsPage';
import { DatabaseInitializer } from './Module/databaseInit';

// The User type is not directly exported by Civic, so we define it based on expected properties
type User = {
  name?: string;
  email?: string;
  id?: string;
  avatar?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
};

const AppContent = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        await DatabaseInitializer.initializeDatabase();
        setDbInitialized(true);
        console.log('Database initialized successfully');
      } catch (error) {
        console.error('Failed to initialize database:', error);
        setDbInitialized(true);
      }
    };

    initializeDatabase();
    
    // Check for a stored user session
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    sessionStorage.setItem('user', JSON.stringify(loggedInUser)); // Persist user
    navigate('/dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem('user'); // Clear user
    navigate('/login');
  };
  
  const handleNavigateToDashboard = () => {
    navigate('/login');
  };
  
  const handleNavigateToLanding = () => {
    navigate('/');
  };

  if (!dbInitialized) {
    return (
      <div className="w-full h-screen bg-[#120726] text-[#FFF8E7] flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 jali-pattern opacity-20 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col items-center gap-4 p-8 rounded-2xl desi-card max-w-sm text-center">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-[#F5D061]/20 animate-ping"></div>
            <div className="w-14 h-14 rounded-full border-4 border-transparent border-t-[#FF7A00] border-r-[#E11D74] border-b-[#F5D061] animate-spin"></div>
            <span className="text-xl">🪔</span>
          </div>
          <div>
            <h2 className="font-['Rozha_One',serif] text-2xl text-[#F5D061] tracking-wide">MineGuard</h2>
            <p className="text-xs font-['Rajdhani',sans-serif] tracking-widest text-[#FFA047] uppercase mt-1">सुरक्षा एवं प्रबंधन प्रणाली</p>
          </div>
          <p className="text-sm font-medium text-[#FFF8E7]/80">आरंभ हो रहा है • Initializing System...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage onNavigateToDashboard={handleNavigateToDashboard} />} />
      <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      <Route path="/batch/:batchId" element={<BatchDetailsPage />} />
      <Route
        path="/dashboard"
        element={
          user ? (
            <DashboardAdmins user={user} onLogout={handleLogout} onNavigateToLanding={handleNavigateToLanding} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      {/* Add a catch-all or a 404 page if desired */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export const App = (): JSX.Element => {
  const civicAppId = import.meta.env.VITE_CIVIC_APP_ID || "67d7e55d-719e-42b5-859a-ab4dfae9de62";

  return (
    <CivicAuthProvider clientId={civicAppId}>
      <Router>
        <div className="w-full min-h-screen bg-[#120726] text-[#FFF8E7]">
          <AppContent />
        </div>
      </Router>
    </CivicAuthProvider>
  );
};
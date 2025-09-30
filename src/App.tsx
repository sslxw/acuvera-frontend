import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/Toaster';
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/LoginPage';
import { ClassifyPage } from '@/pages/ClassifyPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { ReviewPage } from '@/pages/ReviewPage';
import { TestPage } from '@/pages/TestPage';
import { useSessionStore } from '@/store/useSessionStore';

function App() {
  const { isDarkMode, isLoggedIn } = useSessionStore();

  // Apply dark mode on mount
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          {isLoggedIn && (
            <>
              <Route path="/classify" element={
                <>
                  <NavBar />
                  <main className="flex-1">
                    <ClassifyPage />
                  </main>
                  <Footer />
                </>
              } />
              <Route path="/dashboard" element={
                <>
                  <NavBar />
                  <main className="flex-1">
                    <DashboardPage />
                  </main>
                  <Footer />
                </>
              } />
              <Route path="/review" element={
                <>
                  <NavBar />
                  <main className="flex-1">
                    <ReviewPage />
                  </main>
                  <Footer />
                </>
              } />
              <Route path="/test" element={
                <>
                  <NavBar />
                  <main className="flex-1">
                    <TestPage />
                  </main>
                  <Footer />
                </>
              } />
            </>
          )}
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;

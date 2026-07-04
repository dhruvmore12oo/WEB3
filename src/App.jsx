import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Concepts from './pages/Concepts';
import Prices from './pages/Prices';
import Simulator from './pages/Simulator';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-background text-text flex flex-col font-sans selection:bg-primary/30 relative overflow-hidden">
        {/* Geometric Background Elements */}
        <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-[100px] rotate-12 blur-3xl" />
          <div className="absolute top-[20%] -right-[5%] w-[30%] h-[50%] bg-blue-500/5 rounded-[80px] -rotate-12 blur-3xl" />
          <div className="absolute -bottom-[20%] left-[20%] w-[50%] h-[40%] bg-secondary/5 rounded-full blur-3xl" />
        </div>

        <Navbar />
        
        <main className="flex-grow z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/concepts" element={<Concepts />} />
            <Route path="/prices" element={<Prices />} />
            <Route path="/simulator" element={<Simulator />} />
            <Route path="*" element={
              <div className="min-h-screen flex items-center justify-center pt-20">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
                  <p className="text-xl text-muted">Page not found</p>
                </div>
              </div>
            } />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

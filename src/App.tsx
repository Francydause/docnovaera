import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Banner from './components/Banner';
import Main from './components/Main';
import Footer from './components/Footer';
import Inscription from './pages/Inscription';
import ProgramDetails from './pages/ProgramDetails';
import Checkout from './pages/Checkout';
import PixPayment from './pages/PixPayment';
import SuccessPage from './pages/SuccessPage';
import { LocationProvider } from './context/LocationContext';
import { UserProvider } from './context/UserContext';

function ScrollToTop() {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function App() {
  return (
    <UserProvider>
      <LocationProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-white flex flex-col">
            <Header />
            <Routes>
              <Route path="/" element={
                <>
                  <Banner />
                  <Main />
                </>
              } />
              <Route path="/inscricao" element={<Inscription />} />
              <Route path="/programa" element={<ProgramDetails />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/pix-payment" element={<PixPayment />} />
              <Route path="/sucesso" element={<SuccessPage />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </LocationProvider>
    </UserProvider>
  );
}

export default App;
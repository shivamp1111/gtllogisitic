import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Tracking from './pages/Tracking';
import Branches from './pages/Branches';
import Contact from './pages/Contact';
import WhyUs from './pages/WhyUs';
import About from './pages/About';
import Features from './pages/Features';
import Admin from './pages/Admin';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/admin" element={<Admin />} />
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="booking" element={<Booking />} />
                <Route path="tracking" element={<Tracking />} />
                <Route path="branches" element={<Branches />} />
                <Route path="contact" element={<Contact />} />
                <Route path="why-us" element={<WhyUs />} />
                <Route path="about" element={<About />} />
                <Route path="features" element={<Features />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;


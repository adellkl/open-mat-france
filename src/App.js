import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import AddOpenMatPage from './pages/AddOpenMatPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage'; // Importer le composant LoginPage
import PrivateRoute from './components/PrivateRoute';
import Error404 from './pages/Error404'

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/detail/:id" element={<DetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Error404 />} />
            <Route element={<PrivateRoute />}>
              <Route path="/add" element={<AddOpenMatPage />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

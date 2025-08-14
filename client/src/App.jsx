import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './pages/owner/Layout';
import Dashboard from './pages/owner/Dashboard';
import AddCar from './pages/owner/AddCar';
import ManageCars from './pages/owner/ManageCars';
import ManageBookings from './pages/owner/ManageBookings';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import Home from './pages/Home';
import Cars from './pages/Cars';
import CarDetails from './pages/CarDetails';
import MyBookings from './pages/MyBookings';
import { Toaster } from 'react-hot-toast';
import { useAppContext } from './context/AppContext';

const App = () => {
  const location = useLocation();            // ✅ get location
  const { showLogin } = useAppContext();
  const isOwnerPath = location.pathname.startsWith('/owner');

  return (
    <>
      <Toaster />
      <div className="bg-white min-h-screen flex flex-col">
        {/* Login modal */}
        {showLogin && <Login />}

        {/* Navbar only on non-owner pages */}
        {!isOwnerPath && <Navbar />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/car-details/:id" element={<CarDetails />} />
          <Route path="/my-bookings" element={<MyBookings />} />

          <Route path="/owner" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="add-car" element={<AddCar />} />
            <Route path="manage-cars" element={<ManageCars />} />
            <Route path="manage-bookings" element={<ManageBookings />} />
          </Route>
        </Routes>

        {/* Footer only on non-owner pages */}
        {!isOwnerPath && <Footer />}
      </div>
    </>
  );
};

export default App;

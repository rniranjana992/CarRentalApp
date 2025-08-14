import React from 'react';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const NavbarOwner = () => {
  const { user } = useAppContext(); // <-- ✅ call the hook here
  return (
    <div className="flex justify-between px-6 md:px-10 py-4 text-gray-500 border-b border-borderColor">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="h-7" />
      </Link>
      <p>Welcome, {user?.name || "Owner"}</p>
    </div>
  );
};

export default NavbarOwner;

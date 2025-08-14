import React, { useState } from 'react';
import { assets, cityList } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const {pickupDate, setPickupDate,returnDate, setReturnDate,navigate}= useAppContext()
  const handleSearch=(e)=>{
    e.preventDefault()
    navigate('/cars?pickupLocation=' +pickupLocation + '&pickupDate=' + pickupDate + '&returnDate=' + returnDate)
  }

  return (
    <div className='h-screen flex flex-col items-center justify-center bg-gray-50 px-4'>
      <h1 className='text-4xl md:text-5xl font-semibold mb-8 text-center'>
        Luxury cars on Rent
      </h1>

      <form onSubmit={handleSearch} className='flex flex-col md:flex-row items-center justify-between p-4 md:p-6 rounded-xl md:rounded-full w-full max-w-4xl bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)] gap-4 md:gap-8'>
        <div className='flex flex-col items-start'>
          <select
            required
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            className='px-3 py-2 border rounded-md w-40 md:w-auto'
          >
            <option value="">Pickup Location</option>
            {cityList.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          <p className='text-xs text-gray-500 mt-1'>
            {pickupLocation ? pickupLocation : 'Please select the location'}
          </p>
        </div>

        <div className='flex flex-col items-start'>
          <label htmlFor='pickup-date' className='text-sm mb-1'>Pick-up Date</label>
          <input value={pickupDate} onChange={e=>setPickupDate(e.target.value)}
            type="date"
            id="pickup-date"
            min={new Date().toISOString().split('T')[0]}
            required
            className='px-3 py-2 border rounded-md text-sm text-gray-500 w-40 md:w-auto'
          />
        </div>

        <div className='flex flex-col items-start'>
          <label htmlFor='return-date' className='text-sm mb-1'>Return Date</label>
          <input value={returnDate} onChange={e=>setReturnDate(e.target.value)}
            type="date"
            id="return-date"
            required
            className='px-3 py-2 border rounded-md text-sm text-gray-500 w-40 md:w-auto'
          />
        </div>

        <button
          type="submit"
          className='flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dull text-white rounded-full transition'
        >
          <img src={assets.search_icon} alt="search" className='brightness-300' />
          Search
        </button>
      </form>

      <img src={assets.main_car} alt="car" className='max-h-72 mt-8' />
    </div>
  );
};

export default Hero;

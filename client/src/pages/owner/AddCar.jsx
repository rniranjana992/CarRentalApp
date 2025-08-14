import React, { useState } from 'react';
import Title from '../../components/owner/Title';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast'; // ✅ added

const AddCar = () => {
  const { axios, currency } = useAppContext();

  const [image, setImage] = useState(null);
  const [car, setCar] = useState({
    brand: '',
    model: '',
    year: '',
    pricePerDay: '',
    Category: '',
    transmission: '',
    fuel_type: '',
    seating_capacity: '',
    location: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    try {
      const formData = new FormData(); // ✅ fixed typo
      formData.append('image', image);

      // Convert number fields properly
      const preparedCar = {
        ...car,
        year: Number(car.year),
        pricePerDay: Number(car.pricePerDay),
        seating_capacity: Number(car.seating_capacity),
      };

      formData.append('carData', JSON.stringify(preparedCar));

      const { data } = await axios.post('/api/owner/add-car', formData);
      if (data.success) {
        toast.success(data.message);
        setImage(null);
        setCar({
          brand: '',
          model: '',
          year: '',
          pricePerDay: '',
          Category: '',
          transmission: '',
          fuel_type: '',
          seating_capacity: '',
          location: '',
          description: '',
        });
      } else {
        toast.error(data.message || 'Failed to add car');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='px-4 py-10 md:px-10 flex-1 bg-white'>
      <Title
        title="Add New Car"
        subtitle="Fill in details to list a new car for booking, including pricing, availability, and car specifications."
      />
      <form
        onSubmit={onSubmitHandler}
        className='flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl'
      >
        {/* Car image */}
        <div className='flex items-center gap-2 w-full'>
          <label htmlFor="car-image" className='cursor-pointer'>
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              alt=''
              className='h-14 rounded'
            />
            <input
              id="car-image"
              type='file'
              accept="image/*"
              hidden
              required
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <p className='text-sm text-gray-500'>Upload a picture of your car</p>
        </div>

        {/* Brand & Model */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='flex flex-col'>
            <label>Brand</label>
            <input
              type='text' placeholder='e.g. BMW, Audi...'
              required
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
              value={car.brand}
              onChange={e => setCar({ ...car, brand: e.target.value })}
            />
          </div>
          <div className='flex flex-col'>
            <label>Model</label>
            <input
              type='text' placeholder='e.g. X5, M4...'
              required
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
              value={car.model}
              onChange={e => setCar({ ...car, model: e.target.value })}
            />
          </div>
        </div>

        {/* Year, Price, Category */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          <div className='flex flex-col'>
            <label>Year</label>
            <input
              type='number' placeholder='2025'
              required
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
              value={car.year}
              onChange={e => setCar({ ...car, year: e.target.value })}
            />
          </div>
          <div className='flex flex-col'>
            <label>Daily Price ({currency})</label>
            <input
              type='number' placeholder='500'
              required
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
              value={car.pricePerDay}
              onChange={e => setCar({ ...car, pricePerDay: e.target.value })}
            />
          </div>
          <div className='flex flex-col'>
            <label>Category</label>
            <select
              required
              value={car.category}
              onChange={e => setCar({ ...car, category: e.target.value })}
              className='px-3 py-2 border border-borderColor rounded-md outline-none'
            >
              <option value="">Select a category</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Van">Van</option>
            </select>
          </div>
        </div>

        {/* Transmission, Fuel type, Seating */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          <div className='flex flex-col'>
            <label>Transmission</label>
            <select
              required
              value={car.transmission}
              onChange={e => setCar({ ...car, transmission: e.target.value })}
              className='px-3 py-2 border border-borderColor rounded-md outline-none'
            >
              <option value="">Select a transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="Semi-Automatic">Semi-Automatic</option>
            </select>
          </div>
          <div className='flex flex-col'>
            <label>Fuel Type</label>
            <select
              required
              value={car.fuel_type}
              onChange={e => setCar({ ...car, fuel_type: e.target.value })}
              className='px-3 py-2 border border-borderColor rounded-md outline-none'
            >
              <option value="">Select a fuel type</option>
              <option value="Gas">Gas</option>
              <option value="Diesel">Diesel</option>
              <option value="Petrol">Petrol</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div className='flex flex-col'>
            <label>Seating Capacity</label>
            <input
              type='number' placeholder='4'
              required
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
              value={car.seating_capacity}
              onChange={e => setCar({ ...car, seating_capacity: e.target.value })}
            />
          </div>
        </div>

        {/* Location */}
        <div className='flex flex-col'>
          <label>Location</label>
          <select
            required
            value={car.location}
            onChange={e => setCar({ ...car, location: e.target.value })}
            className='px-3 py-2 border border-borderColor rounded-md outline-none'
          >
            <option value="">Select a location</option>
            <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Houston">Houston</option>
            <option value="Chicago">Chicago</option>
          </select>
        </div>

        {/* Description */}
        <div className='flex flex-col'>
          <label>Description</label>
          <textarea
            rows={5} placeholder='e.g. A luxurious SUV with a spacious interior...'
            required
            className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
            value={car.description}
            onChange={e => setCar({ ...car, description: e.target.value })}
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary text-white rounded-md font-medium w-max ${
            isLoading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          <img src={assets.tick_icon} alt="" />
          {isLoading ? 'Listing...' : 'List your Car'}
        </button>
      </form>
    </div>
  );
};

export default AddCar;

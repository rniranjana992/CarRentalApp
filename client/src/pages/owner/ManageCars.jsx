import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import Title from '../../components/owner/Title';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const ManageCars = () => {
  const { isOwner, axios, currency } = useAppContext();
  const [cars, setCars] = useState([]);

  // Fetch cars owned by the current owner
  const fetchOwnerCars = async () => {
    try {
      const { data } = await axios.get('/api/owner/cars');
      if (data.success) {
        setCars(data.cars);
      } else {
        toast.error(data.message || 'Failed to fetch cars');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || 'Something went wrong');
    }
  };

  // Toggle car availability
  const toggleAvailability = async (carId) => {
    try {
      const { data } = await axios.post('/api/owner/toggle-car', { carId });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerCars();
      } else {
        toast.error(data.message || 'Failed to update status');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || 'Something went wrong');
    }
  };

  // Delete car
  const deleteCar = async (carId) => {
    try {
      const confirm = window.confirm('Are you sure you want to delete this car?');
      if (!confirm) return;

      const { data } = await axios.post('/api/owner/delete-car', { carId });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerCars();
      } else {
        toast.error(data.message || 'Failed to delete car');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    if (isOwner) fetchOwnerCars();
  }, [isOwner]);

  return (
    <div className="bg-white min-h-screen px-4 pt-10 md:px-10 w-full">
      <Title
        title="Manage Cars"
        subtitle="View all listed cars, update their details, or remove them from the booking platform."
      />

      <div className="max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6">
        <table className="w-full border-collapse text-left text-sm text-gray-600">
          <thead className="text-gray-500">
            <tr>
              <th className="p-3 font-medium">Car</th>
              <th className="p-3 font-medium max-md:hidden">Category</th>
              <th className="p-3 font-medium">Price</th>
              <th className="p-3 font-medium max-md:hidden">Status</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => (
              <tr key={index} className="border-t border-borderColor">
                {/* Car info */}
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={car.image}
                    alt={`${car.brand} ${car.model}`}
                    className="h-12 w-12 rounded-md object-cover"
                  />
                  <div className="max-md:hidden">
                    <p className="font-medium">{car.brand} {car.model}</p>
                    <p className="text-xs text-gray-500">{car.seating_capacity} seats • {car.transmission}</p>
                  </div>
                </td>

                {/* Category */}
                <td className="p-3 max-md:hidden">{car.category}</td>

                {/* Price */}
                <td className="p-3">{currency}{car.pricePerDay}/day</td>

                {/* Status */}
                <td className="p-3 max-md:hidden">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      car.isAvailable
                        ? 'bg-green-100 text-green-500'
                        : 'bg-red-100 text-red-500'
                    }`}
                  >
                    {car.isAvailable ? 'Available' : 'Unavailable'}
                  </span>
                </td>

                {/* Actions */}
                <td className="flex items-center gap-3 p-3">
                  <img
                    onClick={() => toggleAvailability(car._id)}
                    src={car.isAvailable ? assets.eye_close_icon : assets.eye_icon}
                    alt="Toggle availability"
                    className="cursor-pointer"
                  />
                  <img
                    onClick={() => deleteCar(car._id)}
                    src={assets.delete_icon}
                    alt="Delete car"
                    className="cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCars;

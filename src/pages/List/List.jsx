import React, { useEffect, useState } from 'react';
import './List.css';

const FoodList = () => {
  const [foods, setFoods] = useState([]);

  // Fetch food list from backend
  const fetchFoods = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/foodsget'); // Replace with your API URL
      const data = await response.json();
      setFoods(data.foods);
    } catch (error) {
      console.error('Error fetching the food list:', error);
    }
  };

  // Delete food item from backend
  const handleDelete = async (foodId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/foodsdelete/${foodId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Remove the deleted food from the UI
        setFoods(foods.filter((food) => food.food_id !== foodId));
      } else {
        console.error('Failed to delete the food item:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting the food item:', error);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <div className="foodlist-container">
      <h1>Food List</h1>
      <table className="food-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((food) => (
            <tr key={food.food_id}>
              <td>
                <img
                  src={`http://127.0.0.1:8000${food.image}`}
                  alt={food.name}
                  className="food-image"
                />
              </td>
              <td>{food.name}</td>
              <td>{food.category}</td>
              <td>${food.price.toFixed(2)}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(food.food_id)}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FoodList;

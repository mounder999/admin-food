import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Add = () => {
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Salad',
    });
    const [loading, setLoading] = useState(false); // For API call state

    // Update form data state
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Handle form submission
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setLoading(true); // Start loading spinner

        // Create FormData to handle image and other inputs
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('category', data.category);
        if (image) {
            formData.append('image', image);
        }

        try {
            // API call using fetch (replace URL with your API endpoint)
            const response = await fetch('http://127.0.0.1:8000/api/foods', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                toast.success('Product added successfully!');
                setData({ name: '', description: '', price: '', category: '' }); // Reset form
                setImage(false); // Reset image
            } else {
                const errorData = await response.json();
                toast.error(`Error: ${errorData.message || 'Failed to add product'}`);
            }
        } catch (error) {
            toast.error(`Error: ${error.message || 'Something went wrong'}`);
        } finally {
            setLoading(false); // Stop loading spinner
        }
    };

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor='image'>
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt='' />
                    </label>
                    <input
                        onChange={(e) => setImage(e.target.files[0])}
                        type='file'
                        id='image'
                        hidden
                        required
                    />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.name}
                        type='text'
                        name='name'
                        placeholder='Type here'
                        required
                    />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea
                        onChange={onChangeHandler}
                        value={data.description}
                        name='description'
                        rows='6'
                        placeholder='Write content'
                        required
                    ></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select
                            name='category'
                            onChange={onChangeHandler}
                            value={data.category}
                        >
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Desert">Desert</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Price</p>
                        <input
                            onChange={onChangeHandler}
                            value={data.price}
                            type='number'
                            name='price'
                            placeholder='$20'
                            required
                        />
                    </div>
                </div>
                <button type='submit' className='add-btn' disabled={loading}>
                    {loading ? 'Adding...' : 'Add'}
                </button>
            </form>

            {/* ToastContainer is required to show notifications */}
            <ToastContainer position="top-center" autoClose={3000} />
        </div>
    );
};

export default Add;

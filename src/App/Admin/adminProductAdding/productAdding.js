import AdminHeader from '../adminHeader/adminHeader';
import imagePreview from '../../images/image-uploading-preview.svg';
import Footer from '../../Footer/Footer';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import "./productAdding.css"

export default function ProductAdding() {
  const navigate = useNavigate();
  const location = useLocation();
  const [adminData, setAdminData] = useState({
    plantName: '',
    plantSmallDescription: '',
    plantPrice: '',
    plantLongDescription: '',
    plantDescriptionForCard: '',
    category: '',
  });

  const [images, setImages] = useState({
    plantImage: null,
    plantImageForCard: null,
    plantSecondImage: null,
    plantThirdImage: null
  });

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/adminLogin'); // Redirect to login page if not authenticated
    }
  }, [navigate]);

  // Fetch product details if editing
  useEffect(() => {
    if (location.state && location.state.id) {
      const productId = location.state.id;
      axios.get(`${process.env.REACT_APP_BASE_URL}/getproduct/${productId}`)
        .then(response => {
          const product = response.data;
          setAdminData({
            plantName: product.plantName,
            plantSmallDescription: product.plantSmallDescription,
            plantPrice: product.plantPrice,
            plantLongDescription: product.plantLongDescription,
            plantDescriptionForCard: product.plantDescriptionForCard,
            category: product.category,
          });
        })
        .catch(error => {
          console.error('Error fetching product details:', error);
        });
    }
  }, [location.state]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData({
      ...adminData,
      [name]: value
    });
  };

  // Handle image input changes
  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setImages({
      ...images,
      [name]: files[0]
    });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(adminData).forEach(key => {
      formData.append(key, adminData[key]);
    });

    Object.keys(images).forEach(key => {
      if (images[key]) {
        formData.append('images', images[key]);
      }
    });

    try {
      // Get the JWT token from localStorage
      const token = localStorage.getItem('authToken');

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` // Add JWT token in Authorization header
        }
      };

      if (location.state && location.state.id) {
        // Edit mode: update the product
        const productId = location.state.id;
        console.log('Updating product:', productId);
        const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/updateproducts/${productId}`, formData, config);
        console.log('Product updated:', response.data);
        alert('Product updated successfully!');
      } else {
        // Add mode: create a new product
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/createproduct`, formData, config);
        console.log('Product created:', response.data);
        alert('Product created successfully!');
      }

      // Reset form after successful submission
      setAdminData({
        plantName: '',
        plantSmallDescription: '',
        plantPrice: '',
        plantLongDescription: '',
        plantDescriptionForCard: '',
        category: '',
      });
      setImages({
        plantImage: null,
        plantImageForCard: null,
        plantSecondImage: null,
        plantThirdImage: null
      });

      navigate("/"); // Redirect after successful form submission

    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Invalid or expired token
        console.error('Token invalid or expired. Redirecting to login.');
        localStorage.removeItem('authToken'); // Remove token
        navigate('/adminLogin'); // Redirect to login
      } else {
        console.error('Error creating/updating product:', error);
        alert('Error creating/updating product. Please try again.');
      }
    }
  };

  return (
    <div className='admin-product-adding-page'>
      <div className="product-adding-header">
        <AdminHeader />
      </div>
      <form className="main-content-product-adding" onSubmit={handleFormSubmit}>
        <div className="input-fields">
          <span className='main-content-title'>{location.state && location.state.id ? "Edit Product" : "Create New Product"}</span>
          <label htmlFor="plantName">Enter the Plant Name <span style={{ color: "green" }}>*</span> </label>
          <input required type="text" placeholder='Enter the Plant Name' name='plantName' className='product-adding-input-box' value={adminData.plantName} onChange={handleChange} />
          <label htmlFor="plantPrice">Enter the Price <span style={{ color: "green" }}>*</span></label>
          <input required type="text" placeholder='Enter the price' name='plantPrice' className='product-adding-input-box' value={adminData.plantPrice} onChange={handleChange} />
          <label htmlFor="plantLongDescription">Enter the Plant's Description <span style={{ color: "green" }}>*</span></label>
          <textarea placeholder="Enter the Description" name='plantLongDescription' className='product-adding-input-box' value={adminData.plantLongDescription} onChange={handleChange} />
          <label htmlFor="category">Enter the Plant Category <span style={{ color: "green" }}>*</span></label>
          <select required name="category" className='product-adding-input-box' onChange={handleChange} value={adminData.category}>
            <option value="">Select a category</option>
            <option value="All Plants">All Plants</option>
            <option value="Outdoor Plant">Outdoor Plant</option>
            <option value="Indoor Plant">Indoor Plant</option>
            <option value="AirPurifier Plant">Air Purifier</option>
            <option value="Flowering Plant">Flowering Plant</option>
            <option value="Prosperity Plant">Prosperity Plant</option>
          </select>
          <label htmlFor="plantSmallDescription">Enter Small Description <span style={{ color: "green" }}>*</span></label>
          <input required type="text" placeholder='Enter small description' name='plantSmallDescription' className='product-adding-input-box' value={adminData.plantSmallDescription} onChange={handleChange} />
          <label htmlFor="plantDescriptionForCard">Enter Description for Card <span style={{ color: "green" }}>*</span></label>
          <input required type="text" placeholder='Enter description for card' name='plantDescriptionForCard' className='product-adding-input-box' value={adminData.plantDescriptionForCard} onChange={handleChange} />
        </div>
        <span className='upload-pictures-text'>Upload Pictures</span>
        <div className="image-upload-section">
          <div className="file-access-parent-div">
            <label className="file-access-div">
              <input
                required
                className="file-selector-input"
                type="file"
                name="plantImage"
                onChange={handleImageChange}
              />
              <img src={imagePreview} alt="" />
            </label>
            <span className="image-uploading-button-specifiers">Main Image <span style={{ color: "red" }}>*</span> </span>
          </div>
          <div className="file-access-parent-div">
            <label className="file-access-div">
              <input
                className="file-selector-input"
                type="file"
                name="plantImageForCard"
                onChange={handleImageChange}
              />
              <img src={imagePreview} alt="" />
            </label>
            <span className="image-uploading-button-specifiers">Image for Card </span>
          </div>
          <div className="file-access-parent-div">
            <label className="file-access-div">
              <input
                className="file-selector-input"
                type="file"
                name="plantSecondImage"
                onChange={handleImageChange}
              />
              <img src={imagePreview} alt="" />
            </label>
            <span className="image-uploading-button-specifiers">Second Image  </span>
          </div>
          <div className="file-access-parent-div">
            <label className="file-access-div">
              <input
                className="file-selector-input"
                type="file"
                name="plantThirdImage"
                onChange={handleImageChange}
              />
              <img src={imagePreview} alt="" />
            </label>
            <span className="image-uploading-button-specifiers">Third Image  </span>
          </div>
        </div>
        <div className="form-submit-button">
          <button type="submit" className="product-adding-button">
            {location.state && location.state.id ? "Update Product" : "Create Product"}
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
}

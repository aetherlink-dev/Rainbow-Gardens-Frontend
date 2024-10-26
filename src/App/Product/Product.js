import React, { useEffect, useState } from "react";
import "./Product.css";
import NavbarWithBorder from "../Navbar/NavbarWithBorder";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { fetchProductByPno } from "../Redux/Slice/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import productLine from "../images/ProductFooterLine.svg";
import whatsappIcon from "../images/WhatsappSmallIcon.svg";
import Footer from "../Footer/Footer";
import { ThreeDots } from "react-loader-spinner";
import { addProduct } from "../Redux/Slice/ProductSlice";

export default function Product() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.product);
  const navigate = useNavigate();
  
  // State to track the currently selected main image
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    dispatch(fetchProductByPno(productId));
  }, [dispatch, productId]);

  // Set initial main image when product data is loaded
  useEffect(() => {
    if (productState.product?.images) {
      setSelectedImage(productState.product.images[0]);
    }
  }, [productState.product]);

  return (
    <div className="product">
      {productState.isLoading ? (
        <div className="loaderDiv">
          <ThreeDots visible={true} color="#063C17" />
        </div>
      ) : (
        <div className="productContainer">
          <NavbarWithBorder />
          <div className="productBottomContainer">
            <div className="productBottomLeftDiv">
              <div className="productImageContainer">
                <img src={selectedImage} alt="Selected product" />
              </div>

              {/* Thumbnail gallery for additional images */}
            <div className="thumbnailDiv">
              <div className="thumbnailGallery">
                {productState.product?.images?.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className={`thumbnailImage ${image === selectedImage ? "active" : ""}`}
                    onClick={() => setSelectedImage(image)}
                  />
                ))}
              </div>
             </div>
            </div>

            <div className="productBottomRightDiv">
              <div className="productRightTopDiv">
                <div className="productTitle">
                  <span>{productState.product?.plantName}</span>
                </div>

                <div className="productSmallDescriptionDiv">
                  <span>{productState.product?.plantSmallDescription}</span>
                </div>

                <div className="price-add-to-cart-combo">
                  <div className="productPriceDiv">
                    <span>₹ {productState.product?.plantPrice}</span>
                  </div>

                  <div className="whatsappContactButton">
                   <NavLink to="https://wa.me/917012351551?text=I'm%20interested%20in%20your%20Plants%20">
                     <button className="whatsappButton">
                       <img src={whatsappIcon} alt="whatsappIcon" />
                       <span>+91 7012351551</span>
                     </button>
                    </NavLink> 
                  </div>
                </div>
              </div>

              <div className="productRightBottomDiv">
                <div className="productCategoryDiv">
                  <span>Category:</span>
                  <button className="categoryButton">
                    {productState.product?.category}
                  </button>
                </div>

                <div className="productFooterLine">
                  <img src={productLine} alt="productLine" />
                </div>

                <div className="productLongDescriptionDiv">
                  <span>{productState.product?.plantLongDescription}</span>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      )}
    </div>
  );
}

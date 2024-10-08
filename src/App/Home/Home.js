import React, { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "../Navbar/Navbar";
import WhyChooseUs from "../WhyChooseUs/WhyChooseUs";
import Faq from "../Faq/Faq";
import Footer from "../Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Redux/Slice/ProductSlice";
import { Card } from "react-bootstrap";
import expandIcon from "../images/ExpandIcon.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  const productState = useSelector((state) => state.product);
  const [plantsData, setPlantsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/getproduct`);
        const data = await response.json();
        setPlantsData(data);
      } catch (e) {
        console.log(e);
      }
    };
  
    fetchData();
  }, []);

  const handleExpandClick = (plantId) => {
    navigate(`/product/${plantId}`);
  };

  return (
    <div className="home">
      <div className="homeTopDiv">
        <Navbar />

        <div className="topBottomDiv">
          <div className="homeContentContainer">
            <div className="homeContentDiv">
              <div className="flourishDiv">
                <span>Flourish</span>
              </div>

              <div className="togetherDiv">
                <span>together</span>
              </div>

              <div className="descriptionDiv">
                <span>
                  Get the plant <br className="breakForMobile" />
                  that makes you happy
                </span>
              </div>
            </div>
          </div>
          <div className="homeButtonContainer">
            <NavLink to="/category">
              <button className="orderButton">Order now</button>
            </NavLink>
          </div>
        </div>
      </div>

      <div className="homeMiddleDiv">
        <div className="categoriesContainer">
          <div className="categoryLeftContainer">
              <NavLink to="/plants/All">
                <div className="allPlantsContainer">
                  <span><span>All Plants</span></span>
                </div>
              </NavLink>

            <div className="categoryLeftBottomContainer">
              <NavLink to="/plants/AirPurifier">
                <div className="airPurifierContainer">               
                    <span>Air Purifier<br className="breakForMobile"></br>Plants</span>            
                </div>
              </NavLink>

              <NavLink to="/plants/Indoor">
                <div className="indoorContainer">
                   <span>Indoor<br className="breakForMobile"></br>Plants</span>
                 </div>
              </NavLink>
            </div>
          </div>

          <div className="categoryRightContainer">

           <div className="categoryOutdoorContainer">
            <NavLink to="/plants/Outdoor">
              <div className="outdoorContainer">
                <span>Outdoor<br className="breakForMobile"></br>Plants</span>
              </div>
             </NavLink>
            </div>
            
            
            <div className="categorySideContainer">
              <NavLink to="/plants/Flowering">
               <div className="floweringContainer">
                 <span>Flowering<br className="breakForMobile"></br>Plants</span>
               </div>
               </NavLink>
               <NavLink to="/plants/Prosperity">
                <div className="prosperityContainer">
                  <span>Prosperity<br className="breakForMobile"></br>Plants</span>
                </div>
              </NavLink>
            </div>
          </div>
        </div>

        <div className="ChooseUsDiv">
          <WhyChooseUs />
        </div>

        <div className="plantGridDiv">
          <div className="plantGrid">
            <div className="plantGridTitle">
              <span>Latest Arrivals</span>
            </div>

            <div className="plantGridBottomDiv">
              <div className="plantGridContainer">
                {plantsData.slice(0, 6).map((plant) => (
                  <div className="plantCardContainer">
                    <Card className="plantCard">
                      <Card.Img
                        variant="top"
                        src={plant.images?.[0]}
                        className="plantCardImageContainer"
                      ></Card.Img>
                      <Card.Body className="plantCardBody">
                        <div className="plantCardTopDiv">
                          <span className="plantCardTitle">
                            {plant.plantName}
                          </span>
                        </div>

                        <div className="plantCardBottomDiv">
                          <div className="plantCardBottomLeftDiv">
                            <div className="plantDescriptionDiv">
                              {plant.plantSmallDescription}
                            </div>
                            <div className="plantPriceDiv">
                              {" "}
                              ₹{plant.plantPrice}
                            </div>
                          </div>

                          <div className="plantCardBottomRightDiv">
                            <img
                              src={expandIcon}
                              alt="expandIcon"
                              onClick={() => handleExpandClick(plant.Pno)}
                            />
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="frequentlyAskedQuestions">
          <Faq />
        </div>
      </div>

      <div className="footerDiv">
        <Footer />
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import './Plants.css';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import Footer from '../Footer/Footer';
import { useParams } from 'react-router-dom';
import expandIcon from '../images/ExpandIcon.svg';
import SearchBar from '../SearchBar/SearchBar';
import indoorImg from '../images/IndoorImage.svg';
import outdoorImg from '../images/OutdoorImage.svg';
import Airpurifier from '../images/Airpurifier.jpg';
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Redux/Slice/ProductSlice";
import prosperityImg from "../images/prosperity.jpg";
import floweringImg from "../images/flowering.jpg";
import Allplants from "../images/Allplants.jpg"


function Plants() {
  console.log(process.env.REACT_APP_BASE_URL)
  const [loading, setLoading] = useState(true);
  const { plantsCategoryParams } = useParams();
  const [plantName, setPlantName] = useState('');
  const [plantCategory, setPlantCategory] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');
  const [plantsData, setPlantsData] = useState([]);
  const [sortCriteria, setSortCriteria] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const plantsPerPage = 9;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const handleExpandClick = (plantId) => {
    navigate(`/product/${plantId}`);
  };

  const sendDataToParent = (plantName) => {
    setPlantName(plantName);
  }

  useEffect(() => {
    const getPlantsByCategory = async () => {
      setLoading(true);
      if (plantsCategoryParams !== 'All') {
        try {
          const response = await fetch(`${process.env.REACT_APP_BASE_URL}/getproduct?category=${plantsCategoryParams}+Plant`);
          const data = await response.json();
          setPlantsData(data);
        } catch (e) {
          console.log(e);
        }
      } else {
        try {
          const response = await fetch(`${process.env.REACT_APP_BASE_URL}/getproduct`);
          const data = await response.json();
          setPlantsData(data);
        } catch (e) {
          console.log(e);
        }
      }
      setLoading(false);
    };


    getPlantsByCategory();

    switch (plantsCategoryParams) {
      case 'Indoor':
        setPlantCategory('Indoor');
        setBackgroundImage(indoorImg);
        break;
      case 'Outdoor':
        setPlantCategory('Outdoor');
        setBackgroundImage(outdoorImg);
        break;
      case 'Flowering':
        setPlantCategory('Flowering');
        setBackgroundImage(floweringImg);
        break;
      case 'Prosperity':
        setPlantCategory('Prosperity');
        setBackgroundImage(prosperityImg);
        break;
      case 'AirPurifier':
        setPlantCategory('AirPurifier');
        setBackgroundImage(Allplants);
        break;
      default:
        setPlantCategory('All');
        setBackgroundImage(Allplants);
    }
  }, [plantsCategoryParams, plantName]);

  // Sort functionality
  const handleSort = (criteria) => {
    setSortCriteria(criteria);
  };

  const sortPlants = (plants) => {
    if (!sortCriteria) return plants;
    return [...plants].sort((a, b) => {
      if (sortCriteria === 'price') {
        return a.plantPrice - b.plantPrice;
      } else if (sortCriteria === 'name') {
        return a.plantName.localeCompare(b.plantName);
      }
      return 0;
    });
  };

  // Pagination Logic
  const indexOfLastPlant = currentPage * plantsPerPage;
  const indexOfFirstPlant = indexOfLastPlant - plantsPerPage;
  const currentPlants = sortPlants(plantsData).slice(indexOfFirstPlant, indexOfLastPlant);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="plantsContainer">
      <div className="plantsTopDiv" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <Navbar />
        <div className="plantsFlexDiv">
          <div className="plantsContentContainer">
            <div className="plantsContentDiv">
              <div className="plantsTitleDiv">
                <span>
                  choose <br />
                  <span className="plantsTitleType2">{plantCategory} Plants</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="plantsMiddleDiv">
        <div className="plantsMiddleTopDiv">
          <SearchBar sendDataToParent={sendDataToParent} onSort={handleSort} />
        </div>

        <div className="plantsDisplayContainer">
          <div className="PlantsGridDisplayContainer">
            {loading ? (
              Array.from({ length: 3 }).map((_, idx) => (
                <div className="plantDiv" key={idx}>
                  <Card className="plantCard">
                    <Placeholder as="div" animation="glow" className="plantCardPlaceholderImage plantPlaceholder" />
                    <Card.Body className="plantCardBody">
                      <div className="plantTitle">
                        <Placeholder as="span" animation="glow">
                          <Placeholder xs={6} />
                        </Placeholder>
                      </div>
                      <div className="plantCardBottomDiv">
                        <div className="plantCardLeftDiv">
                          <div className="plantDescription">
                            <Placeholder as="span" animation="glow">
                              <Placeholder xs={12} />
                            </Placeholder>
                          </div>
                          <div className="plantPrice">
                            <Placeholder as="span" animation="glow">
                              <Placeholder xs={4} />
                            </Placeholder>
                          </div>
                        </div>
                        <div className="plantCardRightDiv">
                          <Placeholder as="img" animation="glow" src={expandIcon} alt="expandIcon" />
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))
            ) : (
              currentPlants
                .filter((plant) => plant.plantName.toLowerCase().includes(plantName.toLowerCase()))
                .map((plant) => (
                <div className="plantDiv" key={plant.pno}>
                  <Card className="plantCard">
                    <Card.Img
                      variant="top"
                      src={plant.images[0]}
                      style={{ height: '180px', width: '100%', objectFit: 'cover' }}
                      className="plantCardImage"
                    />
                    <Card.Body className="plantCardBody">
                      <div className="plantTitle">
                        <span>{plant.plantName}</span>
                      </div>
                      <div className="plantCardBottomDiv">
                        <div className="plantCardLeftDiv">
                          <div className="plantDescription">
                            <span>{plant.plantDescriptionForCard}</span>
                          </div>
                          <div className="plantPrice">
                            <span>₹ {plant.plantPrice}</span>
                          </div>
                        </div>
                        <div className="plantCardRightDiv">
                          <img src={expandIcon} alt="expandIcon" onClick={() => handleExpandClick(plant.Pno)} />
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="pagination ">
          {Array.from({ length: Math.ceil(plantsData.length / plantsPerPage) }, (_, i) => (
            <button key={i} onClick={() => paginate(i + 1)}>
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="plantsFooterDiv">
        <Footer />
      </div>
    </div>
  );
}

export default Plants;

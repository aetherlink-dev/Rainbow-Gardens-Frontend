import React from 'react';
import './WhyChooseUs.css';
import whyChooseUsImg from '../images/WhyChooseUsImg.svg';

export default function WhyChooseUs() {
  return (
    <div className='whyChooseUs'>
        <div className='whyChooseUsContainer'>
        <div className='whyChooseUsLeftContainer'>
          <div className='whyChooseUsTitleContainer'>
            <span>Why Choose Us?</span>
          </div>

          <div className='whyChooseUsContent'>
            <span>Expertise and Quality Assurance</span>
            <p>
            At Rainbow Gardens, our experienced horticulturists carefully cultivate and hand-pick plants to ensure exceptional quality and health. With years of expertise in plant care, we guarantee thriving plants that bring joy to your space.
            </p>
          </div>

          <div className='whyChooseUsContent'>
            <span>Unique and Diverse Plant Selection</span>
            <p>
            Rainbow Gardens boasts an extensive collection of rare, exotic, and popular plant varieties, catering to diverse tastes and needs. From indoor plants to outdoor gardens, succulents to flowering plants, our nursery has something adorable.
            </p>
          </div>

          <div className='whyChooseUsContent'>
            <span>Personalized Customer Service and Support</span>
            <p>
            Our dedicated team provides personalized guidance, expert advice, and after-sales support to ensure your plants flourish. Whether you're a seasoned gardener or a beginner, we're committed to helping you choose the perfect plants and providing ongoing care tips.
            </p>
          </div>
        </div>

        <div className='whyChooseUsRightContainer'>
          <div className='whyChooseUsImageContainer'>
            <img src={whyChooseUsImg} alt='whyChooseUsImg'/>
          </div>
        </div>
        </div>
    </div>
  )
}

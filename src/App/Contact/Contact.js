import React, { useEffect, useState } from 'react';
import './Contact.css';
import { NavLink } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import phoneImg from '../images/PhoneImg.svg';
import mailImg from '../images/MailImg.svg';
import locationImg from '../images/LocationImg.svg';
import igIcon from '../images/IgIcon.svg';
import Footer from '../Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../Redux/Slice/ContactSlice';
import Swal from 'sweetalert2';

export default function Contact() {
  
  const dispatch = useDispatch();
  const contactState = useSelector((state)=>state.contact);
  const [showModal,setShowModal]=useState(false);

  useEffect(()=>{
    if(contactState.addContactStatus === 201 && showModal){
      Swal.fire({
        title:'Thanks for contacting !',
        text:'We will get back to you soon',
        icon:'success'
      })
    }else if(showModal && contactState.addContactStatus !== 201){
      Swal.fire({
        title:'An error occured',
        text:'Please try again',
        icon:'error'
      })
    }
   
  },[contactState.addContactStatus,showModal])
  
  const [formData,setFormData]=useState({
    
    firstName:'',
    lastName:'',
    email:'',
    mobileNumber:'',
    message:''
  });

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData({
      ...formData,
      [name]:value
    });
  }

  const handleFormSubmit=async(e)=>{
    e.preventDefault();
    dispatch(addContact(formData)).then(()=>{
      setShowModal(true);
      setFormData({
        firstName:'',
        lastName:'',
        email:'',
        mobileNumber:'',
        message:''
      });

      setTimeout(()=>{
        setShowModal(false);
      },500)
    })

  }



  return (
    <div className='contact'>
      <div className='contactTopDiv'>
        <Navbar/>
        <div className='contactBottomDiv'>
            <div className='contactContainer'>
              <div className='contactLeftContainer'>
                <div className='contactLeftHeaderDiv'>
                  <span>Contact Information</span>
                  <span>Say something and we will get back to you!</span>
                </div>

                <div className='contactLeftMiddleDiv'>
                  <div className='contactLeftContent'>
                    <img src={phoneImg} alt='phoneImg'/>
                    <span>7012351551</span>
                  </div>

                  <div className='contactLeftContent'>
                    <img src={mailImg} alt='phoneImg'/>
                    <span>purakkat.rainbowgardens@gmail.com</span>
                  </div>

                  <div className='contactLeftContent'>
                    <img src={locationImg} alt='phoneImg'/>
                    <span> Kumbalam South Junction 
                           <br />
                            Ernakulam, Kerala 
                            <br />
                            682506
                    </span>
                  </div>
                </div>

                <div className='contactLeftIconDiv'>
                    <img src={igIcon} alt='igIcon'/>
                    {/* <img src={discordIcon} alt='discordIcon'/>
                    <img src={discordIcon} alt='discordIcon'/> */}
                </div>
              </div>

              <div className='contactRightContainer'>
                <form className='contactForm' onSubmit={handleFormSubmit}>
                  <div className='contactFormDiv'>
                    <div className='contactFormContent'>
                      <span>First Name</span>
                      <input type='text' placeholder='Enter your first name' name='firstName' value={formData.firstName} onChange={handleChange}/>
                    </div>

                    <div className='contactFormContent'>
                      <span>Last Name</span>
                      <input type='text' placeholder='Enter your last name' name='lastName' value={formData.lastName} onChange={handleChange}/>
                    </div>
                  </div>

                  <div className='contactFormDiv'>
                    <div className='contactFormContent'>
                      <span>Email Address</span>
                      <input type='email' placeholder='Enter your email address' name='email' value={formData.email} onChange={handleChange}/>
                    </div>

                    <div className='contactFormContent'>
                      <span>Mobile Number</span>
                      <input type='text' placeholder='Enter your mobile number' name='mobileNumber' value={formData.mobileNumber} onChange={handleChange}/>
                    </div>
                  </div>

                  <div className='contactMessageDiv'>
                    <span>Message to us!</span>
                    <textarea type='text' placeholder='Enter your message' name='message' value={formData.message} onChange={handleChange}/>
                  </div>

                  <div className='contactButtonContainer'>
                    <NavLink to="/thankyou">
                    <button className="contactButton">Send Message</button>
                    </NavLink>
                  </div>
                </form>
              </div>
            </div>
        </div>
      </div>
      <div className='contactFooterContainer'>
      <Footer/>
      </div>
      
    </div>
  )
}

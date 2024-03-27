import React, { useState } from 'react';
import { FcDatabase } from "react-icons/fc";
import Modal from '../Modal/Modal';
import './HeadImageStyle.css';

const HeadImage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedData, setSavedData] = useState([]);

  const openModal = async () => {
    try {
      // fetching database data from the server
      const response = await fetch('/saved-data');
      if (response.ok) {
        const data = await response.json();
        setSavedData(data);
        setIsModalOpen(true);
      } else {
        throw new Error('Failed to fetch saved data');
      }
    } catch (error) {
      console.error('Error fetching saved data:', error);
    }
  };
  

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="HeadImage">
      <div className="logo">
        <h2 style={{ marginTop: '10px' }}>Project UAV Threat Detector</h2>
      </div>
      <div className="HeadImage-icons">
        <FcDatabase
          className="icon"
          style={{ fontSize: '40px', marginTop: '10px' }}
          onClick={openModal}
        />
      </div>
      {isModalOpen && <Modal closeModal={closeModal} savedData={savedData} />}
    </div>
  );
};

export default HeadImage;
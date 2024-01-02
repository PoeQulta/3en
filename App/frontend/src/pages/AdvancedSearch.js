import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const CarSearchModal = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    model: '',
    color: '',
    car_type: '',
    year_made: '',
    rate: '',
    office_id: ''
  });

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setFilters({
      model__contains: '',
      color: '',
      car_type: '',
      year_made__gt: '',
      year_made__lt: '',
      rate__gt: '',
      rate__lt: '',
      office__city: ''
    });
  };

  const handleInputChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e,setData) => {
    e.preventDefault();
    axios.get("http://127.0.0.1:8000/api/cars/search/",{ params: filters }).then
    ( response => 
      {
        setData(cardata => ([...response.data]));
      }

    )
    handleCloseModal();
  };

  return (
    <div>
      <button className="search-button" onClick={() => setIsOpen(true)}>Advanced Search</button>
      <Modal
        isOpen={isOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Car Search"
      >
        <h2>Car Search</h2>
        <form onSubmit={(e) => {handleSubmit(e,props.setCar)}}>
          <input name="model__contains" onChange={handleInputChange} placeholder="Model" />
          <input name="color" onChange={handleInputChange} placeholder="Color" />
          <input name="car_type" onChange={handleInputChange} placeholder="Car Type" />
          <input name="year_made" onChange={handleInputChange} placeholder="Year Made" />
          <input name="rate" onChange={handleInputChange} placeholder="Rate" />
          <input name="year_made__gt" onChange={handleInputChange} placeholder="Year Made (Greater Than)" />
          <input name="year_made__lt" onChange={handleInputChange} placeholder="Year Made (Less Than)" />
          <input name="rate__gt" onChange={handleInputChange} placeholder="Rate (Greater Than)" />
          <input name="rate__lt" onChange={handleInputChange} placeholder="Rate (Less Than)" />
          <input name="office__city" onChange={handleInputChange} placeholder="Office City" />
          <button type="submit">Search</button>
        </form>
      </Modal>
    </div>
  );
};

export default CarSearchModal;
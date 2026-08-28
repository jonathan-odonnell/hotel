import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import Banner from "../components/Banner";

const AddRoom = () => {
    let navigate = useNavigate();
    let [error, setError] = useState(null);
  // types
  let types = ["single", "double", "family", "presidential"]
  types = types.map((item, index) => (
    <option key={index} value={item}>
      {item}
    </option>
  ));
  //guests
  let guests = [...Array(10).keys()].map(i => i + 1);
  guests = guests.map((item, index) => (
    <option key={index} value={item}>
      {item}
    </option>
  ));
  //extras
  let extras = [
    "Plush pillows and breathable bed linens",
    "Soft, oversized bath towels",
    "Full-sized, pH-balanced toiletries",
    "Complimentary refreshments",
    "Adequate safety/security",
    "Internet",
    "Comfortable beds"]
  extras = extras.map((item, index) => (
    <option key={index} value={item}>
      {item}
    </option>
  ));
  let handleForm = async (e) => {
    try {
        e.preventDefault()
        formData = new FormData(e.target)
        let data = Object.fromEntries(formData.entries());
        data.extras = formData.getAll("extras");
        data.breakfast = formData.get("breakfast") === "on";
        data.pets = formData.get("pets") === "on";
        data.featured = formData.get("featured")
        let response = await axios.post("/api/rooms", data);
        setRooms(prev => [...prev, response.data]);
        navigate('/rooms');
    } catch (err) {
        setError(err.message);
    }
  }
  return (
    <>
        <Hero hero="add-room-hero">
        <Banner title="add room">
          <Link to="/rooms" className="btn-primary">
            return to rooms
          </Link>
        </Banner>
      </Hero>
      {error && <div className="error"><p>{error}</p></div>}
      <form className="room-form" onSubmit={handleForm}>
        {/* name */}
        <div className="form-group">
          <label htmlFor="name">room name</label>
          <input 
            type="text"
            name="name"
            id="type"
            className="form-control"
            required
          >
          </input>
        </div>
        {/* end name */}
        {/* types */}
        <div className="form-group">
          <label htmlFor="type">room type</label>
          <select
            name="type"
            id="type"
            className="form-control"
            required
          >
            {types}
          </select>
        </div>
        {/* end types */}
        {/* price */}
        <div className="form-group">
          <label htmlFor="price">room price £</label>
          <input 
            type="number"
            name="price"
            id="price"
            className="form-control"
            min="100"
            max="1000"
            required
          />
        </div>
        {/* end price */}
        {/* size */}
        <div className="form-group">
          <label htmlFor="size">room size Sqft</label>
          <input 
            type="number"
            name="size"
            id="size"
            className="form-control"
            min="200"
            max="1000"
            required
          />
        </div>
        {/* end price */}
        {/* guests  */}
        <div className="form-group">
          <label htmlFor="capacity">guests</label>
          <select
            name="capacity"
            id="capacity"
            className="form-control"
            required
          >
            {guests}
          </select>
        </div>
        {/* end of guests */}
        {/* pets */}
        <div className="form-group single-extra">
          <label htmlFor="pets">pets</label>
          <input
            type="checkbox"
            name="pets"
            id="pets"
          />
        </div>
        {/* end pets */}
        {/* breakfast */}
        <div className="form-group single-extra">
          <label htmlFor="breakfast">breakfast</label>
          <input
            type="checkbox"
            name="breakfast"
            id="breakfast"
          />
        </div>
        {/* end breakfast */}
        {/* featured */}
        <div className="form-group single-extra">
          <label htmlFor="featured">featured room</label>
          <input
            type="checkbox"
            name="featured"
            id="featured"
          />
        </div>
        {/* end featured */}
        {/* description */}
        <div className="form-group">
          <label htmlFor="description">description</label>
          <textarea 
            name="description"
            id="description"
            required
          />
        {/* end description */}
        {/* extras  */}
        <div className="form-group">
          <label htmlFor="capacity">extras</label>
          <select
            name="extras"
            id="extras"
            className="form-control"
            multiple
            required
          >
            {extras}
          </select>
        </div>
        {/* end of extras */}
        {/* image */}
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            name="image"
            id="image" 
            accept="image/*"
          />
        </div>
      </div>
        {/* image */}
        {/* button */}
      <div className="form-group btn-center">
        <button className="btn-primary" type="submit">
            add room
        </button>
        </div>
      </form>
    </>

    )
};

export default AddRoom;
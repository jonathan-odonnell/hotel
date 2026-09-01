import { useContext } from "react";
import { RoomContext } from "../context";
import Title from "./Title";
// Get all unique values
const getUnique = (items, value) => {
  return [...new Set(items.map(item => item[value]))].sort((a, b) => {
    return a - b;
  });
};

export default function RoomsFilter ({ rooms }) {
  // Gets handle and sort data from context
  const context = useContext(RoomContext);
  const {
    handleChange,
    type,
    capacity,
    price,
    minPrice,
    maxPrice,
    minSize,
    maxSize,
    breakfast,
    pets,
    sort,
  } = context;

  // Sort options
  let sorts = {
    "default": "all",
    "name a-z": "name_asc",
    "name z-a": "name_desc",
    "price low-high": "price_asc",
    "price high-low": "price_desc",
  }
  sorts = Object.entries(sorts).map(([key, value]) => (
    <option key={key} value={value}>
      {key}
    </option>
  ));

  // Type optionss
  let types = getUnique(rooms, "type");
  types = ["all", ...types];
  types = types.map((item, index) => (
    <option key={index} value={item}>
      {item}
    </option>
  ));

  // Capacity options
  let people = getUnique(rooms, "capacity");
  people = people.map((item, index) => (
    <option key={index} value={item}>
      {item}
    </option>
  ));
  
  // Renders sort and filters form
  return (
    <section className="filter-container">
      <Title title="search rooms" />
      <form className="filter-form">
        {/* Sort */}
        <div className="form-group">
          <label htmlFor="sort">sort</label>
          <select
            name="sort"
            id="sort"
            onChange={handleChange}
            className="form-control"
            value={sort}
          >
            {sorts}
          </select>
        </div>
        {/* End of sort */}
        {/* Type */}
        <div className="form-group">
          <label htmlFor="type">room type</label>
          <select
            name="type"
            id="type"
            onChange={handleChange}
            className="form-control"
            value={type}
          >
            {types}
          </select>
        </div>
        {/* End of type */}
        {/* Guests  */}
        <div className="form-group">
          <label htmlFor="capacity">Guests</label>
          <select
            name="capacity"
            id="capacity"
            onChange={handleChange}
            className="form-control"
            value={capacity}
          >
            {people}
          </select>
        </div>
        {/* End of guests */}
        {/* Price */}
        <div className="form-group">
          <label htmlFor="price">room price £{price}</label>
          <input
            type="range"
            name="price"
            min={minPrice}
            max={maxPrice}
            id="price"
            value={price}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        {/* End of price */}
        {/* Size */}
        <div className="form-group">
          <label htmlFor="minSize">room size </label>
          <div className="size-inputs">
            <input
              type="number"
              name="minSize"
              value={minSize}
              onChange={handleChange}
              className="size-input"
            />
            <input
              type="number"
              name="maxSize"
              value={maxSize}
              onChange={handleChange}
              className="size-input"
            />
          </div>
        </div>
        {/* End of size */}
        <div className="form-group">
          {/* Breakfast */}
          <div className="single-extra">
            <input
              type="checkbox"
              name="breakfast"
              id="breakfast"
              checked={breakfast}
              onChange={handleChange}
            />
            <label htmlFor="breakfast">breakfast</label>
          </div>
          {/* End of breakfast */}
          {/* Pets */}
          <div className="single-extra">
            <input
              type="checkbox"
              name="pets"
              checked={pets}
              onChange={handleChange}
            />
            <label htmlFor="breakfast">pets</label>
          </div>
          {/* End of breakfast */}
        </div>
      </form>
    </section>
  );
};
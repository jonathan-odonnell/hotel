import React from "react";
import PropTypes from "prop-types";
import { Link, } from "react-router-dom";
import { Images } from "./Images";

export default function Room({ room }) {
    const { name, slug, images, price } = room;
    const image = Images[images?.[0]] || Images["room-1.jpeg"]
    return (
      <article className="room">
        <div className="img-container">
          <img src={image} alt="single room" />
          <div className="price-top">
            <h6>${price}</h6>
            <p>per night</p>
          </div>
          <Link to={`/rooms/${slug}`} className="btn-primary room-link">
            features
          </Link>
        </div>
        <p className="room-info">{name}</p>
      </article>
    );
  };
  Room.propTypes = {
    room: PropTypes.shape({
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      images: PropTypes.arrayOf(PropTypes.string).isRequired,
      price: PropTypes.number.isRequired
    })
  };
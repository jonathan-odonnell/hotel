import React from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaPenSquare, FaTrash } from "react-icons/fa"
import StyledHero from "../components/StyledHero";
import Banner from "../components/Banner";
import { RoomContext } from "../context";

export default function SingleRoom () {
  const { getRoom, deleteRoom, error, updateError } = React.useContext(RoomContext);
  const navigate = useNavigate();
  const { slug } = useParams();
  const room = getRoom(slug);

  if (!room) {
    return (
      <div className="error">
        <h3> no such room could be found...</h3>
        <Link to="/rooms" className="btn-primary">
          back to rooms
        </Link>
      </div>
      );
  }
      
  const {
      id,
      name,
      description,
      capacity,
      size,
      price,
      extras,
      breakfast,
      pets,
      images
  } = room;

  const baseUrl = "https://res.cloudinary.com/dpqj015da/image/upload/v1788092352/beach-resort/"

  const defaultImg = "room-1.jpg"

  const mainImg = `${baseUrl + images[0]}` || `${baseUrl + defaultImg}`
  
  const gallery = images.slice(1).map(img => `${baseUrl + img}`) || `${baseUrl + defaultImg}`
 
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/rooms/${id}`);
      deleteRoom(id)
      updateError(null)
      navigate('/rooms')
    } catch (err) {
      updateError(err.response?.data?.error || err.message);
    }
  }

  return(
      <>
      <StyledHero img={mainImg}>
        <Banner title={`${name} room`}>
          <Link to="/rooms" className="btn-primary">
            back to rooms
          </Link>
        </Banner>
      </StyledHero>
      <section className="single-room">
        <div className="single-room-images">
          {gallery.map((src, index) => (
            <img key={index} src={src} alt={name} />
          ))}
        </div>
        <div className={error ? "single-room-btns error" : "single-room-btns"}>
          {error && <div>
            <p>{error}</p>
            </div>}
          <div>
            <Link to={`/rooms/${slug}/update`}>
              <span aria-label={`edit ${name} room`}>
                <FaPenSquare/>
              </span>
            </Link>
            <button onClick={handleDelete} aria-label={`delete ${name} room`}>
            <span>
              <FaTrash />
            </span> 
            </button>
          </div>
        </div>
        <div className="single-room-info">
          <article className="desc">
            <h3>details</h3>
            <p>{description}</p>
          </article>
          <article className="info">
            <h3>info</h3>
            <h6>price : £{price}</h6>
            <h6>size : {size} SQFT</h6>
            <h6>
              max capacity :
              {capacity > 1 ? `${capacity} people` : `${capacity} person`}
            </h6>
            <h6>{pets ? "pets allowed" : "no pets allowed"}</h6>
            <h6>{breakfast && "free breakfast included"}</h6>
          </article>
        </div>
      </section>
      <section className="room-extras">
        <h6>extras </h6>
        <ul className="extras">
          {extras.map((item, index) => (
            <li key={index}>- {item}</li>
          ))}
        </ul>
      </section>
    </>
    );
  };
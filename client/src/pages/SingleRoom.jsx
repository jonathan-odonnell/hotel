import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import StyledHero from "../components/StyledHero";
import Banner from "../components/Banner";
import { RoomContext } from "../context";
import { Images } from "../components/Images";
import defaultImg from "../images/defaultBcg.jpeg";

export default function SingleRoom () {
  const { getRoom, deleteRoom } = React.useContext(RoomContext);
  const navigate = useNavigate();
  const { slug } = useParams();
  const room = getRoom(slug);
  const [error, setError] = useState(null)

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

  const mainImg = Images[images?.[0]] || defaultImg;
  const gallery = images.slice(1).map(img => Images[img]) || defaultImg;
 
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/rooms/${id}`);
      deleteRoom(id)
      navigate('/rooms')
    } catch (err) {
      setError(err)
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
        <div className="single-room-info">
          <article className="desc">
            <h3>details</h3>
            <p>{description}</p>
          </article>
          <article className="info">
            <h3>info</h3>
            <h6>price : ${price}</h6>
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
    </>)
  }
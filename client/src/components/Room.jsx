import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Room({ room }) {
    const { name, slug, images, price } = room;

    const baseUrl = "https://res.cloudinary.com/dpqj015da/image/upload/v1788092352/beach-resort/"

    const image = `${baseUrl + images[0]}` || `${baseUrl + "defaultBcg_l0nmsz.jpg"}`

    return (
      <article className="room">
        <div className="img-container">
          <img src={image} alt="single room" />
          <div className="price-top">
            <h6>£{price}</h6>
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
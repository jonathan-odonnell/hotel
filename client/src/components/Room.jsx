import { Link } from "react-router-dom";

export default function Room ({ room, cloudinaryUrl }) {
  // Handles room, cloudinary URL and images
  const { name, slug, main_image, price } = room;

  const image = `${cloudinaryUrl + main_image}` || `${cloudinaryUrl + "defaultBcg_l0nmsz.jpg"}`

  // Renders card for each room
  return (
    <article className="room">
      <div className="img-container">
        <img src={image} alt="single room" />
        <div className="price-top">
          <h3>£{price}</h3>
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
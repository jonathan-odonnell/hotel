import { Link } from "react-router-dom";

export default function Room ({ room, cloudName }) {
  // Handles room, cloud name and images
  const { name, slug, main_image, price } = room;

  const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload/v1788092352/beach-resort/`

  const image = `${baseUrl + main_image}` || `${baseUrl + "defaultBcg_l0nmsz.jpg"}`

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
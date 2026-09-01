import React from "react";
import { RoomContext } from "../context";
import { Link, useParams } from "react-router-dom";
import Banner from "../components/Banner";
import StyledHero from "../components/StyledHero";
import RoomForm from "../components/RoomForm";
import RoomFormError from "../components/RoomFormError";


export default function UpdateRoom () {
  const { getRoom, error } = React.useContext(RoomContext);
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

  const baseUrl = "https://res.cloudinary.com/dpqj015da/image/upload/v1788092352/beach-resort/"

  const mainImg = `${baseUrl + room.main_image}` || `${baseUrl + "defaultBcg.jpg"}`

  return (
    <>
      <StyledHero img={mainImg}>
        <Banner title="update room">
          <Link to={`/rooms/${slug}`} className="btn-primary">
            return to room
          </Link>
        </Banner>
      </StyledHero>
      {error && <RoomFormError error={error}/>}
      <RoomForm room={room} />
    </>
  );
};
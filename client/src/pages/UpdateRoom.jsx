import React from "react";
import { RoomContext } from "../context";
import { Link, useParams } from "react-router-dom";
import Banner from "../components/Banner";
import StyledHero from "../components/StyledHero";
import RoomForm from "../components/RoomForm";
import { Images } from "../components/Images";
import defaultImg from "../images/defaultBcg.jpeg";


const UpdateRoom = () => {
  const { getRoom } = React.useContext(RoomContext);
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
  const mainImg = Images[room.images?.[0]] || defaultImg;

  return (
    <>
      <StyledHero img={mainImg}>
        <Banner title="update room">
          <Link to="/rooms" className="btn-primary">
            return to rooms
          </Link>
        </Banner>
      </StyledHero>
      <RoomForm room={room} />
    </>
  )
};

export default UpdateRoom;
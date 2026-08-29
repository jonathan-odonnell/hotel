import React from "react";
import { Link } from "react-router-dom";
import { RoomContext } from "../context";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import RoomForm from "../components/RoomForm";

const AddRoom = () => {
  const { error } = React.useContext(RoomContext);
  return (
    <>
      <Hero hero="add-room-hero">
        <Banner title="add room">
          <Link to="/rooms" className="btn-primary">
            return to rooms
          </Link>
        </Banner>
      </Hero>
      <RoomFormError error={error}/>
      <RoomForm />
    </>
    )
};

export default AddRoom;
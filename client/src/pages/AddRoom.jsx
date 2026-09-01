import React from "react";
import { Link } from "react-router-dom";
import { RoomContext } from "../context";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import RoomForm from "../components/RoomForm";
import RoomFormError from "../components/RoomFormError";

export default function AddRoom () {
  // Gets any errors from context
  const { error } = React.useContext(RoomContext);
  // Renders AddRoom page components
  return (
    <>
      <Hero hero="add-room-hero">
        <Banner title="add room">
          <Link to="/rooms" className="btn-primary">
            return to rooms
          </Link>
        </Banner>
      </Hero>
      {/* Renders errors if any */}
      {error && <RoomFormError error={error}/>}
      <RoomForm />
    </>
    );
};
import React from "react";
import { Link } from "react-router-dom";
import { RoomContext } from "../context";
import { FaPlus } from "react-icons/fa"
import Loading from "./Loading";
import RoomsFilter from "./RoomsFilter";
import RoomsList from "./RoomsList";

export default function RoomContainer () {
  // Gets loading cloud name and rooms data from context
  const { loading, cloudName, sortedRooms, rooms } = React.useContext(RoomContext);
  // Renders loading component
  if (loading) {
    return <Loading />;
  }
  // Renders rooms filter and rooms list
  return (
    <>
      <RoomsFilter rooms={rooms} />
      <div className="add-room">
        <Link to={`/rooms/add`}>
          <span aria-label="add room">
            <FaPlus/>
          </span>
        </Link>
      </div>
      <RoomsList rooms={sortedRooms} cloudName={cloudName} />
    </>
  );
};
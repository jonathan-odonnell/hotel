import React from "react";
import { Link } from "react-router-dom";
import { RoomContext } from "../context";
import { FaPlus } from "react-icons/fa"
import Loading from "./Loading";
import RoomsFilter from "./RoomsFilter";
import RoomsList from "./RoomsList";

export default function RoomContainer () {
  const { loading, sortedRooms, rooms } = React.useContext(RoomContext);
  if (loading) {
    return <Loading />;
  }
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
      <RoomsList rooms={sortedRooms} />
    </>
  );
};
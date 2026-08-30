import React from "react";
import { RoomContext } from "../context";
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
      <RoomsList rooms={sortedRooms} />
    </>
  );
};
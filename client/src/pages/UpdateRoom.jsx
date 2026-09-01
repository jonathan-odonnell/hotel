import React from "react";
import { RoomContext } from "../context";
import { Link, Navigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import Banner from "../components/Banner";
import StyledHero from "../components/StyledHero";
import RoomForm from "../components/RoomForm";
import RoomFormError from "../components/RoomFormError";


export default function UpdateRoom () {
  // Gets loading, cloud name and error data and getRoom function from context
  const { getRoom, loading, cloudName, error } = React.useContext(RoomContext);
  // Gets slug from parameters
  const { slug } = useParams();
  const room = getRoom(slug);

  // Renders loading component
  if (loading) {
    return <Loading />;
  }
  
  // Redirects to error page if no room
  if (!loading && !room) {
    return (
      <Navigate to="/error" replace/>
    );
  }

  // Handles images
  const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload/v1788092352/beach-resort/`
  
  const mainImg = `${baseUrl + room.main_image}` || `${baseUrl + "defaultBcg.jpg"}`

  // Renders updateRoom page components
  return (
    <>
      <StyledHero img={mainImg}>
        <Banner title="update room">
          <Link to={`/rooms/${slug}`} className="btn-primary">
            return to room
          </Link>
        </Banner>
      </StyledHero>
      {/* Renders errors if any */}
      {error && <RoomFormError error={error}/>}
      <RoomForm room={room} />
    </>
  );
};
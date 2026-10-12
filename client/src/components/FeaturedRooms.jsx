import React from "react";
import { RoomContext } from "../context";
import Loading from "./Loading";
import Room from "./Room";
import Title from "./Title";

export default function FeaturedRooms () {
    // Gets loading, cloudinary URL and featured rooms from context and renders room component for each room
    let { loading, cloudinaryUrl, featuredRooms:rooms } = React.useContext(RoomContext);
    rooms = rooms.map(room => {
        return <Room key={room.id} room={room} cloudinaryUrl={cloudinaryUrl}/>
    });
    return(
        <section className="featured-rooms">
            <Title title="featured rooms"/>
            <div className="featured-rooms-center">
                {loading?<Loading />:rooms}
            </div>
        </section>
    );
};
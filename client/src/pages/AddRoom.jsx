import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import RoomForm from "../components/RoomForm";

const AddRoom = () => {
  return (
    <>
        <Hero hero="add-room-hero">
        <Banner title="add room">
          <Link to="/rooms" className="btn-primary">
            return to rooms
          </Link>
        </Banner>
      </Hero>
      <RoomForm />
    </>
    )
};

export default AddRoom;
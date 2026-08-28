import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Banner from "../components/Banner";

const AddRoom = () => {
  return (
        <Hero hero="add-room-hero">
        <Banner title="add room">
          <Link to="/rooms" className="btn-primary">
            return to rooms
          </Link>
        </Banner>
      </Hero>
    )
};

export default AddRoom;
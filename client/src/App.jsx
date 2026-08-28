import "./App.css";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import SingleRoom from "./pages/SingleRoom";
import AddRoom from "./pages/AddRoom"
import Error from "./pages/Error";
import UpdateRoom from "./pages/UpdateRoom";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/:slug" element={<SingleRoom />} />
        <Route path="/rooms/add" element={<AddRoom />} />
        <Route path="/rooms/:slug/update" element={<UpdateRoom />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
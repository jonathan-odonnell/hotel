import React, { useState, useEffect } from "react";
import { RoomContext } from "../context";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function RoomForm ({ room }) {
    // Gets room functions from context
    const navigate = useNavigate();
    const { addRoom, updateRoom, updateError } = React.useContext(RoomContext);
    // Sets form data initial state
    const [formData, setFormData] = useState({
        name: room?.name || "",
        type: room?.type || "single",
        price: room?.price || "",
        size: room?.size || "",
        capacity: room?.capacity || 1,
        pets: room?.pets || false,
        breakfast: room?.breakfast || false,
        featured: room?.featured || false,
        description: room?.description || "",
        extras: room?.extras || [],
    });
    // Update state when room loads
    useEffect(() => {
        if (room) {
            setFormData({
                name: room.name || "",
                type: room.type || "single",
                price: room.price || "",
                size: room.size || "",
                capacity: room.capacity || 1,
                pets: room.pets || false,
                breakfast: room.breakfast || false,
                featured: room.featured || false,
                description: room.description || "",
                extras: room.extras || [],
            });
        }
    }, [room]);
    // Handle types
    let typesOptions = ["single", "double", "family", "presidential"]
    typesOptions = typesOptions.map((item, index) => (
        <option key={index} value={item}>
        {item}
        </option>
    ));
    // Handle capacity
    let capacityOptions = [...Array(10).keys()].map(i => i + 1);
    capacityOptions = capacityOptions.map((item, index) => (
        <option key={index} value={item}>
        {item}
        </option>
    ));
    // Handle extras
    let extrasOptions = [
        "Plush pillows and breathable bed linens",
        "Soft, oversized bath towels",
        "Full-sized, pH-balanced toiletries",
        "Complimentary refreshments",
        "Adequate safety/security",
        "Internet",
        "Comfortable beds"]
    extrasOptions = extrasOptions.map((item, index) => (
        <option key={index} value={item}>
        {item}
        </option>
    ));
    // Handle change of inputs 
    const handleChange = (e) => {
        const { name, value, type, checked, options } = e.target;
        if (type === "select-multiple") {
            const selected = Array.from(options).filter(o => o.selected).map(o => o.value);
            setFormData(prev => ({ ...prev, [name]: selected }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === "checkbox" ? checked : value
            }));
        }
    }; 
    // Handle form submit
    let handleSubmit = async (e) => {
        try {
            // Update form values
            e.preventDefault();
            const { breakfast, pets, featured, extras } = formData;
            let rawFormData = new FormData(e.target);
            rawFormData.set("breakfast", breakfast);
            rawFormData.set("pets", pets);
            rawFormData.set("featured", featured);
            rawFormData.delete("extras");
            rawFormData.append("extras", JSON.stringify(extras));

            // Handle image file
            const imageFile = rawFormData.get("image");
            if (!imageFile || imageFile.size === 0) {
                rawFormData.delete("image");
            }

            if (room) {
                // Update room API call and response handling
                const response = await axios.put(`/api/rooms/${room.id}`, rawFormData);
                updateRoom(response.data.room);
                updateError(null);
                navigate(`/rooms/${response.data.room.slug}`);
            } else {
                // Add room API call and response handling
                const response = await axios.post("/api/rooms", rawFormData);
                addRoom(response.data.room);
                updateError(null);
                navigate('/rooms');
            }
        } catch (err) {
            // Catch errors 
            updateError(err.response?.data?.error || err.message);
        }
    }
    // Renders room form
    return (
        <form className="room-form" encType="multipart/form-data" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="form-group">
                <label htmlFor="name">room name</label>
                <input 
                type="text"
                name="name"
                id="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="off"
                />
            </div>
            {/* End of name */}
            {/* Types */}
            <div className="form-group">
                <label htmlFor="type">room type</label>
                <select
                name="type"
                id="type"
                className="form-control"
                value={formData.type}
                onChange={handleChange}
                required
                >
                {typesOptions}
                </select>
            </div>
            {/* End of types */}
            {/* Price */}
            <div className="form-group">
                <label htmlFor="price">room price £</label>
                <input 
                type="number"
                name="price"
                id="price"
                className="form-control"
                min="100"
                max="1000"
                value={formData.price}
                onChange={handleChange}
                required
                />
            </div>
            {/* End of price */}
            {/* Size */}
            <div className="form-group">
                <label htmlFor="size">room size Sqft</label>
                <input 
                type="number"
                name="size"
                id="size"
                className="form-control"
                min="200"
                max="1000"
                value={formData.size}
                onChange={handleChange}
                required
                />
            </div>
            {/* End of size */}
            {/* Guests */}
            <div className="form-group">
                <label htmlFor="capacity">guests</label>
                <select
                name="capacity"
                id="capacity"
                className="form-control"
                value={formData.capacity}
                onChange={handleChange}
                required
                >
                {capacityOptions}
                </select>
            </div>
            {/* End of guests */}
            {/* Pets */}
            <div className="form-group single-extra">
                <label htmlFor="pets">pets</label>
                <input
                type="checkbox"
                name="pets"
                id="pets"
                checked={formData.pets}
                onChange={handleChange}
                />
            </div>
            {/* End of pets */}
            {/* Breakfast */}
            <div className="form-group single-extra">
                <label htmlFor="breakfast">breakfast</label>
                <input
                type="checkbox"
                name="breakfast"
                id="breakfast"
                checked={formData.breakfast}
                onChange={handleChange}
                />
            </div>
            {/* End of breakfast */}
            {/* Featured */}
            <div className="form-group single-extra">
                <label htmlFor="featured">featured room</label>
                <input
                type="checkbox"
                name="featured"
                id="featured"
                checked={formData.featured}
                onChange={handleChange}
                />
            </div>
            {/* End of featured */}
            {/* Description */}
            <div className="form-group">
                <label htmlFor="description">description</label>
                <textarea 
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                required
                />
            </div>
            {/* End of description */}
            {/* Extras  */}
            <div className="form-group">
                <label htmlFor="extras">extras</label>
                <select
                name="extras"
                id="extras"
                className="form-control"
                value={formData.extras}
                onChange={handleChange}
                multiple
                required
                >
                {extrasOptions}
                </select>
            </div>
            {/* End of extras */}
            {/* Image */}
            <div className="form-group">
                <label htmlFor="image">Image</label>
                <input
                type="file"
                name="image"
                id="image" 
                accept="image/*"
                required={room ? false : true}
                />
                {room && <div className="current-img">
                    <small>Current image: {room.main_image}</small>
                </div>}
            </div>
            {/* End of image */}
            {/* Submit button with the appropriate text */}
            <div className="form-group btn-center">
                <button className="btn-primary" type="submit">
                    {room ? "update room" : "add room"}
                </button>
            </div>
            {/* End of submit button */}
        </form>
    );
};
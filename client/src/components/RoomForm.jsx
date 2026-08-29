import React, { useState } from "react";
import { RoomContext } from "../context";
import { useNavigate } from "react-router-dom";
import RoomFormError from "./RoomFormError";
import axios from "axios";


const RoomForm = ({ room }) => {
    const navigate = useNavigate();
    const { addRoom, updateRoom, error, updateError } = React.useContext(RoomContext);
    // room
    let {
        id =  "",
        name = "",
        type = "",
        price = "",
        size = "",
        capacity = "",
        pets = false,
        breakfast = false,
        featured = false,
        description = "",
        extras = [],
    } = room ?? {}
    // types
    let typesOptions = ["single", "double", "family", "presidential"]
    typesOptions = typesOptions.map((item, index) => (
        <option key={index} value={item}>
        {item}
        </option>
    ));
    // capacity
    let capacityOptions = [...Array(10).keys()].map(i => i + 1);
    capacityOptions = capacityOptions.map((item, index) => (
        <option key={index} value={item}>
        {item}
        </option>
    ));
    // extras
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
    let handleAddRoom = async (e) => {
        try {
            e.preventDefault()
            let formData = new FormData(e.target);
            formData.set("breakfast", formData.get("breakfast") === "on");
            formData.set("pets", formData.get("pets") === "on");
            formData.set("featured", formData.get("featured") === "on");
            formData.delete("extras");
            formData.append("extras", JSON.stringify(extras));

            const response = await axios.post("/api/rooms", formData, { 
                headers: { "Content-Type": "multipart/form-data" }
            });

            addRoom(response.data.room);
            updateError(null);
            navigate('/rooms');

        } catch (err) {
            updateError(err.message);
        }
    }
    let handleUpdateRoom = async (e) => {
        try {
            e.preventDefault()
            let formData = new FormData(e.target);
            formData.set("breakfast", formData.get("breakfast") === "on");
            formData.set("pets", formData.get("pets") === "on");
            formData.set("featured", formData.get("featured") === "on");
            formData.delete("extras");
            formData.append("extras", JSON.stringify(extras));

            const response = await axios.put(`/api/rooms/${id}`, formData, { 
                headers: { "Content-Type": "multipart/form-data" }
            });

            updateRoom(response.data.room);
            updateError(null);
            navigate(`/rooms/${response.data.room.slug}`);

        } catch (err) {
            updateError(err.message);
        }
    }
    return (
            <form className="room-form" onSubmit={room ? handleUpdateRoom : handleAddRoom}>
                {/* name */}
                <div className="form-group">
                    <label htmlFor="name">room name</label>
                    <input 
                    type="text"
                    name="name"
                    id="type"
                    className="form-control"
                    value={name}
                    required
                    >
                    </input>
                </div>
                {/* end name */}
                {/* types */}
                <div className="form-group">
                    <label htmlFor="type">room type</label>
                    <select
                    name="type"
                    id="type"
                    className="form-control"
                    value={type}
                    required
                    >
                    {typesOptions}
                    </select>
                </div>
                {/* end types */}
                {/* price */}
                <div className="form-group">
                    <label htmlFor="price">room price £</label>
                    <input 
                    type="number"
                    name="price"
                    id="price"
                    className="form-control"
                    min="100"
                    max="1000"
                    value={price}
                    required
                    />
                </div>
                {/* end price */}
                {/* size */}
                <div className="form-group">
                    <label htmlFor="size">room size Sqft</label>
                    <input 
                    type="number"
                    name="size"
                    id="size"
                    className="form-control"
                    min="200"
                    max="1000"
                    value={size}
                    required
                    />
                </div>
                {/* end price */}
                {/* guests  */}
                <div className="form-group">
                    <label htmlFor="capacity">guests</label>
                    <select
                    name="capacity"
                    id="capacity"
                    className="form-control"
                    value={capacity}
                    required
                    >
                    {capacityOptions}
                    </select>
                </div>
                {/* end of guests */}
                {/* pets */}
                <div className="form-group single-extra">
                    <label htmlFor="pets">pets</label>
                    <input
                    type="checkbox"
                    name="pets"
                    id="pets"
                    checked={pets}
                    />
                </div>
                {/* end pets */}
                {/* breakfast */}
                <div className="form-group single-extra">
                    <label htmlFor="breakfast">breakfast</label>
                    <input
                    type="checkbox"
                    name="breakfast"
                    id="breakfast"
                    checked={breakfast}
                    />
                </div>
                {/* end breakfast */}
                {/* featured */}
                <div className="form-group single-extra">
                    <label htmlFor="featured">featured room</label>
                    <input
                    type="checkbox"
                    name="featured"
                    id="featured"
                    checked={featured}
                    />
                </div>
                {/* end featured */}
                {/* description */}
                <div className="form-group">
                    <label htmlFor="description">description</label>
                    <textarea 
                    name="description"
                    id="description"
                    defaultValue={description}
                    required
                    />
                {/* end description */}
                {/* extras  */}
                <div className="form-group">
                    <label htmlFor="extras">extras</label>
                    <select
                    name="extras"
                    id="extras"
                    className="form-control"
                    value={extras}
                    multiple
                    required
                    >
                    {extrasOptions}
                    </select>
                </div>
                {/* end of extras */}
                {/* image */}
                <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input
                    type="file"
                    name="image"
                    id="image" 
                    accept="image/*"
                    required={room ? false : true}
                    />
                </div>
            </div>
            {/* image */}
            {/* button */}
            <div className="form-group btn-center">
                <button className="btn-primary" type="submit">
                    {room ? "update room" : "add room"}
                </button>
            </div>
        </form>
    )
};

export default RoomForm;
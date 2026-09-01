import React, { Component } from "react";
import axios from "axios"

const RoomContext = React.createContext();

class RoomProvider extends Component{
  // State initial values
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    sort: "all",
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false,
    error: null
  };
  async componentDidMount() {
    // Get rooms from API and set states
      try {
        let response = await axios.get('/api/rooms')
    
        let rooms = response.data.rooms;

        let featuredRooms = rooms.filter(room => room.featured === true);

        let maxPrice = Math.max(...rooms.map(item => item.price));

        let maxSize = Math.max(...rooms.map(item => item.size));
        
        this.setState({
          rooms,
          featuredRooms,
          sortedRooms: rooms,
          loading: false,
          price: maxPrice,
          maxPrice,
          maxSize,
          error: null,
        });
        // Catch errors
      } catch (err) {
        this.setState({
          error: err
        });
      };
    };
  
    // Get room
    getRoom = slug => this.state.rooms.find(
      r => r.slug === slug);
  
    // Add room
    addRoom = room => {
      this.setState(prev => ({
        rooms: [...prev.rooms, room],
        sortedRooms: [...prev.sortedRooms, room]
      }));
    };
  
    // Update room
    updateRoom = updatedRoom => {
      this.setState(prev => {
        const updatedRooms = prev.rooms.map(room =>
          room.id === updatedRoom.id ? updatedRoom : room
        );
        return {
          rooms: updatedRooms,
          sortedRooms: updatedRooms
        };
      });
    };
  
    // Delete room
    deleteRoom = id => {
      this.setState(prev => {
        const updatedRooms = prev.rooms.filter(room => room.id !== id);
        return {
          rooms: updatedRooms,
          sortedRooms: updatedRooms
        };
      });
    };

    // Update error
    updateError = value => {
      this.setState({
        error: value
      });
    };


    // Handles change of sort and filter inputs
    handleChange = event => {
      // Updates states
        const { name, type, checked, value } = event.target;
        this.setState(
          { 
            [name]: type === "checkbox" ? checked : value 
          },
          this.filterRooms
        );
      };

      // Filters rooms based on sort and filter states
      filterRooms = () => {
        let {
          rooms,
          type,
          capacity,
          price,
          minSize,
          maxSize,
          breakfast,
          pets,
          sort
        } = this.state;
    
        // Creates a copy of the rooms array
        let tempRooms = [...rooms];

        // Handles capacity and price values
        capacity = parseInt(capacity);
        price = parseInt(price);

        // Filter by type
        if (type !== "all") {
          tempRooms = tempRooms.filter(room => room.type === type);
        }

        // Filter by capacity
        if (capacity !== 1) {
          tempRooms = tempRooms.filter(room => room.capacity >= capacity);
        }
        
        // Filter by price
        tempRooms = tempRooms.filter(room => room.price <= price);
        
        // Filter by size
        tempRooms = tempRooms.filter(
          room => room.size >= minSize && room.size <= maxSize
        );
        
        // Filter by breakfast
        if (breakfast) {
          tempRooms = tempRooms.filter(room => room.breakfast === true);
        }
        
        // Filter by pets
        if (pets) {
          tempRooms = tempRooms.filter(room => room.pets === true);
        }

        // Sort based on price, name or id

        const sorters = {
          all: (a, b) => a.id - b.id,
          name_asc: (a, b) => a.name.localeCompare(b.name),
          name_desc: (a, b) => b.name.localeCompare(a.name),
          price_asc: (a, b) => a.price - b.price,
          price_desc: (a, b) => b.price - a.price
        };

        tempRooms.sort(sorters[sort]);

        // set sorted rooms 
        this.setState({
          sortedRooms: tempRooms
        });
      };
    render() {
        // Provides context values to components
        return(
            <RoomContext.Provider value={{
              rooms: this.state.rooms,
              sortedRooms: this.state.sortedRooms,
              featuredRooms: this.state.featuredRooms,
              loading: this.state.loading,
              type: this.state.type,
              capacity: this.state.capacity,
              price: this.state.price,
              minPrice: this.state.minPrice,
              maxPrice: this.state.maxPrice,
              minSize: this.state.minSize,
              maxSize: this.state.maxSize,
              breakfast: this.state.breakfast,
              pets: this.state.pets,
              sort: this.state.sort,
              error: this.state.error,
              getRoom: this.getRoom,
              addRoom: this.addRoom,
              updateRoom: this.updateRoom,
              deleteRoom: this.deleteRoom,
              updateError: this.updateError,
              handleChange: this.handleChange
              } }>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

export { RoomProvider, RoomContext };
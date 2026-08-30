import React, { Component } from "react";
import axios from "axios"

const RoomContext = React.createContext();

class RoomProvider extends Component{
  // state initial values
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
    // get rooms from api and set states
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
      } catch (err) {
        this.setState({
          error: err
        });
      };
    };
  
    // get room
    getRoom = slug => this.state.rooms.find(
      r => r.slug === slug);
  
    // add room
    addRoom = room => {
      this.setState(prev => ({
        rooms: [...prev.rooms, room]
      }));
    };
  
    // update room
    updateRoom = updatedRoom => {
      this.setState(prev => ({
        rooms: prev.rooms.map(room =>
          room.id === updatedRoom.id ? updatedRoom : room
        )
      }));
    };
  
    // delete room
    deleteRoom = id => {
      this.setState(
        prev => ({
          rooms: prev.rooms.filter(room => {
            return room.id !== id 
          })
        })
      );
    };

    // update error state
    updateError = value => {
      this.setState({
        error: value
      });
    };

    handleChange = event => {
      // handles change of filter inputs
        const { name, type, checked, value } = event.target;
        this.setState(
          { 
            [name]: type === "checkbox" ? checked : value 
          },
          this.filterRooms
        );
      };

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
    
        let tempRooms = [...rooms];

        // transform capacity and price values
        capacity = parseInt(capacity);
        price = parseInt(price);

        // filter by type
        if (type !== "all") {
          tempRooms = tempRooms.filter(room => room.type === type);
        }

        // filter by capacity
        if (capacity !== 1) {
          tempRooms = tempRooms.filter(room => room.capacity >= capacity);
        }
        
        // filter by price
        tempRooms = tempRooms.filter(room => room.price <= price);
        
        // filter by size
        tempRooms = tempRooms.filter(
          room => room.size >= minSize && room.size <= maxSize
        );
        
        // filter by breakfast
        if (breakfast) {
          tempRooms = tempRooms.filter(room => room.breakfast === true);
        }
        
        // filter by pets
        if (pets) {
          tempRooms = tempRooms.filter(room => room.pets === true);
        }

        // sort

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
              updateError: this.updateError,
              handleChange: this.handleChange
              } }>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

export { RoomProvider, RoomContext };
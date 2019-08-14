import React from "react";
import "./App.css"

const displayTrip = props => {

  const trips = props.trips;

  return props.tripId ? (
    <div className="App-trip">{trips.map(trip => {
      if(trip.id === props.tripId) {
        return (
          <div>
            <strong>{trip.name} </strong>
            <br/>
            {trip.description}
          </div>
        )
      }
    })}</div>
  ) : (
    <div></div>
  );
};

export default displayTrip;

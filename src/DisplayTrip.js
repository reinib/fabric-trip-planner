import React from "react";

const displayTrip = props => {
  console.log("props-tripId: " + props.tripId);
  console.log(props.trips);

  const trips = props.trips;

  return props.tripId ? (
    trips.filter(trip => {
      if (trip.id === props.tripId) {
        console.log(trip.name);
      }
    })
  ) : (
    <div>Hello World</div>
  );
};

export default displayTrip;

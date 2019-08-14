import { PersonaInitialsColor } from "office-ui-fabric-react";

const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
};

let yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

const yesterdaysDate = yesterday.toLocaleDateString("en-us".dateOptions);

export default class TripManager {
  constructor() {
    this._trips = [
      {
        id: 1,
        name: "Run with the bulls",
        location: "Spain",
        date: yesterdaysDate,
        completed: true,
        description: "Lorem ipsum dolor sit amet, vel vidisse partiendo no. Esse maluisset sit et, et his wisi omnesque. Sint equidem antiopam in vis, ullum quidam ei cum. Unum dicit recusabo ne cum, laboramus scripserit sed id..",
        personaProps: {
          text: "Carol Poland",
          secondaryText: `Created ${yesterdaysDate}`,
          initialsColor: PersonaInitialsColor.darkRed,
          imageUrl:
            "https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png"
        }
      },
      {
        id: 2,
        name: "Food trip",
        location: "Italy",
        date: yesterdaysDate,
        completed: true,
        description: "Lorem ipsum dolor sit amet, vel vidisse partiendo no. Esse maluisset sit et, et his wisi omnesque. Sint equidem antiopam in vis, ullum quidam ei cum. Unum dicit recusabo ne cum, laboramus scripserit sed id..",
        personaProps: {
          text: "Amanda Brady",
          secondaryText: `Created ${yesterdaysDate}`,
          initialsColor: PersonaInitialsColor.orange,
          imageUrl:
            "https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png"
        }
      },
      {
        id: 3,
        name: "Winter Snowboarding",
        location: "Japan",
        date: yesterdaysDate,
        completed: false,
        description: "Lorem ipsum dolor sit amet, vel vidisse partiendo no. Esse maluisset sit et, et his wisi omnesque. Sint equidem antiopam in vis, ullum quidam ei cum. Unum dicit recusabo ne cum, laboramus scripserit sed id..",
        personaProps: {
          text: "Miguel Garcia",
          secondaryText: `Created ${yesterdaysDate}`,
          initialsColor: PersonaInitialsColor.blue,
          imageUrl:
            "https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-male.png"
        }
      }
    ];
  }

  getTrips() {
    return this._trips;
  }

  getCompletedtripCount() {
    return this._trips.filter(trip => trip.completed).length;
  }

  getTripCount() {
    return this._trips.length;
  }

  getTripPercentComplete() {
    return this.getCompletedtripCount() / this.getTripCount();
  }

  addTrip(name, location, date, description) {
    let today = new Date();
    let todaysDate = today.toLocaleString("en-us", dateOptions);

    let tripDate = new Date(date).toLocaleString("en-us", dateOptions);

    if ((name, location, tripDate, description)) {
      const newTrip = {
        id: this._trips.length + 1,
        name: name,
        location: location,
        date: tripDate,
        completed: false,
        description: description,
        personaProps: {
          text: "Brent Reininger",
          secondaryText: `Created ${todaysDate}`,
          initialsColor: PersonaInitialsColor.blue
        }
      };
      this._trips = this._trips.concat(newTrip);
    }
  }

  toggleTripCompleted(tripId) {
    const updatedTrips = this._trips;

    updatedTrips.forEach((trip, index) => {
      let { id, completed } = trip;

      if (id === tripId) {
        updatedTrips[index].completed = !completed;
      }
    });
    this._trips = updatedTrips;
  }

  deleteTrip(tripId) {
    let updatedTrips = this._trips.slice();

    updatedTrips.forEach((trip, index) => {
      let { id } = trip;
      if (id === tripId) {
        updatedTrips.splice(index, 1);
      }
    });
    this._trips = updatedTrips;
  }
}

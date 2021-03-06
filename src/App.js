import React, { Component } from "react";
import {
  Fabric,
  TextField,
  PrimaryButton,
  Pivot,
  PivotItem,
  Checkbox,
  Persona,
  IconButton,
  PersonaSize,
  PersonaPresence,
  Dialog,
  DialogType,
  DialogFooter,
  DefaultButton,
  ProgressIndicator,
  Stack
} from "office-ui-fabric-react";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";

import TripManager from "./TripManager";
import DisplayTrip from "./DisplayTrip";
import "./App.css";

initializeIcons();

const examplePersona = {
  showSecondaryText: true,
  size: PersonaSize.size32,
  presence: PersonaPresence.online
};

class App extends Component {
  _TripManager = new TripManager();

  state = {
    tripTitle: "Your Trips",
    tripTitleValue: "",
    trips: this._TripManager._trips,
    nameValue: "",
    locationValue: "",
    dateValue: "",
    descriptionValue: "",
    hideDeleteDialog: true,
    tripToDisplay: null,
    tripToDelete: null
  };
  render() {
    return (
      <Fabric className="App">
        <div className="App-header">
          <div className="App-titleBlock">
            <span className="App-title">{this.state.tripTitle}</span>
            <div className="App-description">
             <div>{this._changeAppTitle()}</div> 
            </div>
          </div>
          {this._renderCreateTrip()}
          {/* {this._renderPivot()} */}
        </div>
        <Pivot className="App-pivot">
          <PivotItem
            headerText="All Trips"
            headerButtonProps={{
              "data-order": 1,
              "data-title": "My Files Title"
            }}
          >
            <div className="App-main">{this._renderTripList()}</div>
          </PivotItem>
          <PivotItem headerText="Completed" >
            <div className="App-main">{this._renderCompletedTripList()}</div>
          </PivotItem>
        </Pivot>
        <div className="App-footer">{this._renderProgress()}</div>
        {this._renderDeleteDialog()}
        <DisplayTrip
          trips={this.state.trips}
          tripId={this.state.tripToDisplay}
        />
      </Fabric>
    );
  }

  componentDidMount() {
    console.log(this.state.trips);
  }

  _changeAppTitle(){
    return (
      <TextField borderless 
        onChange={(event) => 
          this.setState({
            tripTitleValue: event.target.value
          })

         
        }
        onKeyDown={event => {
          if (event.key === "Enter") {
            this._addTripTitle();
            console.log("Trip value: " + this.state.tripTitleValue)
          }
        }}
        placeholder="Describe your list" 
        value={this.state.tripTitleValue}

      />
    )
  }

  _addTripTitle() {
    const title = this.state.tripTitleValue

    this.setState({
      tripTitle: title,
      tripTitleValue: ""
    });
  }

  _renderCreateTrip() {
    return (
      <div className="App-createTrip">
        <Stack>
          <TextField
            className="App-createTrip-field"
            onChange={event =>
              this.setState({
                nameValue: event.target.value
              })
            }
            onKeyDown={event => {
              if (event.key === "Enter") {
                this._addTrip();
              }
            }}
            placeholder="Trip Name"
            value={this.state.nameValue}
          />
          <TextField
            className="App-createTrip-field"
            onChange={event =>
              this.setState({
                locationValue: event.target.value
              })
            }
            onKeyDown={event => {
              if (event.key === "Enter") {
                this._addTrip();
              }
            }}
            placeholder="Location"
            value={this.state.locationValue}
          />
          <TextField
            type="date"
            className="App-createTrip-field"
            onChange={event =>
              this.setState({
                dateValue: event.target.value
              })
            }
            onKeyDown={event => {
              if (event.key === "Enter") {
                this._addTrip();
              }
            }}
            value={this.state.dateValue}
          />
        </Stack>
        <Stack>
          <TextField
            multiline rows={6}
            type="text"
            className="App-createTrip-field "
            onChange={event =>
              this.setState({
                descriptionValue: event.target.value
              })
            }
            onKeyDown={event => {
              if (event.key === "Enter") {
                this._addTrip();
              }
            }}
            placeholder="Description"
            value={this.state.descriptionValue}
          />
          </Stack>
          <Stack>
          <PrimaryButton
            className="App-createTrip-button"
            onClick={() => this._addTrip()}
          >
            Add Trip
          </PrimaryButton>
        </Stack>
 
      </div>
    );
  }

  _renderTripList() {
    return (
      <div className="App-tripList">
        {this.state.trips.map(trip => {
          let { personaProps } = trip;
          let personArgs = { ...personaProps, ...examplePersona };

          return (
            <div
              className="App-trip"
              key={trip.id}
              onClick={() => {
                this._toggleTripCompleted(trip.id);
              }}
            >
              <Checkbox
                checked={trip.completed}
                label={trip.name}
                name={trip.id}
                onChange={(event, checked) => {
                  this._toggleTripCompleted(trip.id);
                }}
              />
              <div className="App-persona">
                <div>
                  <p>Location: {trip.location}</p>
                  <p>Date: {trip.date}</p>
                </div>
                <div className="ms-PersonaExample">
                  <Persona {...personArgs} />
                </div>
              </div>
              <IconButton
                className="App-displayTrip"
                iconProps={{ iconName: "Go" }}
                title="Display trip"
                ariaLabel="Delete trip"
                onClick={event => {
                  event.stopPropagation();
                  this._displayTrip(trip.id);
                }}
              />
              <IconButton
                className="App-deleteTrip"
                iconProps={{ iconName: "Delete" }}
                title="Delete trip"
                ariaLabel="Delete trip"
                onClick={event => {
                  event.stopPropagation();
                  this._confirmDeleteTrip(trip.id);
                }}
              />
            </div>
          );
        })}
      </div>
    );
  }

  _renderCompletedTripList() {
    return (
      <div className="App-tripList">
        {this.state.trips.map(trip => {
          if (trip.completed === true) {
            let { personaProps } = trip;
            let personArgs = { ...personaProps, ...examplePersona };
  
            return (
              <div
                className="App-trip"
                key={trip.id}
                onClick={() => {
                  this._toggleTripCompleted(trip.id);
                }}
              >
                <div className="App-persona">
                  <div>
                    <p>Location: {trip.location}</p>
                    <p>Date: {trip.date}</p>
                  </div>
                  <div className="ms-PersonaExample">
                    <Persona {...personArgs} />
                  </div>
                </div>
                <IconButton
                  className="App-displayTrip"
                  iconProps={{ iconName: "Go" }}
                  title="Display trip"
                  ariaLabel="Delete trip"
                  onClick={event => {
                    event.stopPropagation();
                    this._displayTrip(trip.id);
                  }}
                />
                <IconButton
                  className="App-deleteTrip"
                  iconProps={{ iconName: "Delete" }}
                  title="Delete trip"
                  ariaLabel="Delete trip"
                  onClick={event => {
                    event.stopPropagation();
                    this._confirmDeleteTrip(trip.id);
                  }}
                />
              </div>
            );
          }
        })}
      </div>
    )
  }

  _renderProgress() {
    return (
      <ProgressIndicator
        label="Your progress"
        description={`${this._TripManager.getCompletedtripCount()} of ${this._TripManager.getTripCount()} trips completed`}
        percentComplete={this._TripManager.getTripPercentComplete()}
      />
    );
  }

  _renderDeleteDialog() {
    return (
      <Dialog
        hidden={this.state.hideDeleteDialog}
        onDismiss={this._closeDeleteDialog}
        dialogContentProps={{
          type: DialogType.normal,
          title: "Delete trip",
          subText:
            "Are you sure you want to delete this trip? This cannot be undone."
        }}
        modalProps={{
          isBlocking: false
        }}
      >
        <DialogFooter>
          <PrimaryButton
            onClick={() => {
              this._handleConfirmDeleteClick(this.state.tripToDelete);
            }}
            text="Ok"
          />
          <DefaultButton
            onClick={() => this._handleCancelDeleteClick()}
            text="Cancel"
          />
        </DialogFooter>
      </Dialog>
    );
  }

  _addTrip() {
    this._TripManager.addTrip(
      this.state.nameValue,
      this.state.locationValue,
      this.state.dateValue,
      this.state.descriptionValue
    );

    this.setState({
      trips: this._TripManager.getTrips(),
      nameValue: "",
      locationValue: "",
      dateValue: "",
      descriptionValue: ""
    });
  }

  // componentDidMount() {
  //   console.log("Mounting**************");
  //   console.log(this.state.tasks);
  //   console.log("InputValue: " + this.state.inputValue);
  //   console.log(this.state.textFieldValue);
  // }

  // componentDidUpdate() {
  //   console.log("Updating**************");
  //   console.log(this.state.tasks);
  //   console.log("InputValue: " + this.state.inputValue);
  // }

  _toggleTripCompleted(tripId) {
    this._TripManager.toggleTripCompleted(tripId);

    this.setState({
      trips: this._TripManager.getTrips()
    });
  }

  _displayTrip(tripId) {
    this.setState({
      tripToDisplay: tripId
    });
  }

  _confirmDeleteTrip(tripId) {
    this._showDeleteDialog();

    this.setState({
      tripToDelete: tripId
    });
  }

  _showDeleteDialog = () => {
    this.setState({ hideDeleteDialog: false });
  };

  _closeDeleteDialog = () => {
    this.setState({ hideDeleteDialog: true });
  };

  _handleConfirmDeleteClick(tripId) {
    this._TripManager.deleteTrip(tripId);

    this.setState({
      tripToDelete: null,
      trips: this._TripManager.getTrips()
    });

    this._closeDeleteDialog();
  }

  _handleCancelDeleteClick() {
    this._closeDeleteDialog();
  }
}

export default App;

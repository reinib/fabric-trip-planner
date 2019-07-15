import React, { Component } from "react";
import { Fabric, TextField } from "office-ui-fabric-react";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";

import "./App.css";

initializeIcons();

class App extends Component {
  render() {
    return (
      <Fabric className="App">
        <div className="App-header">
          <span className="App-title">Team Tasks</span>
          <div className="App-description">
            <TextField borderless placeholder="Describe your list" />
          </div>
        </div>
      </Fabric>
    );
  }
}

export default App;

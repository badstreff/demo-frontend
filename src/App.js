import React from "react";
import axios from "axios";
import {
  FormGroup,
  InputGroup,
  Button,
  Card,
  Elevation,
} from "@blueprintjs/core";

import "./App.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

class Greeting extends React.Component {
  state = {
    greeting: "",
  };

  componentDidMount() {
    axios.get(`https://api-demo5111.azurewebsites.net`).then((res) => {
      const greeting = res.data;
      this.setState({ greeting });
    });
  }

  render() {
    return <p>{this.state.greeting}</p>;
  }
}

class Random extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seed: 0,
      random: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.onGenerate = this.onGenerate.bind(this);
  }

  componentDidMount() {
    axios.get(`https://api-demo5111.azurewebsites.net/random`).then((res) => {
      const random = res.data;
      this.setState({ random });
    });
  }
  onGenerate(event) {
    console.log("generate clicked");
    let endpoint =
      `https://api-demo5111.azurewebsites.net/random/` + this.state.seed;
    axios.get(endpoint).then((res) => {
      const random = res.data;
      this.setState({ random });
    });
  }
  handleChange(event) {
    console.log("change handing");
    this.setState({ seed: event.target.value });
  }

  render() {
    return (
      <div>
        <p>{this.state.random}</p>
        <FormGroup
          helperText="Random number generator demo..."
          label="Seed"
          labelFor="text-input"
          labelInfo="(required)"
        >
          <InputGroup
            id="seed"
            value={this.state.seed}
            onChange={this.handleChange}
          />
          <Button icon="refresh" text="generate" onClick={this.onGenerate} />
        </FormGroup>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App" class="bp3-dark">
      <header className="App-header"></header>
      <body className="App-body">
        <Random />
      </body>
    </div>
  );
}

export default App;

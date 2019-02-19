import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Axios from "axios";
import "./styles.css";

function useInput(defaultValue) {
  const [value, setValue] = useState(defaultValue);

  const onChange = event => {
    const {
      target: { value }
    } = event;
    setValue(value);
  };

  return { value, onChange };
}

function App() {
  const firstname = useInput("First Name");
  const lastname = useInput("Last Name");
  //console.log(name);
  return (
    <div className="App">
      <h1>Use Hooks</h1>
      <br />
      <input
        name="firstname"
        {...firstname}
        placeholder="what's your first name"
      />
      <input
        name="lastname"
        {...lastname}
        placeholder="what's your last name"
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

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

function useFetch(url) {
  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const callUrl = async () => {
    try {
      const { data } = await Axios.get(url);
      setPayload(data);
    } catch {
      setError("😭");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    callUrl();
  }, []);

  return { payload, loading, error };
}
function App() {
  const firstname = useInput("");
  const lastname = useInput("");
  const { payload, loading, error } = useFetch("https://aws.random.cat/meow");
  console.log(firstname);
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
      <br />
      {loading && <span>loading your cat</span>}
      {!loading && error && <span>{error}</span>}
      {!loading && payload && (
        <img src={payload.file} width="250" alt="cat_img" />
      )}
      <br />
      {firstname.value} {``}
      {lastname.value}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

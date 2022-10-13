import "./App.css";

const { ipcRenderer } = window.require("electron");

function App() {
  const getData = () => {
    ipcRenderer.send("GET_DATA", { product: "notebook" });
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={getData}>Get data</button>
      </header>
    </div>
  );
}

export default App;

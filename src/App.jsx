import Auth from "./components/Auth";
import DisplayMovies from "./components/DisplayMovies";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Auth />
      <DisplayMovies />
    </div>
  );
}

export default App;

import SearchMovies from "./components/SearchMovies";
import DarkMode from "./components/DarkMode";
import "./styles/DarkMode.css";
function App() {
  return (
    <div className="container">
      <div className="Header">
        <h1 className="title">React Movie & TV Search</h1>
        <DarkMode />
      </div>
      <SearchMovies />
    </div>
  );
}

export default App;

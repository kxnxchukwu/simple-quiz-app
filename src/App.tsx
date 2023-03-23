import "./App.css";
import { Quiz } from "./components/Quiz";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Quiz />
    </div>
  );
}

export default App;

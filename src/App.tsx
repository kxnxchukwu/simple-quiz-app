import "./App.css";
import { Quiz } from "./components/Quiz";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import JumpToQuestionModal from "./components/Modal";

function App() {
  return (
    <div className="m-1 p-1">
      <NavBar />
      <Quiz />
      <JumpToQuestionModal />
    </div>
  );
}

export default App;

import "./App.css";
import { Quiz } from "./components/Quiz";
import "bootstrap/dist/css/bootstrap.min.css";
import Progress from "./components/Progress";

function App() {
  return (
    <>
      <Progress />
      <Quiz />
    </>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import HelloWorld from "./components/helloworld"
import OverView from "./components/overview"
import Updatedable from "./components/updateable"
import Skills from "./components/createSkills"
function App() {
  return (
    <div className="App">
      <div className="Helloworld">
        <HelloWorld></HelloWorld>
      </div>
    </div>
  );
}

export default App;

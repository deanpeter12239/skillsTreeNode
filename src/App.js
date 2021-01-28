import logo from './logo.svg';
import './App.css';
import HelloWorld from "./components/helloworldCustomiseEdge"
import OverView from "./components/overview"
import Updatedable from "./components/updateable"
import Skills from "./components/createSkills"
import Customise from "./components/helloworldCustomise"
function App() {
  return (
    <div className="App">
      <div className="Helloworld">
        <Customise></Customise>
      </div>
    </div>
  );
}

export default App;

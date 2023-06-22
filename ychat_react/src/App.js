
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  // Switch,
  Route,
  // Link
} from "react-router-dom";
import {JoinForm,Home} from './components/components'
function App() {
  return (

  <div  >
      <Router>
    <Route exact path="/">
       <JoinForm></JoinForm>
    </Route>
    <Route path="/home">
      <Home></Home>
    </Route>
    </Router>
  </div>
  );
}

export default App;

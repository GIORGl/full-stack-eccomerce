import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import About from "./components/About/About";
import Upload from "./components/UploadPage/Upload";
import Logout from "./components/Logout/Logout";

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/about" component={About} />
          <Route path="/upload" component={Upload} />
          <Route path="/logout" component={Logout} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

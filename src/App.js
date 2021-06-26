import logo from "./logo.svg";
import "./App.css";
import Login from "./Pages/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Header from "./Components/Header";
import AdminLogin from "./Pages/AdminLogin";
import AdminDashboard from "./Pages/AdminDashboard";
import AdminUsers from "./Pages/AdminUsers";
import Messages from "./Pages/Messages";
import Rides from "./Pages/Rides";

function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/">
            <AdminLogin />
          </Route>
          <Route exact path="/admin-login">
            <AdminLogin />
          </Route>
          <Route exact path="/admin-users">
            <Header />
            <AdminUsers />
          </Route>
          <Route exact path="/messages">
            <Header />
            <Messages />
          </Route>
          <Route exact path="/rides">
            <Header />
            <Rides />
          </Route>
          {/* <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;

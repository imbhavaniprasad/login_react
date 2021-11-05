import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from './Dashboard'
import { Redirect } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase"
import Register from "./Register";
import Reset from "./Reset";
import Login from "./Login"
function App() {
  function DashCheck() {
    const [user] = useAuthState(auth);
    console.log("dash");
    if (!user) { return <Redirect to="/" /> }
    else { return <Dashboard /> }
  }
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard">
            <DashCheck />
          </Route>
          <Route exact path="/reset" component={Reset} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </div>
  )
}
export default App
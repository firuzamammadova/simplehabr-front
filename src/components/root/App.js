import React from 'react';
import { Container } from 'reactstrap';
import Navi from '../navi/Navi';
import PostList from '../posts/PostList';
import { Switch, Route, Router } from 'react-router-dom';
import Login from '../auth/Login';
import { history}  from "../../redux/reducers/helpers/history";
import Register from '../auth/Register';
import Profile from '../profile/Profile';

function App() {
  return (
    <div className="App">
      <Container>
        <Navi></Navi>
    <Router history={history}>
        <Switch>
        <Route path="/" exact component={PostList}></Route>
        <Route path="/register" exact component={ Register }></Route>
        <Route path="/profile/:username?" exact component={ Profile }></Route>

          <Route path="/login" exact component={ Login }></Route>
        </Switch>
        </Router>
      </Container>

    </div>
  );
}

export default App;

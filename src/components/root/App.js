import React from 'react';
import { Container } from 'reactstrap';
import Navi from '../navi/Navi';
import PostList from '../posts/PostList';
import { Switch, Route } from 'react-router-dom';
import Login from '../auth/Login';

function App() {
  return (
    <div className="App">
      <Container>
        <Navi></Navi>

        <Switch>
        <Route path="/" exact component={PostList}></Route>

          <Route path="/login" exact component={Login}></Route>
        </Switch>
      </Container>

    </div>
  );
}

export default App;

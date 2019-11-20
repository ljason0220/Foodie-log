import React, { Component } from 'react';
import AppNavBar from './components/AppNavBar';
import EntryList from './components/EntryList';
import EntryModal from './components/entryModal';
import IntroPage from './components/introPage';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavBar />
          <Container>
            <EntryModal />
            <IntroPage />
            <EntryList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;

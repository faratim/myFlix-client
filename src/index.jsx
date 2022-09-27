// REACT | REACT-DOM
import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client'

// REACT-BOOTSTRAP
import Container from 'react-bootstrap/Container';

// REDUX
import { legacy_createStore as createStore } from "redux";
import { Provider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

// LOCAL IMPORTS
import moviesApp from './reducers/reducers';
import MainView from './components/main-view/main-view';
import './index.scss';

// VARIABLES
const store = createStore(moviesApp, devToolsEnhancer());

// MAIN COMPONENT
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container fluid>
          <MainView />
        </Container>
      </Provider>
    );
  }
}

// FIND ROOT
const container = document.getElementsByClassName('app-container')[0];

// REACT RENDER
createRoot(container)
  .render(React.createElement(MyFlixApplication));
// ReactDOM.render(React.createElement(MyFlixApplication), container);
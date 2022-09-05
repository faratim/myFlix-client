import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';
import './index.scss';

class MyFlixApplication extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <MainView />
        );
    }
}

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(MyFlixApplication), container);
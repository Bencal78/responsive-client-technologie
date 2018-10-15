import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { devToolsEnhancer } from 'redux-devtools-extension';
import { BrowserRouter, Route, Switch  } from 'react-router-dom';
import Attraction from './Attraction/Attraction.js';
import Batiments from './Batiments/Batiments.js';
import Personnel from './Personnel/Personnel.js';
import Maintenance from './Maintenance/Maintenance.js';
import Reducer from './reducer';

const store = createStore(Reducer, devToolsEnhancer());

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path={'/'} component={App}/>
                <Route path={'/Attraction'} component={Attraction}/>
                <Route path={'/Batiments'} component={Batiments}/>
                <Route path={'/Personnel'} component={Personnel}/>
                <Route path={'/Maintenance'} component={Maintenance}/>
            </Switch>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));

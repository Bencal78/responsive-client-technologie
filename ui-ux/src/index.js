import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { devToolsEnhancer } from 'redux-devtools-extension';
import { BrowserRouter, Route, Switch  } from 'react-router-dom';
import Reducer from './reducer';

const store = createStore(Reducer, devToolsEnhancer());

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path={'/'} component={App}/>
            </Switch>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));
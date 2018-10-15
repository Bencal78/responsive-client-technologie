import React from 'react';
import Header from './layouts/header'
import Navigation from './layouts/navigation'
import Attraction from './Attraction/Attraction';
import Batiments from './Batiments/Batiments';
import Personnel from './Personnel/Personnel';
import Maintenance from './Maintenance/Maintenance';
import Stat from './Stat/Stat'
import { Redirect ,Route, Switch  } from 'react-router-dom';


class App extends React.Component{
    render = () => {
        return(
            <div>
                <Header />
                <Navigation />
                <Switch>
                    <Route exact path="/" render={() => (
                        <Redirect to="/stat"/>
                    )}/>
                    <Route exact path={'/stat'} component={Stat} />
                    <Route exact path={'/attraction'} component={Attraction} />
                    <Route exact path={'/batiments'} component={Batiments} />
                    <Route exact path={'/personnel'} component={Personnel} />
                    <Route exact path={'/maintenance'} component={Maintenance} />
                </Switch>
            </div>
        )
    }
}


export default App;

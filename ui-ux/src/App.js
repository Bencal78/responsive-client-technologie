import React from 'react';
import Header from './layouts/header'
import Navigation from './layouts/navigation'
import Attraction from './layouts/components/Attraction';
import Batiments from './layouts/components/Batiments';
import Personnel from './layouts/components/Personnel';
import Maintenance from './layouts/components/Maintenance';
import Stat from './layouts/components/Stat'
import { Redirect ,Route, Switch  } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    typography: {
        useNextVariants: true
    },
});

class App extends React.Component{


    render = () => {
        return(
            <MuiThemeProvider theme={theme}>
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
            </MuiThemeProvider>
        )
    }
}


export default App;
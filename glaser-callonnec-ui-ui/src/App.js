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
import { withStyles } from '@material-ui/core/styles'

const drawerWidth = 240;


const theme = createMuiTheme({
    typography: {
        useNextVariants: true
    },
});

const styles = {
    root: {
        display: 'flex',
    },

    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    },
    appBarSpacer: theme.mixins.toolbar,
}

class App extends React.Component{


    render = () => {
        const { classes } = this.props;
        return(
            <MuiThemeProvider theme={theme}>
                <div className={classes.root}>
                    <Header />
                    <Navigation />
                    <div className={classes.content}>
                        <div className={classes.appBarSpacer} />
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
                </div>
            </MuiThemeProvider>
        )
    }
}


export default withStyles(styles)(App);
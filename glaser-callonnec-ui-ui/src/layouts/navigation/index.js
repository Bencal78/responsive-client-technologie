import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { connect } from 'react-redux';
import { changeIsMenuOpen} from '../../actions';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AttractionIcon from '@material-ui/icons/ChildCare';
import MaintenanceIcon from '@material-ui/icons/Build';
import BatimentIcon from '@material-ui/icons/Business';
import ProfilIcon from '@material-ui/icons/Person';
import StatIcon from '@material-ui/icons/Timeline';
import Divider from '@material-ui/core/Divider';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const drawerWidth = 240;


const styles = (theme) => ({
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '4px',
    },

    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
})

class Navigation extends React.Component {
    handleClose = () => {
        const { toogleIsOpen } = this.props;
        toogleIsOpen();
    };

    handleClick = (value) => {
        const { history, toogleIsOpen } = this.props;
        history.push(`${value}`);
    };

    render() {
        const { isOpen, classes } = this.props;

        return(
            <Drawer
                variant="permanent"
                open={isOpen}
                onClose={this.handleClose}
                classes={{
                    paper: classNames(classes.drawerPaper, !isOpen && classes.drawerPaperClose),
                }}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={this.handleClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                  <ListItem button onClick={() => this.handleClick('attraction')}>
                      <ListItemIcon>
                          <AttractionIcon/>
                      </ListItemIcon>
                      <ListItemText
                          inset
                          primary="Attraction"
                      />
                  </ListItem>
                  <ListItem button onClick={() => this.handleClick('batiments')}>
                      <ListItemIcon>
                          <BatimentIcon/>
                      </ListItemIcon>
                      <ListItemText
                          inset
                          primary="Batiments"
                      />
                  </ListItem>
                  <ListItem button onClick={() => this.handleClick('personnel')}>
                      <ListItemIcon>
                          <ProfilIcon/>
                      </ListItemIcon>
                      <ListItemText
                          inset
                          primary="Personnel"
                      />
                  </ListItem>
                  <ListItem button onClick={() => this.handleClick('maintenance')}>
                      <ListItemIcon>
                          <MaintenanceIcon/>
                      </ListItemIcon>
                      <ListItemText
                          inset
                          primary="Maintenance"
                      />
                  </ListItem>

                    <ListItem button onClick={() => this.handleClick('stat')}>
                        <ListItemIcon>
                            <StatIcon/>
                        </ListItemIcon>
                        <ListItemText
                            inset
                            primary="Statistiques"
                        />
                    </ListItem>
                </List>
            </Drawer>
        )
    }
}

export default withRouter(connect(
    state => ({
        isOpen: state.isMenuOpen
    }),
    dispatch => ({
        toogleIsOpen: () => dispatch(changeIsMenuOpen())
    })
)(withStyles(styles)(Navigation)));

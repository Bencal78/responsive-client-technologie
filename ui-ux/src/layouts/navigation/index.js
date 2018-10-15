import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { connect } from 'react-redux';
import { changeIsMenuOpen} from '../../actions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import AttractionIcon from '@material-ui/icons/ChildCare';
import MaintenanceIcon from '@material-ui/icons/Build';
import BatimentIcon from '@material-ui/icons/Business';
import ProfilIcon from '@material-ui/icons/Person';
import ProjectIcon from '@material-ui/icons/Folder';
import { withRouter } from 'react-router-dom';

class Navigation extends React.Component {
    handleClose = () => {
        const { toogleIsOpen } = this.props;
        toogleIsOpen();
    };

    handleClick = (value) => {
        const { history, toogleIsOpen } = this.props;
        history.push(`${value}`);
        toogleIsOpen();
    };

    render() {
        const { isOpen } = this.props;
        return(
            <Drawer
                open={isOpen}
                onClose={this.handleClose}
            >
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
)(Navigation));

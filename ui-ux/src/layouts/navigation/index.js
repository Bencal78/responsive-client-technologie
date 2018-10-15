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
                  <ListItem button onClick={() => this.handleClick('Attraction')}>
                      <ListItemIcon>
                          <AttractionIcon/>
                      </ListItemIcon>
                      <ListItemText
                          inset
                          primary="Attraction"
                      />
                  </ListItem>
                  <ListItem button onClick={() => this.handleClick('Batiments')}>
                      <ListItemIcon>
                          <BatimentIcon/>
                      </ListItemIcon>
                      <ListItemText
                          inset
                          primary="Batiments"
                      />
                  </ListItem>
                  <ListItem button onClick={() => this.handleClick('Personnel')}>
                      <ListItemIcon>
                          <ProfilIcon/>
                      </ListItemIcon>
                      <ListItemText
                          inset
                          primary="Personnel"
                      />
                  </ListItem>
                  <ListItem button onClick={() => this.handleClick('Maintenance')}>
                      <ListItemIcon>
                          <MaintenanceIcon/>
                      </ListItemIcon>
                      <ListItemText
                          inset
                          primary="Maintenance"
                      />
                  </ListItem>
                    <ListItem button onClick={() => this.handleClick('profil')}>
                        <ListItemIcon>
                            <ProfilIcon/>
                        </ListItemIcon>
                        <ListItemText
                            inset
                            primary="Profil"
                        />
                    </ListItem>
                    <ListItem button onClick={() => this.handleClick('project')}>
                        <ListItemIcon>
                            <ProjectIcon/>
                        </ListItemIcon>
                        <ListItemText
                            inset
                            primary="Project"
                        />
                    </ListItem>
                    <ListItem button onClick={() => this.handleClick('contact')}>
                        <ListItemIcon>
                            <SendIcon/>
                        </ListItemIcon>
                        <ListItemText
                            inset
                            primary="Send Mail"
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

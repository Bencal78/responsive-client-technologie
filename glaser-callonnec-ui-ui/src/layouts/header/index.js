import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { changeIsMenuOpen } from '../../actions';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

const drawerWidth = 249;

const styles = (theme) => ({
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        toolbar: {
            paddingRight: '60px',
        },
        menuButton: {
            marginLeft: 12,
            marginRight: 36,
        },
        menuButtonHidden: {
            display: 'none',
        },
    }
)


class Header extends React.Component {

    handleToogleIsOpen = () => {
        const { toogleIsOpen } = this.props;
        toogleIsOpen();
    };

    render () {
        const { classes, isOpen } = this.props;
        return(
            <AppBar
                position="absolute"
                className={classNames(classes.appBar, isOpen && classes.appBarShift)}
            >
                <Toolbar disableGutters={!isOpen} className={classes.toolbar}>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={this.handleToogleIsOpen}
                        className={classNames(
                            classes.menuButton,
                            isOpen && classes.menuButtonHidden,
                        )}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        )
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
    toogleIsOpen: PropTypes.func.isRequired,
};

export default connect(
    state => ({
        isOpen: state.isMenuOpen,
    }),
    dispatch =>({
        toogleIsOpen: () => dispatch(changeIsMenuOpen())
    })
)(withStyles(styles)(withRouter(Header)));
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

const styles = (theme) => ({
        root: {
            width: '100%',
            backgroundColor:'#fafafa',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#222'
        },

        button: {
            color: '#222',
            marginRight:'5px',
            flex: 1
        },
    }
)


class Header extends React.Component {


    handleToogleIsOpen = () => {
        const { toogleIsOpen } = this.props;
        toogleIsOpen();
    };

    render () {
        const { classes } = this.props;
        return(
            <AppBar
                position='fixed'
                className={classes.root}
            >
                <Toolbar variant="dense">
                    <IconButton className={classes.button} onClick={this.handleToogleIsOpen}>
                        <MenuIcon/>
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
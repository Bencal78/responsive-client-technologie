import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles'


const styles = {
    root: {
        marginTop: '500px'
    }
}

class Stat extends Component {
  /*constructor(props) {
    super(props);
    this.state = {
       id: '',
       date: null,
       visitor_number:0,
       recipe:0
     }
  }*/

  state = {
      id: '',
      date: null,
      visitor_number:0,
      recipe:0
  };

  componentDidMount = () => {
      console.warn('lknfqsdnmksqndfkjqnsd')
  }

  render() {
      const {id, date} = this.state;
      const {classes} = this.props
      return (
          <div className={classes.root}>
              <h2>ben le bolos</h2>
          </div>
      );
  }
}
export default withStyles(styles)(Stat);

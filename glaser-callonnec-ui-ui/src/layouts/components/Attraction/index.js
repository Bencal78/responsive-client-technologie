import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Modification from '@material-ui/icons/Create';
import { connect } from 'react-redux';
import {createAttraction, deleteAttraction, setAttraction} from "../../../actions";
import DeleteIcon from '@material-ui/icons/Delete'


const styles = theme => ({
    button: {
        justifyContent: 'end'
    },

    buttonGroup :{
        marginTop: '15px',
        display: 'flex',
        width:'100%',
        justifyContent: 'end',
    },

    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%',
        marginTop: theme.spacing.unit,
    },
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    toolbar: {
        paddingRight: theme.spacing.unit,
    },

    title: {
        flex: '0 0 auto',
    },

    spacer: {
        flex: '1 1 100%',
    },

    actions: {
        color: theme.palette.text.primary,
    },

    table: {
        minWidth: 700,
    },

    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },

    modal:{
        display: 'flex',
        alignItems:'center',
        justifyContent: 'center'
    },

    paper: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
});

class Attraction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        open: false,
        titleModal: '',
        id : '',
        name : '',
        date : '',
        price : '',
    }
  }

  handleClose = () => {
      this.setState({ open:false })
  };

  handleOpen = () => {
      this.setState({
          titleModal:'Ajouter un élément',
          open: true,
          name: '',
          date: '',
          price: '',
          id: ''
      })

  };


  handleChange = (e, value) => {
      this.setState({
          [value]: e.target.value
      })
  }

  handleModification =  (e, id, name, price, date) => {
      this.setState({
          titleModal:'Modifier un élément',
          open: true,
          name,
          date,
          price,
          id,
      })
  };

  handleDelete = (a) => {
      const { onDeleteClick } = this.props;
      onDeleteClick(a)
  };

  handleSubmit = () => {
      const { titleModal, id, name, price, date } = this.state;
      const { onSetClick, onCreateClick, attractions } = this.props;
      if(titleModal === 'Modifier un élément') {
          const attraction = {
              id,
              name,
              date,
              price,
          };
          onSetClick(attraction)
      } else {
          let idArray = attractions.map(a => {
              return a.id
          });
          console.warn(idArray)
          const attraction = {
              id: Math.random(1000),
              name,
              date,
              price,
          };
          onCreateClick(attraction)
      }
      this.setState({
          open: false
      })
  };

  render() {
      const {
          classes,
          attractions,
          onDeleteClick,
      } = this.props;

      const {
          name,
          date,
          price,
          id,
          titleModal,
      } = this.state
      return (
          <div>
              <Toolbar className={classes.toolbar}>
                  <Typography variant="h5" id="tableTitle" className={classes.title}>
                      Attractions
                  </Typography>
                  <div className={classes.spacer} />
                  <div>
                      <Tooltip title="Ajouter">
                          <IconButton aria-label="Filter list" onClick={this.handleOpen}>
                              <AddIcon className={classes.actions}/>
                          </IconButton>
                      </Tooltip>
                  </div>
              </Toolbar>
              <Paper className={classes.root}>
                  <Table className={classes.table}>
                      <TableHead>
                          <TableRow className={classes.row}>
                              <TableCell>Nom</TableCell>
                              <TableCell>Date</TableCell>
                              <TableCell>Prix</TableCell>
                              <TableCell>Modifier</TableCell>
                              <TableCell></TableCell>

                          </TableRow>
                      </TableHead>
                      <TableBody>
                          {attractions.map(a => {
                              return (
                                  <TableRow
                                      key={a.id}
                                  >
                                      <TableCell component="th" scope="row">
                                          {a.name}
                                      </TableCell>
                                      <TableCell>{a.date}</TableCell>
                                      <TableCell >{a.price}</TableCell>
                                      <TableCell onClick={e => this.handleModification(e, a.id, a.name, a.price, a.date)}>
                                          <IconButton>
                                              <Modification/>
                                          </IconButton>
                                      </TableCell>
                                      <TableCell onClick={() => this.handleDelete(a.id)}>
                                          <IconButton>
                                              <DeleteIcon/>
                                          </IconButton>
                                      </TableCell>
                                  </TableRow>
                              );
                          })}
                      </TableBody>
                  </Table>
              </Paper>

              <Modal
                  aria-labelledby="simple-modal-title"
                  open={this.state.open}
                  onClose={this.handleClose}
                  className={classes.modal}
              >
                  <div className={classes.paper}>
                      <Typography variant="h6" id="modal-title">
                          {titleModal}
                      </Typography>
                      <div className={classes.container}>
                          <TextField
                              id="name"
                              label="Name"
                              value={name}
                              onChange={(e) => this.handleChange(e,'name')}
                              type="string"
                              className={classes.textField}
                          />
                          <TextField
                              id="price"
                              label="Prix"
                              type="num"
                              value={price}
                              onChange={(e) => this.handleChange(e,'price')}
                              className={classes.textField}

                          />
                          <TextField
                              id="date"
                              label="Date"
                              type="date"
                              value={date}
                              onChange={(e) => this.handleChange(e,'date')}
                              className={classes.textField}
                              InputLabelProps={{
                                  shrink: true,
                              }}
                          />
                      </div>
                      <div className={classes.buttonGroup}>
                          <Button className={classes.button}>Cancel</Button>
                          <Button className={classes.button} color="primary" onClick={this.handleSubmit}>
                              Submit
                          </Button>
                      </div>
                  </div>
              </Modal>
          </div>

      );
  }
}


const AttractionConnnected = connect(
    state => ({
        attractions: state.attractions
    }),
    dispatch => ({
        onCreateClick: attraction => dispatch(createAttraction(attraction)),
        onDeleteClick: id => dispatch(deleteAttraction(id)) ,
        onSetClick: attraction => dispatch(setAttraction(attraction))
    })

)(Attraction);


export default withStyles(styles)(AttractionConnnected);

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
import {createPerson, deletePerson, setPerson} from "../../../actions";
import DeleteIcon from '@material-ui/icons/Delete'
import MenuItem from "@material-ui/core/MenuItem/MenuItem";


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

class Personnel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            titleModal: '',
            id : '',
            name : '',
            age : '',
            job : '',
            salary: '',
        }
    }

    handleClose = () => {
        this.setState({ open:false })
    };

    handleOpen = () => {
        this.setState({
            titleModal:'Ajouter un élément',
            open: true,
            name : '',
            age : '',
            job : '',
            salary: '',
        })

    };


    handleChange = (e, value) => {
        this.setState({
            [value]: e.target.value
        })
    }

    handleModification =  (e, id, name, age, job, salary) => {
        this.setState({
            titleModal:'Modifier un élément',
            open: true,
            id,
            name,
            age,
            job,
            salary,
        })
    };

    handleDelete = (a) => {
        const { onDeleteClick } = this.props;
        onDeleteClick(a)
    };

    handleSubmit = () => {
        const { titleModal, id, name, age, job, salary } = this.state;
        const { onSetClick, onCreateClick, people } = this.props;
        if(titleModal === 'Modifier un élément') {
            console.warn(age)
            const person = {
                id,
                name,
                age,
                job,
                salary,
            };
            onSetClick(person)
        } else {

            const person = {
                id: Math.random(1000),
                name,
                age,
                job,
                salary
            };
            onCreateClick(person)
        }
        this.setState({
            open: false
        })
    };

    render() {
        const {
            classes,
            people,
        } = this.props;

        const {
            name,
            age,
            job,
            salary,
            titleModal,
        } = this.state
        return (
            <div>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h5" id="tableTitle" className={classes.title}>
                        Personnel
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
                                <TableCell>Age</TableCell>
                                <TableCell>Métier</TableCell>
                                <TableCell>Salaire</TableCell>
                                <TableCell>Modifier</TableCell>
                                <TableCell></TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {people.map(p => {
                                return (
                                    <TableRow
                                        key={p.id}
                                    >
                                        <TableCell component="th" scope="row">
                                            {p.name}
                                        </TableCell>
                                        <TableCell>{p.age}</TableCell>
                                        <TableCell >{p.job}</TableCell>
                                        <TableCell >{p.salary}</TableCell>
                                        <TableCell onClick={e => this.handleModification(e, p.id, p.name, p.age, p.job, p.salary)}>
                                            <IconButton>
                                                <Modification/>
                                            </IconButton>
                                        </TableCell>
                                        <TableCell onClick={() => this.handleDelete(p.id)}>
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
                                id="age"
                                label="Age"
                                type="num"
                                value={age}
                                onChange={(e) => this.handleChange(e,'age')}
                                className={classes.textField}

                            />
                            <TextField
                                id="job"
                                select
                                label="Métier"
                                value={job}
                                onChange={(e) => this.handleChange(e,'job')}
                                className={classes.textField}
                            >
                                <MenuItem value={"technician"}>Technicien</MenuItem>
                                <MenuItem value={"director"}>Directeur</MenuItem>
                                <MenuItem value={"comptable"}>Comptable</MenuItem>
                                <MenuItem value={"ingénieur"}>Ingénieur</MenuItem>
                                <MenuItem value={"restaurateur"}>Restaurateur</MenuItem>
                            </TextField>
                            <TextField
                                id="sal"
                                label="Salaire"
                                type="num"
                                value={salary}
                                onChange={(e) => this.handleChange(e,'salary')}
                                className={classes.textField}

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


const PersonnelConnnected = connect(
    state => ({
        people: state.people
    }),
    dispatch => ({
        onCreateClick: person => dispatch(createPerson(person)),
        onDeleteClick: id => dispatch(deletePerson(id)),
        onSetClick: person => dispatch(setPerson(person))
    })

)(Personnel);


export default withStyles(styles)(PersonnelConnnected);

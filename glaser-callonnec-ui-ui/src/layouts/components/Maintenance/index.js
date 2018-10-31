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
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import {createMaintenance, deleteMaintenance, setMaintenance} from "../../../actions";
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

class Maintenance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            titleModal: '',
            id : '',
            dateLast : '',
            dateNext : '',
            tech : '',
            attraction: '',
        }
    }

    handleClose = () => {
        this.setState({ open:false })
    };

    handleOpen = () => {
        this.setState({
            titleModal:'Ajouter un élément',
            open: true,
            id : '',
            dateLast : '',
            dateNext : '',
            tech : '',
            attraction: '',
        })

    };


    handleChange = (e, value) => {
        this.setState({
            [value]: e.target.value
        })
    }

    handleModification =  (e, id, dateLast, dateNext, techId, atID) => {
        const { people, attractions } = this.props
        this.setState({
            titleModal:'Modifier un élément',
            open: true,
            id,
            dateLast,
            dateNext,
            tech: people.find(p => p.id === techId).name,
            attraction: attractions.find(a => a.id ===atID).name,
        })
    };

    handleDelete = (a) => {
        const { onDeleteClick } = this.props;
        console.warn(a)
        onDeleteClick(a)
    }

    handleSubmit = () => {
        const { titleModal, id, dateLast, dateNext, attraction, tech } = this.state;
        const { onSetClick, onCreateClick, maintenances, attractions, people } = this.props;

        const atId = attractions.find(a => a.name === attraction).id;
        const techId = people.find(p => p.name === tech).id;

        if(titleModal === 'Modifier un élément') {
            const maintenance = {
                id: id,
                dateLastMaintenance: dateLast,
                dateNextMaintenance: dateNext,
                technicianId: techId,
                attractionId: atId
            };
            onSetClick(maintenance)
        } else {
            const maintenance = {
                id: Math.random(1000),
                dateLastMaintenance: dateLast,
                dateNextMaintenance: dateNext,
                technicianId: techId,
                attractionId: atId
            };
            onCreateClick(maintenance)
        }
        this.setState({
            open: false
        })
    };

    render() {
        const {
            classes,
            maintenances,
            attractions,
            people
        } = this.props;

        const {
            dateLast,
            dateNext,
            tech,
            attraction,
            titleModal,
        } = this.state;

        return (
            <div>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h5" id="tableTitle" className={classes.title}>
                        Maintenances
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
                                <TableCell>Date dernière maintenance</TableCell>
                                <TableCell>Date prochaine maintenance</TableCell>
                                <TableCell>Technicien</TableCell>
                                <TableCell>Attraction</TableCell>
                                <TableCell>Modifier</TableCell>
                                <TableCell></TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {maintenances.map(m => {
                                return (
                                    <TableRow
                                        key={m.id}
                                    >
                                        <TableCell component="th" scope="row">
                                            {m.dateLastMaintenance}
                                        </TableCell>
                                        <TableCell>{m.dateNextMaintenance}</TableCell>
                                        <TableCell >{people.find(p => p.id === m.technicianId).name}</TableCell>
                                        <TableCell >{attractions.find(a => a.id === m.attractionId).name}</TableCell>
                                        <TableCell onClick={
                                            e => this.handleModification(
                                                e,
                                                m.id,
                                                m.dateLastMaintenance,
                                                m.dateNextMaintenance,
                                                m.technicianId,
                                                m.attractionId
                                            )}
                                        >
                                            <IconButton>
                                                <Modification/>
                                            </IconButton>
                                        </TableCell>
                                        <TableCell onClick={() => this.handleDelete(m.id)}>
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
                                id="date1"
                                label="Derniere maintenance"
                                type="date"
                                value={dateLast}
                                onChange={(e) => this.handleChange(e,'dateLast')}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                id="date2"
                                label="Prochaine maintenance"
                                type="date"
                                value={dateNext}
                                onChange={(e) => this.handleChange(e,'dateNext')}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                id="tech"
                                select
                                label="Technician"
                                value={tech}
                                onChange={(e) => this.handleChange(e,'tech')}
                                className={classes.textField}
                            >
                                {people.map(p => {
                                    if (p.job === 'technician') {
                                        return (
                                            <MenuItem key={p.id} value={p.name}>
                                                {p.name}
                                            </MenuItem>
                                        )
                                    }
                                })}
                            </TextField>
                            <TextField
                                id="attraction"
                                select
                                label="Attraction"
                                value={attraction}
                                onChange={(e) => this.handleChange(e,'attraction')}
                                className={classes.textField}
                            >{attractions.map(a => {
                                return(

                                        <MenuItem key={a.id} value={a.name}>
                                            {a.name}
                                        </MenuItem>
                                    )
                                }
                            )}
                            </TextField>
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


const MaintenanceConnnected = connect(
    state => ({
        maintenances: state.maintenances,
        people: state.people,
        attractions: state.attractions,
    }),
    dispatch => ({
        onCreateClick: maintenance => dispatch(createMaintenance(maintenance)),
        onDeleteClick: id => dispatch(deleteMaintenance(id)) ,
        onSetClick: maintenance => dispatch(setMaintenance(maintenance))
    })

)(Maintenance);


export default withStyles(styles)(MaintenanceConnnected);

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
import {createStat, deleteStat, setStat} from "../../../actions";
import DeleteIcon from '@material-ui/icons/Delete'
import Graph from './Graph';


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
        marginBottom: '20px'
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

class Stat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            titleModal: '',
            id : '',
            date: '',
            numberVisitor : '',
            income: '',
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
            date: '',
            numberVisitor : '',
            income: '',
        })
    };

    handleChange = (e, value) => {
        this.setState({
            [value]: e.target.value
        })
    }

    handleModification =  (e, id, date, numberVisitor, income) => {
        this.setState({
            titleModal:'Modifier un élément',
            open: true,
            id,
            date,
            numberVisitor,
            income,
        })
    };

    handleDelete = (a) => {
        const { onDeleteClick } = this.props;
        onDeleteClick(a)
    };

    handleSubmit = () => {
        const { titleModal, id, date, numberVisitor, income } = this.state;
        const { onSetClick, onCreateClick, stats } = this.props;
        if(titleModal === 'Modifier un élément') {
            const stat = {
                id,
                date,
                numberVisitor: parseInt(numberVisitor),
                income: parseInt(income),
            };
            onSetClick(stat)
        } else {

            const stat = {
                id: Math.random(1000),
                date,
                numberVisitor: parseInt(numberVisitor),
                income: parseInt(income),
            };
            onCreateClick(stat)
        }
        this.setState({
            open: false
        })
    };

    render() {
        const {
            classes,
            stats,
        } = this.props;

        const {
            date,
            numberVisitor,
            income,
            titleModal,
            data
        } = this.state;

        return (
            <div className={classes.main}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h5" id="tableTitle" className={classes.title}>
                        Statistiques
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
                <Typography component="div" className={classes.chartContainer}>
                    <Graph />
                </Typography>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow className={classes.row}>
                                <TableCell>Date</TableCell>
                                <TableCell>Nombre de Visiteurs</TableCell>
                                <TableCell>Chiffre d'affaire</TableCell>
                                <TableCell>Modifier</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {stats.map(s => {
                                return (
                                    <TableRow
                                        key={s.id}
                                    >
                                        <TableCell component="th" scope="row">
                                            {s.date}
                                        </TableCell>
                                        <TableCell>{s.numberVisitor}</TableCell>
                                        <TableCell >{s.income}</TableCell>
                                        <TableCell onClick={e => this.handleModification(e, s.id, s.date, s.numberVisitor, s.income)}>
                                            <IconButton>
                                                <Modification/>
                                            </IconButton>
                                        </TableCell>
                                        <TableCell onClick={() => this.handleDelete(s.id)}>
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
                            <TextField
                                id="visi"
                                label="Nombre Visiteur"
                                type="num"
                                value={numberVisitor}
                                onChange={(e) => this.handleChange(e,'numberVisitor')}
                                className={classes.textField}

                            />
                            <TextField
                                id="income"
                                label="Chiffre d'affaire"
                                type="num"
                                value={income}
                                onChange={(e) => this.handleChange(e,'income')}
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


const StatConnected = connect(
    state => ({
        stats: state.stats,
    }),
    dispatch => ({
        onCreateClick: stat => dispatch(createStat(stat)),
        onDeleteClick: id => dispatch(deleteStat(id)),
        onSetClick: stat => dispatch(setStat(stat))
    })
)(Stat);

export default withStyles(styles)(StatConnected);
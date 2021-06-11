import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { StylesProvider } from "@material-ui/core/styles";
import infoImg from "../assets/images/cardimg.svg"
import './InfoDialog.css';
import Progress from 'react-circle-progress-bar'

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        display: 'none',
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

// const DialogTitle = withStyles(styles)((props) => {
//     const { children, open, classes, onClose, ...other } = props;
//     return (
//         <MuiDialogTitle disableTypography className={classes.root} {...other}>
//             <Typography variant="h6">{children}</Typography>
//             {onClose ? (
//                 <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
//                     <CloseIcon />
//                 </IconButton>
//             ) : null}
//         </MuiDialogTitle>
//     );
// });

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function InfoDialog(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    let closeImg = { cursor: 'pointer', float: 'right', marginTop: '5px', width: '20px' };

    return (
        <>
        <StylesProvider injectFirst>
            <div>

                {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
                <Dialog aria-labelledby="customized-dialog-title" open={props.open} fullWidth maxWidth="md">
                    {/* <img src='https://d30y9cdsu7xlg0.cloudfront.net/png/53504-200.png' onClick={props.cancel} style={closeImg} /> */}
                    <div className="info__container">
                        <div className="info__container__img">
                            <div>{props.name}</div>
                            <img src={props.img} />
                        </div>
                        <div className="info__container__data">
                            <div className="info__container__data__header">
                                <div className="info__container__data__type">
                                <p className="info__container__headings">Type</p>
                                {props.category.map((category) =>
                                    <Button className={`${category.type.name}`}>{category.type.name}</Button>
                                )}
                                </div>
                                <img src='https://d30y9cdsu7xlg0.cloudfront.net/png/53504-200.png' onClick={props.cancel} style={closeImg} />
                            </div>
                            <div className="info__container__data__dimensions ">
                                <p><span className="info__container__headings">Height</span> {`${props.height/10} m`} </p>
                                <p><span className="info__container__headings">Weight</span>{` ${props.weight/10} kg`}</p>
                            </div>
                            <div className="info__container__data__abilities">
                                <p className="info__container__headings">Abilities</p>
                                {props.abilities.map((ability) =>
                                    <Button>{ability}&nbsp;&nbsp;</Button>
                                )}
                            </div>
                            <div className="info__container__headings">Stats</div>
                            <div className="info__container__data__data">
                                
                                {props.stats.map((stat) =>
                                    <div className="info__container__stat__columns">
                                        <div className="info__container__stat__columns__name">{stat['stat__name']}</div>
                                        <div><h4>{stat['stat__val']}</h4></div>  
                                    </div>                                                     
                                )}
                            </div>
                        </div>
                    </div>
                </Dialog>
            </div>
        </StylesProvider>
        </>
    );
}
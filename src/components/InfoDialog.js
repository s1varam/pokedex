import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { StylesProvider } from "@material-ui/core/styles";
import './InfoDialog.css';

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

export default function InfoDialog(props) {

    var color1, color2;

    switch (props.category[0].type.name) {
        case "grass":
            color1 = "rgba(155, 204, 80,0.65)";
            break;
        case "poison":
            color1 = "rgba(185, 127, 201,0.6)";
            break;
        case "normal":
            color1 = "#dcdcdc";
            break;
        case "fire":
            color1 = "rgba(253, 125, 36, 0.4)";
            break;
        case "water":
            color1 = "rgba(69, 146, 196, 0.5)";
            break;
        case "electric":
            color1 = "rgba(239, 214, 54, 0.75)";
            break;
        case "ice":
            color1 = "#51c4e7";
            break;
        case "fighting":
            color1 = "rgba(213, 103, 35, 0.65)";
            break;
        case "ground":
            color1 = "rgba(247, 222, 63,0.5)";
            break;
        case "flying":
            color1 = "rgba(61, 199, 239, 0.65)";
            break;
        case "psychic":
            color1 = "rgba(243, 102, 185, 0.65)";
            break;
        case "bug":
            color1 = "rgba(114, 159, 63, 0.6)";
            break;
        case "rock":
            color1 = "rgba(163, 140, 33, 0.6)";
            break;
        case "ghost":
            color1 = "rgba(123, 98, 163, 0.5)";
            break;
        case "dark":
            color1 = "rgba(112, 112, 112, 0.6)";
            break;
        case "dragon":
            color1 = "#f26f58";
            break;
        case "steel":
            color1 = "#9fb8b9";
            break;
        case "fairy":
            color1 = "#fdb9e9";
            break;
        default:
        // code block
    }

    if (props.category.length === 2) {

        switch (props.category[1].type.name) {
            case "grass":
                color2 = "rgba(155, 204, 80,0.65)";
                break;
            case "poison":
                color2 = "rgba(185, 127, 201,0.6)";
                break;
            case "normal":
                color2 = "#dcdcdc";
                break;
            case "fire":
                color2 = "rgba(253, 125, 36, 0.4)";
                break;
            case "water":
                color2 = "rgba(69, 146, 196, 0.5)";
                break;
            case "electric":
                color2 = "rgba(239, 214, 54, 0.75)";
                break;
            case "ice":
                color2 = "#51c4e7";
                break;
            case "fighting":
                color2 = "rgba(213, 103, 35, 0.65)";
                break;
            case "ground":
                color2 = "rgba(247, 222, 63,0.5)";
                break;
            case "flying":
                color2 = "rgba(61, 199, 239, 0.65)";
                break;
            case "psychic":
                color2 = "rgba(243, 102, 185, 0.65)";
                break;
            case "bug":
                color2 = "rgba(114, 159, 63, 0.6)";
                break;
            case "rock":
                color2 = "rgba(163, 140, 33, 0.6)";
                break;
            case "ghost":
                color2 = "rgba(123, 98, 163, 0.5)";
                break;
            case "dark":
                color2 = "rgba(112, 112, 112, 0.6)";
                break;
            case "dragon":
                color2 = "#f26f58";
                break;
            case "steel":
                color2 = "#9fb8b9";
                break;
            case "fairy":
                color2 = "#fdb9e9";
                break;
            default:
            // code block
        }
    } else if (props.category.length === 1) {
        color2 = color1;
    }

    return (
        <>
            <StylesProvider injectFirst>
                <div>

                    {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      
                    <Dialog aria-labelledby="customized-dialog-title" open={props.open} onBackdropClick={props.cancel} fullWidth maxWidth="md" className="dialog__bg noselect">
                        {/* <img src='https://d30y9cdsu7xlg0.cloudfront.net/png/53504-200.png' onClick={props.cancel} style={closeImg} /> */}
                        <DialogContent style={{ background: `linear-gradient(${color1}, ${color2})` }} className="dialog__content">
                            <div className="info__container">
                                <div className="info__container__img">
                                    <div className="pokemon__id">
                                        #{String(props.number).padStart(3, '0')}
                                    </div>
                                    <div className="pokemon__name">
                                        {props.name}
                                    </div>
                                    <div>
                                        <img src={props.img} alt="poke-img"/>
                                    </div>
                                    <div className="info__container__data__type">
                                        {/* <p className="info__container__headings">Type</p> */}
                                        {props.category.map((category) =>
                                            <div className={`poke__type__bg ${category.type.name}`}>
                                                <img src={`${category.type.name}.png`} title={category.type.name} alt="poke-type"></img>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <p className="dimensions"><span className="info__container__headings">Height</span> {`${props.height / 10} m`} </p>
                                        <p className="dimensions"><span className="info__container__headings">Weight</span>{` ${props.weight / 10} kg`}</p>
                                    </div>
                                </div>

                                <div className="info__container__data">
                                    {/* <div><img src='https://d30y9cdsu7xlg0.cloudfront.net/png/53504-200.png' className="close__btn" onClick={props.cancel} style={closeImg} /></div> */}
                                    <div className="right__box">
                                    <div className="info__container__headings">About</div>
                                        <div className="desc">
                                            {props.description}
                                        </div>
                                        <div className="info__container__data__header">
                                            <div className="info__container__data__abilities">
                                                <div className="info__container__headings">Abilities</div>
                                                <div>
                                                    {props.abilities.map((ability) =>
                                                        <div className="ability">{ability}&nbsp;</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>


                                        <div>
                                            <div className="info__container__headings stats">Stats</div>
                                            <div className="info__container__data__data">
                                                {props.stats.map((stat) =>
                                                    <div className="info__container__stat__columns">
                                                        <div className="info__container__stat__columns__name">{stat['stat__name']}</div>
                                                        <div className="info__container__stat__columns__val">{stat['stat__val']}</div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </StylesProvider>
        </>
    );
}
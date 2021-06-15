import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { StylesProvider } from "@material-ui/core/styles";
import './InfoDialog.css';
import { colorTypeGradients } from '../utils';

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

export default function InfoDialog(props) {

    var finalColor;

    if(props.category.length === 2){
        finalColor = colorTypeGradients(props.category[0].type.name,props.category[1].type.name,props.category.length);
    }else{
        finalColor = colorTypeGradients(props.category[0].type.name,props.category[0].type.name,props.category.length);
    }

   
    return (
        <>
            <StylesProvider injectFirst>
                <div>
                    <Dialog aria-labelledby="customized-dialog-title" open={props.open} onBackdropClick={props.cancel} fullWidth maxWidth="md" className="dialog__bg noselect">
                        <DialogContent style={{ background: `linear-gradient(${finalColor[0]}, ${finalColor[1]})` }} className="dialog__content">
                            <div className="info__container">
                                <div className="info__container__img">
                                    <div className="pokemon__id">
                                        #{String(props.number).padStart(3, '0')}
                                    </div>
                                    <div className="pokemon__name">
                                        {props.name}
                                    </div>
                                    <div>
                                        <img src={props.img} alt="pokemon-img" />
                                    </div>
                                    <div className="info__container__data__type">
                                        {props.category.map((category) =>
                                            <div className={`poke__type__bg ${category.type.name}`}>
                                                <img src={`types/${category.type.name}.png`} title={category.type.name} alt="poketype-img"></img>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <p className="dimensions"><span className="info__container__headings">Height</span> {`${props.height / 10} m`} </p>
                                        <p className="dimensions"><span className="info__container__headings">Weight</span>{` ${props.weight / 10} kg`}</p>
                                    </div>
                                </div>

                                <div className="info__container__data">
                                    <div className="right__box">
                                        <div>
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
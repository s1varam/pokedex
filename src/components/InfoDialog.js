import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { StylesProvider } from "@material-ui/core/styles";
import '../styles/InfoDialog.css';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Delayed from './Delayed';
import { colorTypeGradients } from '../utils/utils';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

export default function InfoDialog(props) {

    var finalColor;

    if (props.category.length === 2) {
        finalColor = colorTypeGradients(props.category[0].type.name, props.category[1].type.name, props.category.length);
    } else {
        finalColor = colorTypeGradients(props.category[0].type.name, props.category[0].type.name, props.category.length);
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
                                        <img src={props.img} alt="poke-img" />
                                    </div>
                                    <div className="info__container__data__type">
                                        {props.category.map((category) =>
                                            <Tooltip TransitionComponent={Zoom} key={category.type.name} title={category.type.name} arrow>
                                                <div key={category.type.name} className={`poke__type__bg ${category.type.name}`}>
                                                    <img src={`${category.type.name}.png`} title={category.type.name} alt="poke-type"></img>
                                                </div>
                                            </Tooltip>
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
                                            <div className="info__container__headings">About</div>
                                            <div className="desc">
                                                {props.description}
                                            </div>
                                        </div>
                                        <div className="info__container__data__header">
                                            <div className="info__container__data__abilities">
                                                <div className="info__container__headings">Abilities</div>
                                                <div>
                                                    <ul className="ability__list">
                                                        {props.abilities.map((ability) =>
                                                            <li key={ability}>
                                                                <div className="ability">{ability}&nbsp;</div>
                                                            </li>
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="info__container__headings stats">Base Stats</div>
                                            <div className="info__container__data__data">
                                                {props.stats.map((stat) =>
                                                    <div key={stat['stat__name']} className="info__container__stat__columns">
                                                        <div className="info__container__stat__columns__name">{stat['stat__name']}</div>
                                                        <div className="info__container__stat__columns__val">{stat['stat__val']}</div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="info__container__headings">Evolution</div>
                                            <div className="evolution__box">
                                                {props.evoChain.map((value, index, elements) =>
                                                    <Delayed waitBeforeShow={(index + 0) * 800} key={elements[index].species_name}>
                                                        <div className="evolution__sub__box">
                                                            <div>

                                                                <div className="evolution__img__div" style={{ background: `linear-gradient(${finalColor[0]}, ${finalColor[1]})` }}>
                                                                    <LazyLoadImage
                                                                        alt="image-pokemon"
                                                                        height={80}
                                                                        width={80}
                                                                        src={elements[index].image_url}
                                                                        visibleByDefault={false}
                                                                        delayMethod={'debounce'}
                                                                        effect="blur"
                                                                        className="evo_img"
                                                                        onClick={() => props.evolutionPokemon(props.number, elements[index].species_name, props.category, elements[index].image_url)}
                                                                    />
                                                                    {/* <img src={elements[index].image_url} className="evo_img" /> */}
                                                                </div>
                                                                <div className="evolution__poke__name">{elements[index].species_name}</div>
                                                            </div>
                                                            {elements[index + 1] && <ArrowRightAltIcon className="arrow__right"></ArrowRightAltIcon>}
                                                        </div>
                                                    </Delayed>
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
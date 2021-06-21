import React from 'react'
import './Pokemon.css'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Pokemon = ({ id, image, name, type, onElemClick }) => {
    // const style = `thumbnail__container ${type}`;

    var color1, color2;


    switch (type[0].type.name) {
        case "grass":
            color1 = "rgb(155, 204, 80)";
            break;
        case "poison":
            color1 = "rgb(185, 127, 201)";
            break;
        case "normal":
            color1 = "#dcdcdc";
            break;
        case "fire":
            color1 = "rgb(228 160 114)";
            break;
        case "water":
            color1 = "#8cc4e2";
            break;
        case "electric":
            color1 = "rgb(239, 214, 54)";
            break;
        case "ice":
            color1 = "#51c4e7";
            break;
        case "fighting":
            color1 = "rgb(213, 103, 35)";
            break;
        case "ground":
            color1 = "rgb(247, 222, 63)";
            break;
        case "flying":
            color1 = "rgb(61, 199, 239)";
            break;
        case "psychic":
            color1 = "rgb(243, 102, 185)";
            break;
        case "bug":
            color1 = "rgb(114, 159, 63)";
            break;
        case "rock":
            color1 = "rgb(163, 140, 33)";
            break;
        case "ghost":
            color1 = "rgb(123, 98, 163)";
            break;
        case "dark":
            color1 = "rgb(112, 112, 112)";
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

    if (type.length === 2) {

        switch (type[1].type.name) {
            case "grass":
                color2 = "rgb(155, 204, 80)";
                break;
            case "poison":
                color2 = "rgb(185, 127, 201)";
                break;
            case "normal":
                color2 = "#dcdcdc";
                break;
            case "fire":
                color2 = "rgb(228 160 114)";
                break;
            case "water":
                color2 = "#8cc4e2";
                break;
            case "electric":
                color2 = "rgb(239, 214, 54)";
                break;
            case "ice":
                color2 = "#51c4e7";
                break;
            case "fighting":
                color2 = "rgb(213, 103, 35)";
                break;
            case "ground":
                color2 = "rgb(247, 222, 63)";
                break;
            case "flying":
                color2 = "rgb(61, 199, 239)";
                break;
            case "psychic":
                color2 = "rgb(243, 102, 185)";
                break;
            case "bug":
                color2 = "rgb(114, 159, 63)";
                break;
            case "rock":
                color2 = "rgb(163, 140, 33)";
                break;
            case "ghost":
                color2 = "rgb(123, 98, 163)";
                break;
            case "dark":
                color2 = "rgb(112, 112, 112)";
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
    } else if (type.length === 1) {
        color2 = color1;
    }

    return (
        <div className="thumbnail__container noselect" style={{ background: `linear-gradient(${color1}, ${color2})` }}>
            <div className="card__header">
                <div className="poke__number">
                    #{String(id).padStart(3, '0')}
                </div>
                <div className="info__icon" onClick={() => onElemClick({ name })}>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path></svg>
                </div>
            </div>
            <div className="image__container">
                <LazyLoadImage
                    alt="image-pokemon"
                    height={150}
                    src={image}
                    visibleByDefault={false}
                    delayMethod={'debounce'}
                    effect="blur"
                />
                
            </div>
            <div className="poke__name" >
                <h3>{name}</h3>
                <div className="poke__type">
                    {type.map((type) =>
                        <div className={`poke__type__bg ${type.type.name}`}>
                            <img src={`${type.type.name}.png`} title={type.type.name} alt="poke-type"></img>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default Pokemon

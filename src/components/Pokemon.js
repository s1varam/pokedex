import React from 'react'
import './Pokemon.css'

const Pokemon = ({ id, image, name, type, onElemClick }) => {
    // const style = `thumbnail__container ${type}`;

    var color1, color2;


    switch (type[0].type.name) {
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

    if (type.length == 2) {

        switch (type[1].type.name) {
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
    } else if (type.length == 1) {
        // console.log("else if babyyyy");
        color2 = color1;
    }

    return (
        <div className={`thumbnail__container`} style={{ background: `linear-gradient(${color1}, ${color2})` }}>
            <div className="card__header">
                <div className="poke__number">
                    #{String(id).padStart(3, '0')}
                </div>
                <div className="info__icon" onClick={() => onElemClick({ name })}>
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path></svg>
                </div>
            </div>
            <div className="image__container">
                <img src={image} alt={name}></img>
            </div>
            <div className="poke__name" >
                <h3>{name}</h3>
                <div className="poke__type">
                    {type.map((type) =>
                        // <small>
                        //     {type.type.name}<br></br>
                        // </small>
                        // src= "../assets/images/icons/" + type+".png"
                        <div className={`poke__type__bg ${type.type.name}`}>
                            <img src={`${type.type.name}.png`} title={type.type.name}></img>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default Pokemon

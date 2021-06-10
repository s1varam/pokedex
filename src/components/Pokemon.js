import React from 'react'
import './Pokemon.css'

const Pokemon = ({ id, image, name, type, onElemClick }) => {
    // const style = `thumbnail__container ${type}`;

    var color1, color2;


    switch (type[0].type.name) {
        case "grass":
            color1 = "#9bcc50";
            break;
        case "poison":
            color1 = "#b97fc9";
            break;
        case "normal":
            color1 = "#f2f2f2";
            break;
        case "fire":
            color1 = "#fd7d24";
            break;
        case "water":
            color1 = "#4592c4";
            break;
        case "electric":
            color1 = "#efd636";
            break;
        case "ice":
            color1 = "#51c4e7";
            break;
        case "fighting":
            color1 = "#d56723";
            break;
        case "ground":
            color1 = "#f7de3f";
            break;
        case "flying":
            color1 = "#3dc7ef";
            break;
        case "psychic":
            color1 = "#f366b9";
            break;
        case "bug":
            color1 = "#729f3f";
            break;
        case "rock":
            color1 = "#a38c21";
            break;
        case "ghost":
            color1 = "#7b62a3";
            break;
        case "dark":
            color1 = "#707070";
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
                color2 = "#9bcc50";
                break;
            case "poison":
                color2 = "#b97fc9";
                break;
            case "normal":
                color2 = "#f2f2f2";
                break;
            case "fire":
                color2 = "#fd7d24";
                break;
            case "water":
                color2 = "#4592c4";
                break;
            case "electric":
                color2 = "#efd636";
                break;
            case "ice":
                color2 = "#51c4e7";
                break;
            case "fighting":
                color2 = "#d56723";
                break;
            case "ground":
                color2 = "#f7de3f";
                break;
            case "flying":
                color2 = "#3dc7ef";
                break;
            case "psychic":
                color2 = "#f366b9";
                break;
            case "bug":
                color2 = "#729f3f";
                break;
            case "rock":
                color2 = "#a38c21";
                break;
            case "ghost":
                color2 = "#7b62a3";
                break;
            case "dark":
                color2 = "#707070";
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
        console.log("else if babyyyy");
        color2 = color1;
    }

    return (
        <div className={`thumbnail__container`} style={{ background: `linear-gradient(${color1}, ${color2})` }}>
            <div className="info__icon" onClick={() => onElemClick({ name })}>
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path></svg>
            </div>
            <div className="poke__number">
                <small>#0{id}</small>
            </div>
            <img src={image} alt={name}></img>
            <div>
                <h3>{name}</h3>
                {type.map((type) =>
                    <small>
                        {type.type.name}<br></br>
                    </small>
                )}
            </div>
        </div>
    )
}

export default Pokemon

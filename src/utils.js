export const colorTypeGradients = (type1, type2, length) => {

    debugger
    var color1, color2;

    switch (type1) {
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
            color1 = "gainsboro";
            break;
    }

    if (length === 2) {

        switch (type2) {
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
                color2 = "gainsboro";
                break;
        }
    } else if (length === 1) {
        color2 = color1;
    }

    var finalColor = [color1,color2];

    return finalColor;

}
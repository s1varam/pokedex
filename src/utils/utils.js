export const colorTypeGradients = (type1, type2, length) => {

    // debugger
    let color1, color2;

    switch (type1) {
        case "grass":
            color1 = "#a8ff98";
            break;
        case "poison":
            color1 = "#d6a2e4";
            break;
        case "normal":
            color1 = "#dcdcdc";
            break;
        case "fire":
            color1 = "#ffb971";
            break;
        case "water":
            color1 = "#8cc4e2";
            break;
        case "electric":
            color1 = "#ffe662";
            break;
        case "ice":
            color1 = "#8cf5e4";
            break;
        case "fighting":
            color1 = "#da7589";
            break;
        case "ground":
            color1 = "#e69a74";
            break;
        case "flying":
            color1 = "#bbc9e4";
            break;
        case "psychic":
            color1 = "#ffa5da";
            break;
        case "bug":
            color1 = "#bae05f";
            break;
        case "rock":
            color1 = "#C9BB8A";
            break;
        case "ghost":
            color1 = "#8291e0";
            break;
        case "dark":
            color1 = "#8e8c94";
            break;
        case "dragon":
            color1 = "#88a2e8";
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
                color2 = "#a8ff98";
                break;
            case "poison":
                color2 = "#d6a2e4";
                break;
            case "normal":
                color2 = "#dcdcdc";
                break;
            case "fire":
                color2 = "#ffb971";
                break;
            case "water":
                color2 = "#8cc4e2";
                break;
            case "electric":
                color2 = "#ffe662";
                break;
            case "ice":
                color2 = "#8cf5e4";
                break;
            case "fighting":
                color2 = "#da7589";
                break;
            case "ground":
                color2 = "#e69a74";
                break;
            case "flying":
                color2 = "#bbc9e4";
                break;
            case "psychic":
                color2 = "#ffa5da";
                break;
            case "bug":
                color2 = "#bae05f";
                break;
            case "rock":
                color2 = "#C9BB8A";
                break;
            case "ghost":
                color2 = "#8291e0";
                break;
            case "dark":
                color2 = "#8e8c94";
                break;
            case "dragon":
                color2 = "#88a2e8";
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

    const finalColor = [color1,color2];

    return finalColor;

}
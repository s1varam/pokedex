import React from 'react';
// import CryptoJS from '../libs/aes';

import Pokemon from "./components/Pokemon";
import PokeLogo from "../src/assets/images/poke_logo.png";
import GottaCatch from '../src/assets/images/gottacatch.png'
import PokeBall from "../src/assets/images/Pokeball.png"
import InfoDialog from "./components/InfoDialog";
import Loading from '../src/assets/images/loading.gif'
import axios from 'axios';
import { Sync } from '@material-ui/icons';

// import BackDropLoader from './loader/backdrop';
// import {Alert,AlertTitle} from '@material-ui/lab';


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allPokemons: [],
            searchPokemons: [],
            loadMore: "https://pokeapi.co/api/v2/pokemon?limit=200",
            abilities: "",
            height: "",
            weight: "",
            catergory: "",
            stats: [],
            imageURL: "",
            pokeName: "",
            showInfo: false,
            search: false,
            searchString: "",
            description: "",
            showLoading: true,

        }
    }

    componentWillMount() {
        this.getAllPokemons();
    }



    getAllPokemons = async () => {
        debugger

        const response = await axios.get(this.state.loadMore).catch((err) => console.log("Error:", err));

        this.setState({
            loadMore: response.data.next,
        })

        this.getPokemonData(response.data.results);

    }

    getPokemonData = async (result) => {

        var response;
        for (var i = 0; i < result.length; i++) {
            response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${result[i].name}`).catch((err) => console.log("Error:", err));
            this.state.allPokemons.push(response.data)
        }

        this.setState({
            allPokemons: this.state.allPokemons,
            showLoading: false,
        })

        console.log(this.state.allPokemons);

    }

    fetchPokemonData = async (pokemon, category, imageURL) => {

        this.setState({
            abilities: [],
            stats: []
        })

        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`).catch((err) => console.log("Error:", err));
        console.log(response);

        for (var i = 0; i < response.data.abilities.length; i++) {
            this.state.abilities.push(response.data.abilities[i].ability.name);
        }

        for (var j = 0; j < response.data.stats.length; j++) {
            var Obj = {};
            Obj['stat__name'] = response.data.stats[j].stat.name;
            Obj['stat__val'] = response.data.stats[j].base_stat;
            this.state.stats.push(Obj);
        }

        this.setState({
            weight: response.data.weight,
            height: response.data.height,
            category: category,
            abilities: this.state.abilities,
            imageURL: imageURL,
            pokeName: pokemon,
            showInfo: true,
        })

        console.log("stats");
        console.log(this.state.stats);

        this.fetchPokemonDescription(pokemon);

    }

    fetchPokemonDescription = async (pokemon_name) => {
        debugger
        var desc;

        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon_name}`).catch((err) => console.log("Error:", err));

            for (var i = 0; i < response.data.flavor_text_entries.length - 1; i++) {
                if (response.data.flavor_text_entries[i].language.name === "en") {
                    this.state.description = response.data.flavor_text_entries[i].flavor_text;
                    break;
                }
            }

            this.setState({
                description: this.state.description,
            })
        } catch (e) {
            this.setState({
                description: "Description not found",
            })
        }

        console.log("description");
        console.log(desc);
    }

    closeDialog = () => {
        this.setState({
            showInfo: false,
        })
    }

    render() {
        return (
            <>
                {this.state.showLoading && <div className="app__container"><img src={Loading}></img></div>}
                {!this.state.showLoading && <div className="app__container">
                    {this.state.showInfo &&
                        <InfoDialog
                            open={this.state.showInfo}
                            abilities={this.state.abilities}
                            height={this.state.height}
                            weight={this.state.weight}
                            category={this.state.category}
                            stats={this.state.stats}
                            img={this.state.imageURL}
                            name={this.state.pokeName}
                            description={this.state.description}
                            cancel={() => this.closeDialog()}>
                        </InfoDialog>}
                    <div className="app__header">
                        <div className="poke__logos">
                            <img src={PokeLogo} alt="pokelogo" className="poke__logo" />
                            <img src={GottaCatch} className="gotta__logo" alt="gottacatch" />
                        </div>
                        {/* <div>
                            <div>
                                <input type="text" onInput={e => setSearchString(e.target.value)}></input>
                            </div>
                            <div>
                                <button type="button" onClick={() => filterPokemons()}>Search</button>
                                <button type="button" onClick={() => clearSearch()} onChange={evt => updateInputValue(evt)}>Clear</button>
                            </div>
                        </div> */}
                        <div className="pokeball__box">
                            <img src={PokeBall} className="pokeball" alt="pokeball" />
                        </div>
                    </div>
                    <div className="pokemon__container">
                        <div className="all__pokemons">

                            {Object.keys(this.state.allPokemons).map((item, index) =>
                                <Pokemon
                                    key={index}
                                    id={this.state.allPokemons[item].id}
                                    image={this.state.allPokemons[item].sprites.other.dream_world.front_default ? this.state.allPokemons[item].sprites.other.dream_world.front_default : this.state.allPokemons[item].sprites.other['official-artwork'].front_default}
                                    name={this.state.allPokemons[item].name}
                                    type={this.state.allPokemons[item].types}
                                    onElemClick={() => this.fetchPokemonData(this.state.allPokemons[item].name, this.state.allPokemons[item].types, this.state.allPokemons[item].sprites.other.dream_world.front_default ? this.state.allPokemons[item].sprites.other.dream_world.front_default : this.state.allPokemons[item].sprites.other['official-artwork'].front_default)}
                                />
                            )}
                        </div>
                        <button className="load__more" onClick={() => this.getAllPokemons()}>Load More</button>
                    </div>
                </div>}
            </>

        )
    }
}

export default App;
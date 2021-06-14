import React from 'react';
// import CryptoJS from '../libs/aes';

import Pokemon from "./components/Pokemon";
import PokeLogo from "../src/assets/images/poke_logo.png";
import PokeBall from "../src/assets/images/Pokeball.png"
import InfoDialog from "./components/InfoDialog";
import Loading from '../src/assets/images/loading.gif'
import axios from 'axios';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allPokemons: [],
            searchPokemons: [],
            swapPokemons: [],
            filterPokemons: [],
            abilities: "",
            height: "",
            weight: "",
            catergory: "",
            stats: [],
            imageURL: "",
            pokeName: "",
            showInfo: false,
            isSearch: false,
            searchString: "",
            description: "",
            showLoading: true,
            isFilter: false,
            limit: 151,
            offset: 0,
            regions: [
                {
                    name: "Kanto",
                    limit: 151,
                    offset: 0,
                },
                {
                    name: "Johto",
                    limit: 100,
                    offset: 151,
                },
                {
                    name: "Hoenn",
                    limit: 135,
                    offset: 251,
                },
                {
                    name: "Sinnoh",
                    limit: 108,
                    offset: 386,
                },
                {
                    name: "Unova",
                    limit: 155,
                    offset: 494,
                },
                {
                    name: "Kalos",
                    limit: 72,
                    offset: 649,
                },
                {
                    name: "Gen 7",
                    limit: 88,
                    offset: 721,
                },
                {
                    name: "Gen 8",
                    limit: 89,
                    offset: 809,
                }
            ],
            types: [
                "all types", "grass", "bug", "dark", "dragon", "electric", "fairy", "fighting", "fire", "flying", "ghost", "ground", "ice", "normal", "poison", "psychic", "rock", "steel", "water"
            ]

        }
    }

    componentWillMount() {
        this.getAllPokemons();
    }



    getAllPokemons = async () => {
        debugger

        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${this.state.limit}&offset=${this.state.offset}`).catch((err) => console.log("Error:", err));

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

    handleChangeRegions = (event) => {

        debugger

        this.state.isFilter = false;

        for (var i = 0; i < this.state.regions.length; i++) {
            if (this.state.regions[i].name === event.target.value) {
                this.state.limit = this.state.regions[i].limit;
                this.state.offset = this.state.regions[i].offset;
                this.state.allPokemons = [];
                this.state.showLoading = true;

                this.setState({
                    valueregion: event.target.value,
                    valuetype: "all types",
                    isSearch: false
                })

                break;
            }
        }

        // this.state.limit = region.limit;
        // this.state.offset = region.offset;
        // this.state.allPokemons = [];
        // this.state.showLoading = true;

        // this.setState({
        //     allPokemons : [],
        //     limit : region.limit,
        //     offset: region.offset,
        // })

        this.forceUpdate();

        console.log("limit");
        console.log(event.target.value);
        // console.log("offset");
        // console.log(this.state.offset)

        this.getAllPokemons();
    }

    handleChangeTypes = (event) => {

        debugger

        if (event.target.value === "all types") {
            this.setState({
                isFilter: false,
                valuetype: event.target.value,
            })
            return;
        }

        // this.state.swapPokemons = this.state.allPokemons;
        this.state.isSearch = false;
        this.state.valuesearch = "";
        this.state.isFilter = true;
        this.state.filterPokemons = [];

        for (var i = 0; i < this.state.allPokemons.length; i++) {
            for (var j = 0; j < this.state.allPokemons[i].types.length; j++) {
                if (event.target.value === this.state.allPokemons[i].types[j].type.name) {
                    this.state.filterPokemons.push(this.state.allPokemons[i])
                }
            }
        }

        this.setState({
            valuetype: event.target.value,
        })

        // this.state.allPokemons = this.state.filterPokemons;
        this.forceUpdate();

    }

    handleChangeSearch = (event) => {

        debugger

        event.target.value.length > 0 ? this.setState({ isSearch: true, valuetype: "all types", valuesearch : event.target.value}) : this.setState({ isSearch: false, isFilter: false, valuesearch : event.target.value });

        this.state.searchPokemons = [];

        for (var i = 0; i < this.state.allPokemons.length; i++) {
            if (this.state.allPokemons[i].name.includes(event.target.value)) {
                this.state.searchPokemons.push(this.state.allPokemons[i]);
            }
        }

        console.log("search array");
        console.log(this.state.searchPokemons);

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
                    {/* <Header
                        className="container__header"
                        regions={this.state.regions}
                    /> */}
                    <div className="app__header">
                        <div className="poke__logos">
                            <img src={PokeLogo} alt="pokelogo" className="poke__logo" />
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
                        {/* <SimpleSelect regions={this.state.regions} cancel={this.setSelection}></SimpleSelect> */}
                        <select value={this.state.valueregion} onChange={this.handleChangeRegions}>
                            {this.state.regions.map((region) => (
                                <option value={region.name}>{region.name}&nbsp;({region.offset + 1}-{region.limit + region.offset})</option>
                            ))}

                        </select>
                        <select value={this.state.valuetype} onChange={this.handleChangeTypes}>
                            {this.state.types.map((type) => (
                                <option value={type}>{type}</option>
                            ))}
                        </select>
                        <label>
                            Search:
                            <input type="text" value={this.state.valuesearch} onChange={this.handleChangeSearch} />
                        </label>

                        <div className="pokeball__box">
                            <img src={PokeBall} className="pokeball" alt="pokeball" />
                        </div>
                    </div>
                    <div className="pokemon__container">
                        <div className="all__pokemons">
                            {this.state.isSearch ? Object.keys(this.state.searchPokemons).map((item, index) =>
                                <Pokemon
                                    key={index}
                                    id={this.state.searchPokemons[item].id}
                                    image={this.state.searchPokemons[item].sprites.other.dream_world.front_default ? this.state.searchPokemons[item].sprites.other.dream_world.front_default : this.state.searchPokemons[item].sprites.other['official-artwork'].front_default}
                                    name={this.state.searchPokemons[item].name}
                                    type={this.state.searchPokemons[item].types}
                                    onElemClick={() => this.fetchPokemonData(this.state.searchPokemons[item].name, this.state.searchPokemons[item].types, this.state.searchPokemons[item].sprites.other.dream_world.front_default ? this.state.searchPokemons[item].sprites.other.dream_world.front_default : this.state.searchPokemons[item].sprites.other['official-artwork'].front_default)}
                                />) :



                                (!this.state.isFilter ? Object.keys(this.state.allPokemons).map((item, index) =>
                                    <Pokemon
                                        key={index}
                                        id={this.state.allPokemons[item].id}
                                        image={this.state.allPokemons[item].sprites.other.dream_world.front_default ? this.state.allPokemons[item].sprites.other.dream_world.front_default : this.state.allPokemons[item].sprites.other['official-artwork'].front_default}
                                        name={this.state.allPokemons[item].name}
                                        type={this.state.allPokemons[item].types}
                                        onElemClick={() => this.fetchPokemonData(this.state.allPokemons[item].name, this.state.allPokemons[item].types, this.state.allPokemons[item].sprites.other.dream_world.front_default ? this.state.allPokemons[item].sprites.other.dream_world.front_default : this.state.allPokemons[item].sprites.other['official-artwork'].front_default)}
                                    />
                                ) :
                                    Object.keys(this.state.filterPokemons).map((item, index) =>
                                        <Pokemon
                                            key={index}
                                            id={this.state.filterPokemons[item].id}
                                            image={this.state.filterPokemons[item].sprites.other.dream_world.front_default ? this.state.filterPokemons[item].sprites.other.dream_world.front_default : this.state.filterPokemons[item].sprites.other['official-artwork'].front_default}
                                            name={this.state.filterPokemons[item].name}
                                            type={this.state.filterPokemons[item].types}
                                            onElemClick={() => this.fetchPokemonData(this.state.filterPokemons[item].name, this.state.filterPokemons[item].types, this.state.filterPokemons[item].sprites.other.dream_world.front_default ? this.state.filterPokemons[item].sprites.other.dream_world.front_default : this.state.filterPokemons[item].sprites.other['official-artwork'].front_default)}
                                        />
                                    ))
                            }
                        </div>
                        {/* <button className="load__more" onClick={() => this.getAllPokemons()}>Load More</button> */}
                    </div>
                </div>}
            </>

        )
    }
}

export default App;
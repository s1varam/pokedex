import React from 'react';
import Pokemon from "./components/Pokemon";
import Pokedex from "../src/assets/images/pokedex.png";
import InfoDialog from "./components/InfoDialog";
import axios from 'axios';
import GitHubIcon from '@material-ui/icons/GitHub';

const delay = ms => new Promise(res => setTimeout(res, ms));

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
            pokeNumber: "",
            showInfo: false,
            isSearch: false,
            searchString: "",
            description: "",
            showLoading: true,
            isFilter: false,
            noDataFound: false,
            limit: 151,
            offset: 0,
            isChecked: false,
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
                    name: "Alola",
                    limit: 88,
                    offset: 721,
                },
                {
                    name: "Galar",
                    limit: 89,
                    offset: 809,
                }
            ],
            types: [
                "all types", "grass", "bug", "dark", "dragon", "electric", "fairy", "fighting", "fire", "flying", "ghost", "ground", "ice", "normal", "poison", "psychic", "rock", "steel", "water"
            ]

        }
    }

    componentDidMount() {
        this.getAllPokemons(this.state.offset, this.state.limit);
        var currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === "dark") {
            this.setState({
                isChecked: true,
            })
        }
        console.log("component mounted");
    }

    getAllPokemons = async (offset, limit) => {
        // debugger

        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`).catch((err) => console.log("Error:", err));
        this.getPokemonData(response.data.results);

    }

    getPokemonData = async (result) => {

        var pokemonArr = [];

        await Promise.all(
            result.map((pokemonItem) => {
                return axios
                    .get(`https://pokeapi.co/api/v2/pokemon/${pokemonItem.name}`)
                    .then((result) => {
                        pokemonArr.push(result.data);
                    });
            })
        );

        pokemonArr.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))

        this.setState({
            allPokemons: pokemonArr,
            showLoading : false,
        })

        console.log("allPokes");
        console.log(this.state.allPokemons);

    }

    fetchPokemonData = async (number, pokemon, category, imageURL) => {

        debugger

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
            pokeNumber: number,
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

        // this.state.allPokemons = [];
        // var emptyArray = [];

        // this.setState({
        //     allPokemons : emptyArray,
        // })

        // this.state.isFilter = false;

        for (var i = 0; i < this.state.regions.length; i++) {
            if (this.state.regions[i].name === event.target.value) {
                // this.state.limit = this.state.regions[i].limit;
                // this.state.offset = this.state.regions[i].offset;
                // this.state.allPokemons = [];
                // this.state.showLoading = true;

                this.setState({
                    valueregion: event.target.value,
                    valuetype: "all types",
                    isSearch: false,
                    isFilter: false,
                    showLoading: false,
                })

                this.getAllPokemons(this.state.regions[i].offset, this.state.regions[i].limit);

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

        // this.forceUpdate();

        // this.setState({
        //     allPokemons : [],
        // }, () => {
        //     // this.getAllPokemons();
        // })

        console.log("limit");
        console.log(event.target.value);
        // console.log("offset");
        // console.log(this.state.offset)

        // this.getAllPokemons();
    }

    handleChangeTypes = async (event) => {

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
                    // this.state.filterPokemons.push(this.state.allPokemons[i])
                    this.setState({
                        filterPokemons: this.state.filterPokemons.concat(this.state.allPokemons[i])
                    })
                }
            }
        }

        this.state.filterPokemons.length === 0 ? this.setState({ noDataFound: true }) : this.setState({ noDataFound: false })

        this.setState({
            valuetype: event.target.value,
        })

        // this.state.allPokemons = this.state.filterPokemons;
        this.forceUpdate();

    }

    handleChangeSearch = (event) => {

        debugger

        event.target.value.length > 0 ? this.setState({ isSearch: true, valuetype: "all types", valuesearch: event.target.value }) : this.setState({ isSearch: false, isFilter: false, valuesearch: event.target.value });

        this.state.searchPokemons = [];

        for (var i = 0; i < this.state.allPokemons.length; i++) {
            if (this.state.allPokemons[i].name.includes(event.target.value.toLowerCase())) {
                this.state.searchPokemons.push(this.state.allPokemons[i]);
            }
        }

        this.state.searchPokemons.length === 0 ? this.setState({ noDataFound: true }) : this.setState({ noDataFound: false })

        console.log("search array");
        console.log(this.state.searchPokemons);

    }

    openGithub = () => {
        window.open("https://github.com/s1varam/pokedex");
    }

    changeTheme = () => {

        debugger
        var currentTheme = document.documentElement.getAttribute('data-theme');
        console.log(currentTheme);

        var targetTheme = "light";
        var modeSwitchText = "Light"

        if (currentTheme === "light") {
            targetTheme = "dark";

            this.setState({
                isChecked: true,
            })

            console.log(targetTheme);
        } else {
            this.setState({
                isChecked: false,
            })
        }

        // var modeSwitch = document.getElementById("mode__label");
        // modeSwitch.innerText = modeSwitchText;

        document.documentElement.setAttribute('data-theme', targetTheme)

    }

    render() {
        return (
            <>
                {this.state.showLoading &&
                    <div className="app__container">
                        <div className="loading__text">
                            Loading
                        </div>
                        <div className="gif__container">
                            <img src="https://i.gifer.com/VgI.gif" className="loading__gif noselect"></img>
                        </div>
                    </div>}
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
                            number={this.state.pokeNumber}
                            description={this.state.description}
                            cancel={() => this.closeDialog()}>
                        </InfoDialog>}
                    {/* <Header
                        className="container__header"
                        regions={this.state.regions}
                    /> */}
                    <div className="app__header">
                        <div className="switch">

                            <div className="toggle">
                                <label for="themeSwitch"></label>
                                <input type="checkbox" name="swich-theme" id="themeSwitch" onClick={this.changeTheme} checked={this.state.isChecked} />
                                <div className="toggle-bg"></div>
                                <div className="toggle-thumb">
                                    <i className="fas fa-sun"></i>
                                    <i className="fas fa-moon"></i>
                                </div>
                            </div>
                        </div>
                        <div className="poke__logos noselect">
                            <img src={Pokedex} alt="pokelogo" className="poke__logo" />
                        </div>
                        <div className="pokeball__box github__icon" onClick={this.openGithub}>
                            <GitHubIcon></GitHubIcon>
                        </div>
                    </div>
                    <div className="filter__container noselect">
                        <div className="filter__items">
                            <div>
                                Region
                            </div>
                            <select value={this.state.valueregion} onChange={this.handleChangeRegions}>
                                {this.state.regions.map((region) => (
                                    <option value={region.name}>{region.name}&nbsp;({region.offset + 1}-{region.limit + region.offset})</option>
                                ))}

                            </select>
                        </div>
                        <div className="filter__items">
                            <div>
                                Type
                            </div>
                            <select value={this.state.valuetype} onChange={this.handleChangeTypes}>
                                {this.state.types.map((type) => (
                                    <option value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                        <div className="filter__items">
                            <label>
                                Search
                            </label>
                            <input type="text" value={this.state.valuesearch} onChange={this.handleChangeSearch} />
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
                                    onElemClick={() => this.fetchPokemonData(this.state.searchPokemons[item].id, this.state.searchPokemons[item].name, this.state.searchPokemons[item].types, this.state.searchPokemons[item].sprites.other.dream_world.front_default ? this.state.searchPokemons[item].sprites.other.dream_world.front_default : this.state.searchPokemons[item].sprites.other['official-artwork'].front_default)}
                                />) :



                                (!this.state.isFilter ? Object.keys(this.state.allPokemons).map((item, index) =>
                                    <Pokemon
                                        key={this.state.allPokemons[item].id}
                                        id={this.state.allPokemons[item].id}
                                        image={this.state.allPokemons[item].sprites.other.dream_world.front_default ? this.state.allPokemons[item].sprites.other.dream_world.front_default : this.state.allPokemons[item].sprites.other['official-artwork'].front_default}
                                        name={this.state.allPokemons[item].name}
                                        type={this.state.allPokemons[item].types}
                                        onElemClick={() => this.fetchPokemonData(this.state.allPokemons[item].id, this.state.allPokemons[item].name, this.state.allPokemons[item].types, this.state.allPokemons[item].sprites.other.dream_world.front_default ? this.state.allPokemons[item].sprites.other.dream_world.front_default : this.state.allPokemons[item].sprites.other['official-artwork'].front_default)}
                                    />
                                ) :
                                    Object.keys(this.state.filterPokemons).map((item, index) =>
                                        <Pokemon
                                            key={index}
                                            id={this.state.filterPokemons[item].id}
                                            image={this.state.filterPokemons[item].sprites.other.dream_world.front_default ? this.state.filterPokemons[item].sprites.other.dream_world.front_default : this.state.filterPokemons[item].sprites.other['official-artwork'].front_default}
                                            name={this.state.filterPokemons[item].name}
                                            type={this.state.filterPokemons[item].types}
                                            onElemClick={() => this.fetchPokemonData(this.state.filterPokemons[item].id, this.state.filterPokemons[item].name, this.state.filterPokemons[item].types, this.state.filterPokemons[item].sprites.other.dream_world.front_default ? this.state.filterPokemons[item].sprites.other.dream_world.front_default : this.state.filterPokemons[item].sprites.other['official-artwork'].front_default)}
                                        />
                                    ))
                            }
                        </div>
                        {/* <button className="load__more" onClick={() => this.getAllPokemons()}>Load More</button> */}
                    </div>

                    {this.state.noDataFound && <div className="no__data noselect">
                        No such Pokémon in this region :/
                    </div>}

                    <div className="app__footer noselect">
                        <div>
                            Built using <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer">PokéAPI</a>, <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React</a> and <a href="https://material-ui.com/" target="_blank" rel="noopener noreferrer">Material-UI</a>.
                        </div>
                        <div onClick={this.openGithub} className="github__icon">
                            <GitHubIcon></GitHubIcon>
                        </div>
                    </div>


                </div>}
            </>

        )
    }
}

export default App;
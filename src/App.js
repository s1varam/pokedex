import React from 'react';
import Pokemon from "./components/Pokemon";
import InfoDialog from "./components/InfoDialog";
import axios from 'axios';
import Scroll from './components/Scroll';
import Header from './components/Header'
import Footer from './components/Footer'
import Loading from './components/Loading'
import Filters from './components/Filters'

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allPokemons: [],
            searchPokemons: [],
            filterPokemons: [],
            evoChain: [],
            abilities: "",
            height: "",
            weight: "",
            catergory: "",
            stats: [],
            imageURL: "",
            pokeName: "",
            pokeNumber: "",
            genderRate: "",
            genera: "",
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
            evolID: "",
            evolName: "",
            evolTypes: [],
            evolImgURL: "",
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
            ],
            sortby : [
                "ID","Name"
            ],

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
    }

    componentDidUpdate(){
        // console.log("updatedd");
    }

    getAllPokemons = async (offset, limit) => {

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

        pokemonArr.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))

        this.setState({
            allPokemons: pokemonArr,
            showLoading: false,
        })

        // console.log("allPokes");
        // console.log(this.state.allPokemons);

    }

    fetchPokemonData = async (number, pokemon, category, imageURL) => {

        // debugger

        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`).catch((err) => console.log("Error:", err));
        // console.log(response);

        var statistics = [], abs = [];
        var id = response.data.id;

        for (var i = 0; i < response.data.abilities.length; i++) {
            abs.push(response.data.abilities[i].ability.name);
        }

        for (var j = 0; j < response.data.stats.length; j++) {
            var Obj = {};
            Obj['stat__name'] = response.data.stats[j].stat.name;
            Obj['stat__val'] = response.data.stats[j].base_stat;
            statistics.push(Obj);
        }

        this.setState({
            weight: response.data.weight,
            height: response.data.height,
            category: category,
            pokeNumber: id,
            imageURL: imageURL,
            pokeName: pokemon,
            showInfo: true,
            stats: statistics,
            abilities: abs,
        })

        this.setState({
            evoChain: [],
            genderRate: "",
            genera : "",
        })

        // this.fetchEvoChainURL(pokemon);
        this.fetchPokemonDescription(pokemon);

    }

    fetchPokemonDescription = async (pokemon_name) => {
        debugger

        let genera = "";

        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon_name}`).catch((err) => console.log("Error:", err));
        this.fetchEvoDetails(response.data.evolution_chain.url);

        try {
            // const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon_name}`).catch((err) => console.log("Error:", err));

            for (var i = 0; i < response.data.flavor_text_entries.length - 1; i++) {
                if (response.data.flavor_text_entries[i].language.name === "en") {
                    this.state.description = response.data.flavor_text_entries[i].flavor_text;
                    break;
                }
            }

            for( var j=0;j<response.data.genera.length;j++){
                if(response.data.genera[j].language.name === "en"){
                    genera = response.data.genera[j].genus;
                    break;
                }
            }

            this.setState({
                description: this.state.description,
                genderRate : response.data.gender_rate,
                genera : genera,
            })
        } catch (e) {
            this.setState({
                description: "Description not found",
            })
        }

        // console.log("description");
    }

    // fetchEvoChainURL = async (pokemon_name) => {
    //     // debugger

    //     const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon_name}`).catch((err) => console.log("Error:", err));
    //     this.fetchEvoDetails(response.data.evolution_chain.url);
    //     console.log(response);

    // }

    fetchEvoDetails = async (url) => {
        // debugger
        const response = await axios.get(url).catch((err) => console.log("Error:", err));
        // console.log(response);


        var evoChain = [];
        var evoData = response.data.chain;

        do {
            var evoDetails = evoData['evolution_details'][0];

            evoChain.push({
                "species_name": evoData.species.name,
                "min_level": !evoDetails ? 1 : evoDetails.min_level,
                "trigger_name": !evoDetails ? null : evoDetails.trigger.name,
                "item": !evoDetails ? null : evoDetails.item
            });

            evoData = evoData['evolves_to'][0];
        } while (!!evoData && evoData.hasOwnProperty('evolves_to'));

        // console.log("evochain");
        // console.log(evoChain);

        this.fetchEvoImages(evoChain);

    }

    fetchEvoImages = async (evoChainArr) => {

        // debugger
        for (var i = 0; i < evoChainArr.length; i++) {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evoChainArr[i].species_name}`).catch((err) => console.log("Error:", err));
            response.data.sprites.other.dream_world.front_default ? evoChainArr[i]['image_url'] = response.data.sprites.other.dream_world.front_default : evoChainArr[i]['image_url'] = response.data.sprites.other['official-artwork'].front_default;
        }

        this.setState({
            evoChain: evoChainArr,
        })

    }

    closeDialog = () => {
        this.setState({
            showInfo: false,
        })
    }

    handleChangeRegions = (event) => {

        debugger

        for (var i = 0; i < this.state.regions.length; i++) {
            if (this.state.regions[i].name === event.target.value) {

                this.setState({
                    valueregion: event.target.value,
                    valuetype: "all types",
                    sorttype: "ID",
                    isSearch: false,
                    isFilter: false,
                    showLoading: true,
                })

                this.getAllPokemons(this.state.regions[i].offset, this.state.regions[i].limit);

                break;
            }
        }

        // console.log("limit");
        // console.log(event.target.value);
    }

    handleChangeTypes = (event) => {

        debugger

        if (event.target.value === "all types") {
            var allPoks = this.state.allPokemons;
            if(this.state.sorttype === "Name"){
                allPoks.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
                this.setState({
                    isFilter: false,
                    valuetype: event.target.value,
                    allPokemons : allPoks,
                })
            }else{
                allPoks.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
                this.setState({
                    isFilter: false,
                    valuetype: event.target.value,
                    allPokemons : allPoks,
                })
            }            
            return;
        }

        let filterArr = [];

        for (var i = 0; i < this.state.allPokemons.length; i++) {
            for (var j = 0; j < this.state.allPokemons[i].types.length; j++) {
                if (event.target.value === this.state.allPokemons[i].types[j].type.name) {
                    filterArr.push(this.state.allPokemons[i])
                }
            }
        }

        this.state.sorttype === "Name" ? filterArr.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)) :
        filterArr.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))

        this.setState({
            isSearch: false,
            valuesearch: "",
            isFilter: true,
            filterPokemons: filterArr,
            valuetype: event.target.value,
        })

        filterArr.length === 0 ? this.setState({ noDataFound: true }) : this.setState({ noDataFound: false })

    }

    handleChangeSearch = (event) => {

        // debugger

        event.target.value.length > 0 ? this.setState({ isSearch: true, valuetype: "all types", valuesearch: event.target.value }) : this.setState({ isSearch: false, isFilter: false, valuesearch: event.target.value });

        let searchArr = [];

        for (var i = 0; i < this.state.allPokemons.length; i++) {
            // eslint-disable-next-line eqeqeq
            if (this.state.allPokemons[i].name.includes(event.target.value.toLowerCase()) || this.state.allPokemons[i].id == event.target.value) {
                searchArr.push(this.state.allPokemons[i]);
            }
        }

        searchArr.length === 0 ? this.setState({ noDataFound: true, searchPokemons: [], }) : this.setState({ noDataFound: false, searchPokemons: searchArr })

    }

    handleChangeSort = (event) => {

        var sortArr;

        this.state.isFilter ? sortArr = this.state.filterPokemons : sortArr = this.state.allPokemons

        if(event.target.value === "ID"){
            sortArr.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
        }else{
            sortArr.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
        }


        this.state.isFilter ? 
        this.setState({
            filterPokemons : sortArr,
            sorttype: event.target.value,
        }) : 
        this.setState({
            allPokemons : sortArr,
            sorttype: event.target.value,
        })
        
    }

    handleClick = () => {
        window[`scrollTo`]({ top: document.body.scrollHeight, behavior: `smooth` })
    }

    render() {
        return (
            <>
                <Scroll showBelow={250} className="scroll__top" />
                {this.state.showLoading && <Loading />}
                {!this.state.showLoading && <div className="app__container">
                    {this.state.showInfo &&
                        <InfoDialog
                            open={this.state.showInfo}
                            abilities={this.state.abilities}
                            height={this.state.height}
                            weight={this.state.weight}
                            category={this.state.category}
                            genera={this.state.genera}
                            genderRate={this.state.genderRate}
                            stats={this.state.stats}
                            img={this.state.imageURL}
                            name={this.state.pokeName}
                            number={this.state.pokeNumber}
                            description={this.state.description}
                            evoChain={this.state.evoChain}
                            cancel={() => this.closeDialog()}
                            evolutionPokemon={this.fetchPokemonData}>
                        </InfoDialog>}
                    <Header />
                    <Filters
                        valueregion={this.state.valueregion}
                        regions={this.state.regions}
                        valuetype={this.state.valuetype}
                        sorttype={this.state.sorttype}
                        valuesearch={this.state.valuesearch}
                        types={this.state.types}
                        sortby={this.state.sortby}
                        regionsSelect = {this.handleChangeRegions}
                        typesSelect = {this.handleChangeTypes}
                        sortSelect = {this.handleChangeSort}
                        searchChange = {this.handleChangeSearch}
                    />
                    <div className="pokemon__container">
                        <div className="all__pokemons">
                            {this.state.isSearch ? Object.keys(this.state.searchPokemons).map((item) =>
                                <Pokemon
                                    key={this.state.searchPokemons[item].id}
                                    id={this.state.searchPokemons[item].id}
                                    image={this.state.searchPokemons[item].sprites.other.dream_world.front_default ? this.state.searchPokemons[item].sprites.other.dream_world.front_default : this.state.searchPokemons[item].sprites.other['official-artwork'].front_default}
                                    name={this.state.searchPokemons[item].name}
                                    type={this.state.searchPokemons[item].types}
                                    onElemClick={() => this.fetchPokemonData(this.state.searchPokemons[item].id, this.state.searchPokemons[item].name, this.state.searchPokemons[item].types, this.state.searchPokemons[item].sprites.other.dream_world.front_default ? this.state.searchPokemons[item].sprites.other.dream_world.front_default : this.state.searchPokemons[item].sprites.other['official-artwork'].front_default)}
                                />) :
                                (!this.state.isFilter ? Object.keys(this.state.allPokemons).map((item) =>
                                    <Pokemon
                                        key={this.state.allPokemons[item].id}
                                        id={this.state.allPokemons[item].id}
                                        image={this.state.allPokemons[item].sprites.other.dream_world.front_default ? this.state.allPokemons[item].sprites.other.dream_world.front_default : this.state.allPokemons[item].sprites.other['official-artwork'].front_default}
                                        name={this.state.allPokemons[item].name}
                                        type={this.state.allPokemons[item].types}
                                        onElemClick={() => this.fetchPokemonData(this.state.allPokemons[item].id, this.state.allPokemons[item].name, this.state.allPokemons[item].types, this.state.allPokemons[item].sprites.other.dream_world.front_default ? this.state.allPokemons[item].sprites.other.dream_world.front_default : this.state.allPokemons[item].sprites.other['official-artwork'].front_default)}
                                    />
                                ) :
                                    Object.keys(this.state.filterPokemons).map((item) =>
                                        <Pokemon
                                            key={this.state.filterPokemons[item].id}
                                            id={this.state.filterPokemons[item].id}
                                            image={this.state.filterPokemons[item].sprites.other.dream_world.front_default ? this.state.filterPokemons[item].sprites.other.dream_world.front_default : this.state.filterPokemons[item].sprites.other['official-artwork'].front_default}
                                            name={this.state.filterPokemons[item].name}
                                            type={this.state.filterPokemons[item].types}
                                            onElemClick={() => this.fetchPokemonData(this.state.filterPokemons[item].id, this.state.filterPokemons[item].name, this.state.filterPokemons[item].types, this.state.filterPokemons[item].sprites.other.dream_world.front_default ? this.state.filterPokemons[item].sprites.other.dream_world.front_default : this.state.filterPokemons[item].sprites.other['official-artwork'].front_default)}
                                        />
                                    ))
                            }
                        </div>
                    </div>
                    {this.state.noDataFound && <div className="no__data noselect">
                        No such Pokémon in this region :/
                    </div>}
                    <Footer />
                </div>}
            </>
        )
    }
}

export default App;
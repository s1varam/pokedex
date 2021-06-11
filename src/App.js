import { useEffect, useState } from "react";
import Pokemon from "./components/Pokemon";
import PokeLogo from "../src/assets/images/poke_logo.png";
import GottaCatch from '../src/assets/images/gottacatch.png'
import PokeBall from "../src/assets/images/Pokeball.png"
import InfoDialog from "./components/InfoDialog";
import axios from 'axios';

import React from 'react'

function App() {

  useEffect(() => {
    getAllPokemons()
  }, [])

  const [allPokemons, setAllPokemons] = useState([]);
  const [searchPokemons, setSearchPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState("https://pokeapi.co/api/v2/pokemon?limit=20");
  const [abilities, setAbilities] = useState([]);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [category, setCategory] = useState();
  const [stats, setStats] = useState([]);
  const [imageURL, setimageURL] = useState("");
  const [pokeName, setPokeName] = useState("");
  const [showInfo, setshowInfo] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchString, setSearchString] = useState("");

  const getAllPokemons = async () => {

    debugger

    var data;
    const response = axios.get(loadMore)
      .then((response => {
        data = response.data;
        setLoadMore(response.data.next);

        getPokemonData(response.data.results);
        console.log(response.data.results);
      }));
  }

  const getPokemonData = async (result) => {

    debugger

    result.forEach(async (pokemon) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
      const data = await response.json();

      setAllPokemons(pokemonList => [...pokemonList, data]);
      allPokemons.sort(function (a, b) {
        return a.id - b.id;
      });

      // allPokemons.push(data)     

    });

    console.log("allPokemons");
    console.log(allPokemons);
  }


  const fetchPokemonData = async (pokemon, category, imageURL) => {


    debugger
    // setAbilities([]);
    abilities.length = 0;
    stats.length = 0;
    // setCategory();

    // useEffect(() => {
    //   setCategory()
    // }, []);

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await response.json();

    for (var i = 0; i < data.abilities.length; i++) {
      abilities.push(data.abilities[i].ability.name);
    }

    for (var i = 0; i < data.stats.length; i++) {
      var Obj = {};
      Obj['stat__name'] = data.stats[i].stat.name;
      Obj['stat__val'] = data.stats[i].base_stat;
      stats.push(Obj);
    }

    setWeight(data.weight);
    setHeight(data.height);
    setCategory(category);
    setAbilities(abilities);
    setimageURL(imageURL);
    setPokeName(pokemon);

    console.log(data);
    console.log(abilities);
    console.log(stats);

    setshowInfo(true);
  }

  const closeDialog = () => {
    setshowInfo(false);
    debugger
    console.log("closeeeeeee")
  }

  const updateInputValue = (evt) => {
    debugger
    console.log("search")
    console.log(evt.target.value)
    setSearchString(evt.target.value);
  }

  const filterPokemons = () => {
    
    debugger
    setSearch(true);

    var searchList= [];
    for(var i=0;i<allPokemons.length;i++){
        if(allPokemons[i].name.includes(searchString)){
          searchList.push(allPokemons[i]);
        }
    } 

    setSearchPokemons(searchList);
    console.log("search");
    console.log(searchList);

  }

  const clearSearch = () => {
    setSearch(false);
  }


  return (
    <div className="app__container">
      {showInfo && <InfoDialog open={showInfo} abilities={abilities} height={height} weight={weight} category={category} stats={stats} img={imageURL} name={pokeName} cancel={() => closeDialog()}></InfoDialog>}
      <div className="app__header">
        <div className="poke__logos">
          <img src={PokeLogo} alt="pokelogo" className="poke__logo" />
          <img src={GottaCatch} className="gotta__logo" alt="gottacatch" />
        </div>
        <div>
          <div>
            <input type="text" onInput={e => setSearchString(e.target.value)}></input>
          </div>
          <div>
            <button type="button" onClick={() => filterPokemons()}>Search</button>
            <button type="button" onClick={() => clearSearch()} onChange={evt => updateInputValue(evt)}>Clear</button>
          </div>
        </div>
        <div className="pokeball__box">
          <img src={PokeBall} className="pokeball" alt="pokeball" />
        </div>
      </div>
      <div className="pokemon__container">
        <div className="all__pokemons">

          {!search ? Object.keys(allPokemons).map((item, index) =>
            <Pokemon
              key={index}
              id={allPokemons[item].id}
              image={allPokemons[item].sprites.other.dream_world.front_default}
              name={allPokemons[item].name}
              type={allPokemons[item].types}
              onElemClick={() => fetchPokemonData(allPokemons[item].name, allPokemons[item].types, allPokemons[item].sprites.other.dream_world.front_default)}
            />
          ) : Object.keys(searchPokemons).map((item, index) =>
          <Pokemon
            key={index}
            id={searchPokemons[item].id}
            image={searchPokemons[item].sprites.other.dream_world.front_default}
            name={searchPokemons[item].name}
            type={searchPokemons[item].types}
            onElemClick={() => fetchPokemonData(searchPokemons[item].name, searchPokemons[item].types, searchPokemons[item].sprites.other.dream_world.front_default)}
          />
        )
        
        }
        </div>
        <button className="load__more" onClick={() => getAllPokemons()}>Load More</button>
      </div>
    </div>
  );
}

export default App;


// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       allPokemons: [],
//       loadMore: 'https://pokeapi.co/api/v2/pokemon?limit=20',
//       abilities: [],
//       showInfo: false,
//     }
//   }


//   componentWillMount() {
//     this.getAllPokemons();
//   }

//   getAllPokemons = async () => {

//     debugger
//     const response = await fetch(this.state.loadMore);
//     const data = await response.json();

//     this.setState({
//       loadMore: data.next,
//     })

//     // getPokemonData(data.results);
//     console.log(data)
//   }

//   getPokemonData = async (result) => {

//     debugger

//     result.forEach(async (pokemon) => {
//       const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
//       const data = await response.json();

//       this.setState({
//         allPokemons: data,
//       })
//       // setAllPokemons(pokemonList => [...pokemonList, data]);
//       // allPokemons.push(data)

//     });

//     console.log(this.state.allPokemons);
//   }


//   fetchPokemonData = async (pokemon) => {


//     debugger
//     // setAbilities([]);

//     this.setState({
//       abilities: []
//     })
//     // abilities.length = 0;

//     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
//     const data = await response.json();



//     var i;
//     for (var i = 0; i < data.abilities.length; i++) {
//       this.state.abilities.push(data.abilities[i].ability.name);
//     }

//     this.setState({
//       showInfo: true,
//     })

//     // await console.log(data);
//     // await console.log(abilities);

//     // setshowInfo(true);
//   }

//   closeDialog = () => {

//     this.setState({
//       showInfo: false,
//     })
//     // setshowInfo(false);
//     // debugger
//     // console.log("closeeeeeee")
//   }


//   render() {
//     return (
//       <>
//         <div className="app__container">
//           {this.state.showInfo && <InfoDialog open={this.state.showInfo} abilities={this.state.abilities} cancel={() => this.closeDialog()}></InfoDialog>}
//           <img src={PokeLogo} alt="pokelogo" className="poke__logo" />
//           <div className="pokemon__container">
//             <div className="all__pokemons">
//               {this.state.allPokemons.map((pokemon, index) =>
//                 <Pokemon
//                   id={pokemon.id}
//                   image={pokemon.sprites.other.dream_world.front_default}
//                   name={pokemon.name}
//                   type={pokemon.types}
//                   key={index}
//                   onElemClick={() => this.fetchPokemonData(pokemon.name)}
//                 />
//               )}
//             </div>
//             <button className="load__more" onClick={() => this.getAllPokemons()}>Load More</button>
//           </div>
//         </div>

//       </>

//     )
//   }

// }

// export default App;
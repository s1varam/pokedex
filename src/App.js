import { useEffect, useState } from "react";
import Pokemon from "./components/Pokemon";
import PokeLogo from "../src/assets/images/poke_logo.png";
import InfoDialog from "./components/InfoDialog";

import React from 'react'

function App() {

  useEffect(() => {
    getAllPokemons()
  }, [])

  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState("https://pokeapi.co/api/v2/pokemon?limit=20");
  const [abilities, setAbilities] = useState([]);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [category, setCategory] = useState();
  const [stats, setStats] = useState([]);
  const [imageURL, setimageURL] = useState("");
  const [showInfo, setshowInfo] = useState(false);

  const getAllPokemons = async () => {

    debugger
    const response = await fetch(loadMore);
    const data = await response.json();
    setLoadMore(data.next);
    getPokemonData(data.results);
    console.log(data)
  }

  const getPokemonData = async (result) => {

    debugger

    result.forEach(async (pokemon) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
      const data = await response.json();

      setAllPokemons(pokemonList => [...pokemonList, data]);
      allPokemons.push(data)

    });

    console.log(allPokemons);  
  }


  const fetchPokemonData = async(pokemon, category, imageURL) => {


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
    
    for(var i=0; i< data.abilities.length; i++){
      abilities.push(data.abilities[i].ability.name);
    }

    for(var i=0; i<data.stats.length;i++){
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


  return (
    <div className="app__container">
      {showInfo && <InfoDialog open={showInfo} abilities={abilities} height={height} weight={weight} category={category} stats={stats} img={imageURL} cancel={()=>closeDialog()}></InfoDialog>}
      <img src={PokeLogo} alt="pokelogo" className="poke__logo" />
      <div className="pokemon__container">
        <div className="all__pokemons">
          {allPokemons.map((pokemon,index)=>
            <Pokemon
            id={pokemon.id}
            image={pokemon.sprites.other.dream_world.front_default}
            name={pokemon.name}
            type={pokemon.types}
            key={index}
            onElemClick={()=>fetchPokemonData(pokemon.name, pokemon.types, pokemon.sprites.other.dream_world.front_default)}
            />
            )}
        </div>
        <button className="load__more" onClick={()=>getAllPokemons()}>Load More</button>
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
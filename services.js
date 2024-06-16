function updateProgressBar(value) {
  document.querySelector(".progress-bar-fill").style.width = `${value}%`;
}

function addNewScrollPokemon() {
  if (
    window.scrollY + 100 >=
    document.documentElement.scrollHeight -
      document.documentElement.clientHeight
  ) {
    increaseNumAvailable(20);
    renderPokedex();
  }
}

function increaseNumAvailable(num) {
  numAvailable = numAvailable + num > renderedList.length? renderedList.length : numAvailable + num;
}

function search() {
  let input = document.getElementById("search-input").value.toLowerCase();
  let results = pokemonList.filter(pokemon => pokemon.name && pokemon.name.replaceAll("-", " ").includes(input));

  document.getElementById("pokedex-list-render-container").innerHTML = "";
  renderedList = results;
  renderedPokemon = 0;
  numRendered = 0;
  increaseNumAvailable(30);
  renderPokedex();
}


function getTypeWeaknesses(types) {
  const doubleDamageFrom = new Set();
  const halfDamageFrom = new Set();

  types.forEach(typeObj => {
    const [doubleDamage, halfDamage] = allTypes[typeObj];
    doubleDamage.forEach(type => doubleDamageFrom.add(type));
    halfDamage.forEach(type => halfDamageFrom.add(type));
  });

  halfDamageFrom.forEach(type => doubleDamageFrom.delete(type));

  return doubleDamageFrom;
}


const formatString = name => name.replace(/\b\w/g, l => l.toUpperCase()).replace(/-/g, " ");

function cleanFlavourText(text) {
  // https://github.com/andreferreiradlw/pokestats/issues/41
  return text
    .replace("\f", "\n")
    .replace("\u00ad\n", "")
    .replace("\u00ad", "")
    .replace(" -\n", " - ")
    .replace("-\n", "-")
    .replace("\n", " ");
}

const pokemonTypes = {
  normal: { colour: "#A8A878", border: "#6D6D4E", icon: "#A0A29F" },
  fire: { colour: "#F08030", border: "#9C531F", icon: "#FBA54C" },
  water: { colour: "#6890F0", border: "#445E9C", icon: "#539DDF" },
  electric: { colour: "#F8D030", border: "#A1871F", icon: "#F2D94E" },
  grass: { colour: "#78C850", border: "#4E8234", icon: "#5FBD58" },
  ice: { colour: "#98D8D8", border: "#638D8D", icon: "#75D0C1" },
  fighting: { colour: "#C03028", border: "#7D1F1A", icon: "#D3425F" },
  poison: { colour: "#A040A0", border: "#682A68", icon: "#B763CF" },
  ground: { colour: "#E0C068", border: "#927D44", icon: "#DA7C4D" },
  flying: { colour: "#A890F0", border: "#6D5E9C", icon: "#A1BBEC" },
  psychic: { colour: "#F85888", border: "#A13959", icon: "#FA8581" },
  bug: { colour: "#A8B820", border: "#6D7815", icon: "#92BC2C" },
  rock: { colour: "#B8A038", border: "#786824", icon: "#C9BB8A" },
  ghost: { colour: "#705898", border: "#493963", icon: "#5F6DBC" },
  dragon: { colour: "#7038F8", border: "#4924A1", icon: "#0C69C8" },
  dark: { colour: "#705848", border: "#49392F", icon: "#595761" },
  steel: { colour: "#B8B8D0", border: "#787887", icon: "#5695A3" },
  fairy: { colour: "#EE99AC", border: "#9B6470", icon: "#EE90E6" },
};

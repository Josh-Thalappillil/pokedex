const POKE_API = "https://pokeapi.co/api/v2/pokemon/";
const SPECIES_API = "https://pokeapi.co/api/v2/pokemon-species/";
const TYPE_API = "https://pokeapi.co/api/v2/type/";
const maxIndex = 649;
const maxTypeIndex = 18;

let pokemonList = Array(maxIndex);
let allTypes = {};

async function fetch() {
    await getAllPokemon();
    await fetchType();
    loadingCompletion();
}

async function getAllPokemon() {
    let url = POKE_API + "?limit=" + maxIndex;
    let resp = await fetch(url);
    let respJson = await resp.json();
    for (let i = 0; i < respJson.results.length; i++) {
        pokemonList[i] = {
            id: i + 1,
            name: respJson.results[i].name,
            types: [],
            species: "",
            flavor_text: "",
            height: "",
            weight: "",
            stats: [],
            base_exp: 0,
            evolution_chain_url: "",
            abilities: [],
            fetched: false,
        };
    }
    await setupPokemon();
}

async function fetchPokemon(id) {
    let url = POKE_API + id;
    let pokemonResp = await fetch(url);
    let pokemonJson = await pokemonResp.json();
    let speciesUrl = SPECIES_API + id;

    let speciesResp = await fetch(speciesUrl);
    let speciesJson = await speciesResp.json();

    let pokemon = {
        id: id,
        name: pokemonJson.name,
        types: pokemonJson.types.map(type => type.type.name),
        species: speciesJson.genera.find(genus => genus.language.name === "en").genus,
        flavor_text: "",
        height: pokemonJson.height,
        weight: pokemonJson.weight,
        stats: pokemonJson.stats.map(stat => ({ name: stat.stat.name, value: stat.base_stat })),
        base_exp: pokemonJson.base_experience,
        evolution_chain_url: speciesJson.evolution_chain.url,
        abilities: pokemonJson.abilities.map(ability => ability.ability.name),
        fetched: true
    };

    // Find flavor text in English
    speciesJson.flavor_text_entries.forEach(entry => {
        if (entry.language.name === "en") {
            pokemon.flavor_text = cleanFlavorText(entry.flavor_text);
        }
    });

    pokemonList[id - 1] = pokemon;
}

async function setupPokemon() {
    for (let i = 1; i <= maxIndex; i++) {
        await fetchPokemon(i);
    }
}

async function fetchType() {
    for (let i = 1; i <= maxTypeIndex; i++) {
        await fetchType(i);
    }
}

async function fetchType(id) {
    const urlType = TYPE_API + id;
    const typeResponse = await fetch(urlType);
    const type = await typeResponse.json();

    const doubleDamageFrom = type.damage_relations.double_damage_from.map(obj => obj.name);
    const halfDamageFrom = type.damage_relations.half_damage_from.map(obj => obj.name);

    allTypes[type.name] = {
        double_damage_from: doubleDamageFrom,
        half_damage_from: halfDamageFrom
    };

    type.pokemon.forEach(pokemonType => {
        const pokemonId = parseInt(pokemonType.pokemon.url.split('/')[6]);

        if (pokemonList[pokemonId - 1]) {
            pokemonList[pokemonId - 1].types.push(type.name);
        }
    });
}

function cleanFlavorText(text) {
    return text.replace(/(\r\n|\n|\r)/gm, " ");
}

function loadingCompletion() {
    console.log("Pokemon data loaded successfully!");
}

fetch();

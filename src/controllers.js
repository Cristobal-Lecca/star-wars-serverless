const axios = require('axios');

const getCharacterData = (data) => {
    return {
        nombre: data.name,
        altura: data.height,
        masa: data.mass,
        color_pelo: data.hair_color,
        color_piel: data.skin_color,
        color_ojos: data.eye_color,
        nacimiento: data.birth_year,
        genero: data.gender
    };
};

const getCharacterById = async (id) => {
    const response = await axios.get(`https://swapi.dev/api/people/${id}/`);
    return getCharacterData(response.data);
};

const getAllCharacters = async () => {
    const response = await axios.get('https://swapi.dev/api/people/');
    return response.data.results.map((character) => getCharacterData(character));
};

module.exports = { getCharacterById, getAllCharacters };

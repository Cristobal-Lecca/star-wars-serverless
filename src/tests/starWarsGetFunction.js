
const axios = require('axios');

exports.getCharacter = async (id) => {
    try {
        const response = await axios.get(`https://swapi.dev/api/people/${id}/`);
        return response.data;
    } catch (error) {
        return { error: 'Error al obtener el personaje.' };
    }
};


const { getCharacter } = require('./starWarsGetFunction');
const axios = require('axios');

jest.mock('axios');

describe('getCharacter', () => {

    it('should return character data for a given ID', async () => {
        const mockedCharacter = { name: 'Luke Skywalker', height: '172', };
        const mockedId = 1;

        // Mock de la respuesta de Axios
        axios.get.mockResolvedValueOnce({ data: mockedCharacter });

        const characterData = await getCharacter(mockedId);

        expect(axios.get).toHaveBeenCalledWith(`https://swapi.dev/api/people/${mockedId}/`);
        expect(characterData).toEqual(mockedCharacter);
    });

    it('should handle errors when fetching character data', async () => {
        const mockedId = 1;

        // Mock de una solicitud fallida
        axios.get.mockRejectedValueOnce(new Error('Request failed'));

        const characterData = await getCharacter(mockedId);

        expect(axios.get).toHaveBeenCalledWith(`https://swapi.dev/api/people/${mockedId}/`);
        expect(characterData).toEqual({ error: 'Error al obtener el personaje.' });
    });
});

const { sequelize, MyModel } = require('./sequelizeConfig');
const axios = require('axios');


const { getCharacterById, getAllCharacters } = require('./src/controllers');

module.exports.getCharacters = async (event) => {
  const id = event.pathParameters ? event.pathParameters.id : null;

  try {
    let result;

    if (id) {
      const character = await getCharacterById(id);

      result = {
        statusCode: 200,
        body: JSON.stringify(character),
      };
    } else {
      const characters = await getAllCharacters();

      result = {
        statusCode: 200,
        body: JSON.stringify(characters),
      };
    }

    return result;
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error al obtener personajes.' }),
    };
  }
};

// module.exports.getCharacters = async (event) => {
//   const id = event.pathParameters ? event.pathParameters.id : null;

//   try {
//     if (id) {
//       const response = await axios.get(`https://swapi.dev/api/people/${id}/`);
//       const character = {
//         nombre: response.data.name,
//         altura: response.data.height,
//         masa: response.data.mass,
//         color_pelo: response.data.hair_color,
//         color_piel: response.data.skin_color,
//         color_ojos: response.data.eye_color,
//         nacimiento: response.data.birth_year,
//         genero: response.data.gender
//       };

//       return {
//         statusCode: 200,
//         body: JSON.stringify(character),
//       };
//     } else {
//       const response = await axios.get('https://swapi.dev/api/people/');
//       const characters = response.data.results.map((character) => ({
//         nombre: character.name,
//         altura: character.height,
//         masa: character.mass,
//         color_pelo: character.hair_color,
//         color_piel: character.skin_color,
//         color_ojos: character.eye_color,
//         nacimiento: character.birth_year,
//         genero: character.gender
//       }));

//       return {
//         statusCode: 200,
//         body: JSON.stringify(characters),
//       };
//     }
//   } catch (error) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ message: 'Error al obtener personajes.' }),
//     };
//   }
// };


module.exports.insertData = async (event) => {
  const requestBody = JSON.parse(event.body);
  const { nombre } = requestBody;

  try {
    const result = await MyModel.create({ nombre });

    console.log('Datos insertados correctamente en Sequelize:', result);

    return { statusCode: 200, body: JSON.stringify({ message: 'Datos insertados correctamente en MySQL' }) };
  } catch (error) {
    console.error('Error al insertar datos en Sequelize:', error);
    return { statusCode: 500, body: JSON.stringify({ message: 'Error al insertar datos en MySQL' }) };
  }
};

module.exports.getCharacters2 = async (event) => {
  try {
    const characters = await MyModel.findAll();

    return {
      statusCode: 200,
      body: JSON.stringify(characters),
    };
  } catch (error) {
    console.error('Error al obtener datos de la tabla:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error al obtener datos de la tabla' }),
    };
  }
};


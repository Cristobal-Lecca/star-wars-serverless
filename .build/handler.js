'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios = require('axios');
module.exports.getCharacters = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const id = event.pathParameters ? event.pathParameters.id : null;
    try {
        if (id) {
            const response = yield axios.get(`https://swapi.dev/api/people/${id}/`);
            const character = {
                nombre: response.data.name,
                altura: response.data.height,
                masa: response.data.mass,
                color_pelo: response.data.hair_color,
                color_piel: response.data.skin_color,
                color_ojos: response.data.eye_color,
                nacimiento: response.data.birth_year,
                genero: response.data.gender
                // Aquí puedes mapear otros atributos a español
            };
            return {
                statusCode: 200,
                body: JSON.stringify(character),
            };
        }
        else {
            // Lógica para obtener datos de la SWAPI
            const response = yield axios.get('https://swapi.dev/api/people/');
            const characters = response.data.results.map((character) => ({
                nombre: character.name,
                altura: character.height,
                masa: character.mass,
                color_pelo: character.hair_color,
                color_piel: character.skin_color,
                color_ojos: character.eye_color,
                nacimiento: character.birth_year,
                genero: character.gender
                // Aquí puedes mapear otros atributos a español
            }));
            return {
                statusCode: 200,
                body: JSON.stringify(characters),
            };
        }
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error al obtener personajes.' }),
        };
    }
});
const sequelizeConfig_1 = require("./sequelizeConfig");
const mysql = require('mysql');
// Configuración de la conexión a MySQL desde las variables de entorno
const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});
module.exports.insertData = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const requestBody = JSON.parse(event.body); // Suponiendo datos en formato JSON
    const { nombre } = requestBody; // Suponiendo que tu JSON tiene un campo 'nombre'
    try {
        // Insertar datos utilizando Sequelize
        const result = yield sequelizeConfig_1.MyModel.create({ nombre });
        console.log('Datos insertados correctamente en Sequelize:', result);
        return { statusCode: 200, body: JSON.stringify({ message: 'Datos insertados correctamente en MySQL' }) };
    }
    catch (error) {
        console.error('Error al insertar datos en Sequelize:', error);
        return { statusCode: 500, body: JSON.stringify({ message: 'Error al insertar datos en MySQL' }) };
    }
});

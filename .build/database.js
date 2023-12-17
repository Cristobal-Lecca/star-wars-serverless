"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = exports.MyEntity = void 0;
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
let MyEntity = class MyEntity {
};
exports.MyEntity = MyEntity;
__decorate([
    (0, typeorm_2.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MyEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_2.Column)(),
    __metadata("design:type", String)
], MyEntity.prototype, "nombre", void 0);
exports.MyEntity = MyEntity = __decorate([
    (0, typeorm_2.Entity)()
], MyEntity);
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.MYSQL_HOST,
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    synchronize: true,
    logging: true,
    entities: [MyEntity],
    subscribers: [],
    migrations: [],
});
exports.AppDataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization", err);
});
// export const connectToDatabase = async (): Promise<Connection> => {
//     try {
//         const connection = await createConnection({
//             type: 'mysql',
//             host: process.env.MYSQL_HOST,
//             port: 3306,
//             username: process.env.MYSQL_USER,
//             password: process.env.MYSQL_PASSWORD,
//             database: process.env.MYSQL_DATABASE,
//             entities: [MyEntity],
//             synchronize: true, // Esto crea las tablas automáticamente (solo para desarrollo)
//         });
//         console.log('Conexión exitosa a la base de datos MySQL');
//         return connection;
//     } catch (error) {
//         console.error('Error al conectar a la base de datos:', error);
//         throw error;
//     }
// }

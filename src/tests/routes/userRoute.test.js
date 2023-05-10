const request = require('supertest');
const createServer = require('../../utils/server')
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const server = createServer;

//A sécuriser

describe('userRoute TEST', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost/apinodeusertest', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        );
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });

    it('Méthode userRegister', async () => {

        const user = [
            {
                email: 'test@yopmail.fr',
                password: 'test123'
            }
        ];

        const response = await request(server)
            .post('/user/register')
            .send(user[0]);

        expect(response.status).toEqual(201);
    })

    it('Méthode userLogin', async () => {

        const user = [
            {
                email: 'test@yopmail.fr',
                password: 'test123'
            }
        ];

        const response = await request(server)
            .post('/user/login')
            .send(user[0]);

        expect(response.status).toEqual(200);
    })
})
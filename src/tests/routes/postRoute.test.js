const request = require('supertest');
const createServer = require('../../utils/server')
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const server = createServer;

//A sécuriser
const JWT_KEY = process.env.JWT_KEY

describe('postRoute TEST', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost/apinodeposttest', { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });

    let post_id;

    it('Méthode createAPost avec JWT Key', async () => {

        const posts = [
            {
                title: 'post1',
            }
        ];

        const token = jwt.sign({ JWT_KEY }, JWT_KEY);

        const response = await request(server)
            .post('/posts')
            .set('Authorization', token)
            .send(posts[0]);

        // await request(server)
        //     .post('/posts')
        //     .set('Authorization', `Bearer ${token}`)
        //     .send(posts[1]);

        //const response = await request(server).get('/posts');

        expect(response.status).toEqual(201);
    })

    it('Méthode createAPost avec fausse JWT Key', async () => {

        const posts = [
            {
                title: 'post1',
            }
        ];

        const fausseKey = 'test'

        const tokenTest = jwt.sign({ fausseKey }, 'fausse_key');

        const response = await request(server)
            .post('/posts')
            .set('Authorization', tokenTest)
            .send(posts[0]);

        expect(response.status).toEqual(403);
    })

    it('Méthode createAPost sans JWT Key', async () => {

        const posts = [
            {
                title: 'post1',
            }
        ];

        const response = await request(server)
            .post('/posts')
            .send(posts[0]);

        expect(response.status).toEqual(403);
    })

    it('Méthode listAllPosts', async () => {

        const response = await request(server)
            .get('/posts');

        expect(response.status).toEqual(200);
        //1 Car précédemment on a create 1 post 
        expect(response.body).toHaveLength(1);
        expect(response.body[0].title).toBe('post1');
        post_id = response.body[0]._id;
    })

    it('Méthode updateAPost', async () => {

        const token = jwt.sign({ JWT_KEY }, JWT_KEY);


        const response = await request(server)
            .put(`/posts/${post_id}`)
            .set('Authorization', token)
            .send({ title: 'titre_changé' })


        expect(response.status).toEqual(200);
    })

    it('Méthode getAPost', async () => {

        const token = jwt.sign({ JWT_KEY }, JWT_KEY);


        const response = await request(server)
            .get(`/posts/${post_id}`)
            .set('Authorization', token)


        expect(response.status).toEqual(200);
    })

    it('Méthode deleteAPost', async () => {

        const token = jwt.sign({ JWT_KEY }, JWT_KEY);


        const response_1 = await request(server)
            .delete(`/posts/${post_id}`)
            .set('Authorization', token)


        expect(response_1.status).toEqual(200);
    })
})
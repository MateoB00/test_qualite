const request = require('supertest');
const createServer = require('../../utils/server')
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const server = createServer;

//A sécuriser
const JWT_KEY = process.env.JWT_KEY

describe('commentRoute TEST', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost/apinodecommenttest', { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });

    let post_id;
    let comment_id;

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

        expect(response.status).toEqual(201);
    })

    it('Méthode listAllPosts pour récupérer l\'id d\'un post', async () => {

        const response = await request(server)
            .get('/posts');

        expect(response.status).toEqual(200);
        //1 Car précédemment on a create 1 post 
        expect(response.body).toHaveLength(1);
        expect(response.body[0].title).toBe('post1');
        post_id = response.body[0]._id;
    })

    it('Méthode createAComment', async () => {

        const comment = [
            {
                name: 'comment1',
                message: 'message1',
            }
        ]
        const response = await request(server)
            .post(`/posts/${post_id}/comments`)
            .send(comment[0]);

        expect(response.status).toEqual(201);
    })

    it('Méthode listAllComments', async () => {

        const response = await request(server)
            .get(`/posts/${post_id}/comments`);

        expect(response.status).toEqual(200);
        //1 Car précédemment on a create 1 post 
        expect(response.body).toHaveLength(1);
        expect(response.body[0].name).toBe('comment1');
        comment_id = response.body[0]._id;
    })

    it('Méthode updateAComment', async () => {

        const response = await request(server)
            .put(`/comments/${comment_id}`)
            .send({ name: 'name_changé' })

        expect(response.status).toEqual(200);
    })

    it('Méthode getAComment', async () => {

        const response = await request(server)
            .get(`/comments/${comment_id}`)

        expect(response.status).toEqual(200);
        expect(response.body.name).toBe('name_changé');
    })

    it('Méthode deleteAComment', async () => {

        const response = await request(server)
            .delete(`/comments/${comment_id}`)

        expect(response.status).toEqual(200);
    })
})
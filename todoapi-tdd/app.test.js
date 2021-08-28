const request = require('supertest');
const { response } = require('./app');
const app = require('./app');

describe('Todos API', () =>{
    it('GET /todos ===> array of Todos', () => {
        return request(app)
        .get('/todos')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining(
                        {
                            id: expect.any(Number),
                            name: expect.any(String),
                            done: any(Boolean)
                        }
                    )
                ])
            )
        })
    })
    it('GET /todos/id ===> Todo by ID', () => {
        return request(app)
        .get('/todos/1')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
                expect.objectContaining(
                    {
                        id: 1,
                        name: expect.any(String),
                        done: any(Boolean)
                    }
                )
            )
        })
    })
    it('GET /todos/id ===> 404', () => {
        return request(app)
        .get('/todos/555555')
       // .expect('Content-Type', /json/)
        .expect(404)
    })
    it('POST /todos ===> Todo', () => {
        return request(app)
        .post('/todos')
        .send({
            name: 'my todo',
            done: false        
        })
        .expect('Content-Type', /json/)
        .expect(201)
        .then((response) => {
            expect(response.body).toEqual(
                expect.objectContaining(
                    {
                        id: 1,
                        name: 'my todo',
                        done: false
                    }
                )
            )
        })

    })
    it('POST /todos ===> Validate Body of Todo', () => {
        return request(app)
        .post('/todos')
        .send({
            name: 'my todo',
            done: false        
        })
        .expect(400)
    })
})

//GET /todos
//GET /todos/id
//POST /todos 
//PUT /todos/id
//DELETE /todos/id
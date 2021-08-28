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
    it('GET /todos/id ===> Todo by ID', () => {})
    it('GET /todos/id ===> 404', () => {})
    it('POST /todos ===> Todo', () => {})
    it('POST /todos ===> array of Todos', () => {})
})

//GET /todos
//GET /todos/id
//POST /todos 
//PUT /todos/id
//DELETE /todos/id
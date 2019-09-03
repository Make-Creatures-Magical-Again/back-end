require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Creature = require('../lib/models/Creature');


describe('app routes', () => {
    beforeAll(() => {
        connect();
    });

    beforeEach(() => {
        return mongoose.connection.dropDatabase();
    });

    afterAll(() => {
        return mongoose.connection.close();
    });

    it('POST route creates a creature in the database', () => {

        return request(app)
            .post('/api/v1/creatures')
            .send({ 
                name: 'possum babby',
                magic: 'hissin',
                pretty: false,
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    name: 'possum babby', 
                    magic: 'hissin',
                    pretty: false,
                    __v: 0
                });
            });
    });  
      

    it('GET returns all creatures', async() => {

        const creature1 = await Creature.create({
            name: 'evil babby',
            magic: 'yellin',
            pretty: true
        });

        const creature2 = await Creature.create({
            name: 'good babby',
            magic: 'fightin',
            pretty: true
        });

        return request(app)
            .get('/api/v1/creatures')
            .then(res => {
                expect(res.body).toEqual([
                    { _id: creature1._id.toString(), name: 'evil babby', magic: 'yellin', pretty: true },
                    { _id: creature2._id.toString(), name: 'good babby', magic: 'fightin', pretty: true }
                ]);
            });
    });


    //     it('GET /:id returns a Actor by id', async() => {

    //         const studio = await Studio.create({
    //             name: 'A1',
    //             address: { city: 'nyc', state: 'new york', country: 'usa' }
    //         });
        
    //         const actor = await Actor.create({
    //             name: 'Crying Lady',
    //             dob: new Date('October 31, 2009'),
    //             pob: 'ohio'
    //         });

    //         const film = await Film.create({
    //             title: 'Midsommar2 Electric Cultaroo',
    //             studio: studio._id,
    //             released: 2020,
    //             cast: [{
    //                 actor: actor._id
    //             }]
    //         });

    //         return request(app)
    //             .get(`/api/v1/actors/${actor._id}`)
    //             .then(res => {
    //                 expect(res.body).toEqual({
    //                     name: actor.name,
    //                     dob: actor.dob.toISOString(),
    //                     pob: actor.pob,
    //                     films: [{ 
    //                         _id: film._id.toString(), 
    //                         title: film.title, 
    //                         released: film.released 
    //                     }]
    //                 });
    //             });
    //     });


    //     it('PUT actors/:id updates a actor by id', async() => {

    //         const actor = await Actor.create({
    //             name: 'ActorLady 123',
    //         });

    //         return request(app)
    //             .put(`/api/v1/actors/${actor._id}`)
    //             .send({ 
    //                 name: 'NEW actorlady 456',
    //             })
    //             .then(res => {
    //                 expect(res.body).toEqual({ 
    //                     _id: expect.any(String),
    //                     name: 'NEW actorlady 456', 
    //                     __v: 0 });
    //             });
    //     });

   
    //     it('deletes actor if there is NO film', async() => {

    //         const actor = await Actor.create({
    //             name: 'Crying Lady',
    //             dob: new Date('October 31, 2009'),
    //             pob: 'ohio'
    //         });

    //         return request(app)
    //             .delete(`/api/v1/actors/${actor._id}`)
    //             .then(res => {
    //                 expect(res.body).toEqual({ 
    //                     _id: expect.any(String),
    //                     name: 'Crying Lady',
    //                     dob: new Date('October 31, 2009').toISOString(),
    //                     pob: 'ohio', 
    //                     __v: 0 });
    //             });
    //     });

    
    //     it('does NOT delete if there IS a film', async() => {

    //         const studio = await Studio.create({
    //             name: 'A1',
    //             address: { city: 'nyc', state: 'new york', country: 'usa' }
    //         });

    //         const actor = await Actor.create({
    //             name: 'Crying Lady',
    //             dob: new Date('October 31, 2009'),
    //             pob: 'ohio'
    //         });

    //         await Film.create({
    //             title: 'Midsommar',
    //             studio: studio._id,
    //             released: 2019,
    //             cast: [
    //                 {
    //                     actor: actor._id.toString()
    //                 }
    //             ]
    //         });

//         return request(app)
//             .delete(`/api/v1/actors/${actor._id}`)
//             .then(res => {
//                 expect(res.body).toEqual({ error: 'nope' });
//             });
//     });
});

const { Router } = require('express');
const Creature = require('../models/Creature');

module.exports = Router() 

    .post('/', (req, res, next) => {

        const {
            name,
            magic,
            pretty
        } = req.body;

        Creature
            .create({ name, magic, pretty })
            .then(creature => {
                res.send(creature);
            })
            .catch(next);
    })

    .get('/', (req, res, next) => {
        
        Creature
            .find()
            .select({ __v: false })
            .then(creatures => {
                res.send(creatures);
            })
            .catch(next);
    }); 

// .get('/:id', (req, res, next) => {
//     Promise.all([
//         Actor
//             .findById(req.params.id)
//             .select({ __v: false, _id: false }),
            
//         Film
//             .find({ 'cast.actor': req.params.id })
//             .populate('actor')
//             .select({ __v: false, studio: false, cast: false })
//     ])
//         .then(([actor, films]) => {
//             res.send({ ...actor.toJSON(), films });
//         })
//         .catch(next);
// })

// .put('/:id', (req, res, next) => {

//     const {
//         name,
//         address,
//     } = req.body;

//     Actor
//         .findByIdAndUpdate(req.params.id, { name, address }, { new: true })
//         .then(replacedActor => {
//             res.send(replacedActor);
//         })
//         .catch(next);

// })

// .delete('/:id', (req, res, next) => {
//     Film
//         .find({ 'cast.actor': req.params.id })
//         .then(films => {
//             if(films.length === 0) {
//                 Actor
//                     .findByIdAndDelete(req.params.id)
//                     .then(deletedActor => {
//                         res.send(deletedActor);
//                     })
//                     .catch(next);
//             }
//             else {
//                 res.send({ error: 'nope' });
//             }
//         })
//         .catch(next);
//});

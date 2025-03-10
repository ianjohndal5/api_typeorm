const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const Role = require('_helpers/role');
const userService = require('./user.service');

router.get('/', getAll);
router.get('/:id', getById); // Fixed typo: Changed '.' to ','.
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users)) // Fixed typo: Changed 'resizeBy.json' to 'res.json'.
        .catch(next);
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function create(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({ message: 'User created' })) // Fixed formatting.
        .catch(next);
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'User updated' })) // Fixed formatting.
        .catch(next);
}

function _delete(req, res, next) { // Fixed missing parameters: Added 'req, res, next'.
    userService.delete(req.params.id)
        .then(() => res.json({ message: 'User deleted' })) // Fixed formatting.
        .catch(next);
}

function createSchema(req, res, next) { // Fixed missing parameters: Added 'req, res, next'.
    const schema = Joi.object({
        title: Joi.string().required(), // Fixed typo: Changed 'require()' to 'required()'.
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        role: Joi.string().valid(Role.Admin, Role.User).required(), // Fixed argument structure in 'valid()'.
        email: Joi.string().required(),
        password: Joi.string().required(),
        confirmpassword: Joi.string().valid(Joi.ref('password')).required() // Fixed typo: Changed 'require()' to 'required()'.
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) { // Fixed missing parameters: Added 'req, res, next'.
    const schema = Joi.object({
        title: Joi.string().empty(''),
        firstname: Joi.string().empty(''),
        lastname: Joi.string().empty(''),
        role: Joi.string().valid(Role.Admin, Role.User).empty(''), // Fixed argument structure in 'valid()'.
        email: Joi.string().empty(''),
        password: Joi.string().empty(''),
        confirmpassword: Joi.string().valid(Joi.ref('password')).empty('')
    }).with('password', 'confirmpassword'); // Fixed typo: Changed 'confirmPassword' to 'confirmpassword'.
    validateRequest(req, next, schema);
}

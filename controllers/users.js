const mongodb = require('../data/contacts');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Users']

    // const result = await mongodb.getDatabase().db().collection('users').find();
    // result.toArray().then((users) => {
    //     res.setHeader('Content-type', 'application/json');
    //     res.status(200).json(users);
    // });

    mongodb
        .getDatabase()
        .db()
        .collection('contacts')
        .find()
        .toArray((err, lists) => {
            if (err) {
                res.status(400).json({message: err});
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        })
};

// const getSingle = async (req, res) => {
const getSingle = (req, res) => {

    //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    // const result = await mongodb.getDatabase().db().collection('users').find({_id: userId});
    // result.toArray().then((users) => {
    //     res.setHeader('Content-type', 'application/json');
    //     res.status(200).json(users[0]);
    // });
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to find a contact.');
      }
    mongodb
        .getDatabase()
        .db()
        .collection('contacts')
        .find({_id: userId})
        .toArray((err, lists) => {
            if (err) {
                res.status(400).json({message: err});
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result[0]);
        })
};

const createUser = async (req, res) => {
    //#swagger.tags=['Users']
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    const response = await mongodb.getDatabase().db().collection('users').insertOne(user);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the user.');
    }
};

const updateUser = async (req, res) => {
    //#swagger.tags=['Users']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to update a contact.');
      }
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    const response = await mongodb.getDatabase().db().collection('users').replaceOne({_id: userId}, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the user.');
    }
};

const deleteUser = async (req, res) => {
    //#swagger.tags=['Users']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to delete a contact.');
      }
    const userId = new ObjectId(req.params.id);

    const response = await mongodb.getDatabase().db().collection('users').deleteOne({_id: userId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the user.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};
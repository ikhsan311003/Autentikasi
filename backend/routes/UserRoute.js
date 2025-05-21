const express = require("express");
const {
    getUsers,
    getUsersById,
    createUser,
    updateUser,
    deleteUser
} = require("../controllers/UserController");

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUsersById);
router.post('/users', createUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router;

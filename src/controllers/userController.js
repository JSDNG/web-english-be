const { getAllUser, getUserById, createNewUser, updateUserById, deleteUserById } = require("../services/userService");

const createUser = async (req, res) => {
    let { username, groupId, accountId } = req.body;

    if (!username) {
        return res.status(400).json({
            EC: 1,
            EM: "Missing required params",
        });
    } else {
        await createNewUser(username, groupId, accountId);
        // Send success response
        res.status(200).json({
            EC: 0,
            EM: "User created successfully",
        });
    }
};

const getAllUsers = async (req, res) => {
    let results = await getAllUser();
    return res.status(200).json({
        EC: 0,
        EM: "ok",
        DT: results,
    });
};

const updateUser = async (req, res) => {
    let { id, password } = req.body;
    if (!id || !password) {
        return res.status(200).json({
            EC: 1,
            EM: "missing required params",
        });
    } else {
        await updateUserById(password, id);
        return res.status(200).json({
            EC: 0,
            EM: "ok",
        });
    }
};

const deleteUser = async (req, res) => {
    let id = req.params.id;
    if (!id) {
        return res.status(200).json({
            EC: 1,
            EM: "missing required params",
        });
    } else {
        await deleteUserById(id);
        return res.status(200).json({
            EC: 0,
            EM: "ok",
        });
    }
};

const getUser = async (req, res) => {
    let id = req.params.id;
    if (!id) {
        return res.status(200).json({
            EC: 1,
            EM: "missing required params",
        });
    } else {
        let data = await getUserById(id);
        return res.status(200).json({
            EC: 0,
            EM: "ok",
            DT: data,
        });
    }
};
module.exports = {
    createUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
};

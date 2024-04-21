const db = require("../models");
const group = require("../models/group");

const getAllGroup = async () => {
    let lists = [];
    lists = await db.Group.findAll();
    return lists;
};

const getGroupById = async (id) => {
    let data = await db.Group.findByPk(id);
    //let data = results && results.length > 0 ? results : {};
    return data.get({ plain: true });
};

const createNewGroup = async (name, description) => {
    try {
        await db.Group.create({
            name: name,
            description: description,
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Group.",
        });
    }
};
const updateGroupById = async (password, id) => {
    await db.Group.update(
        {
            password,
        },
        {
            where: { id: id },
        }
    );
};

const deleteGroupById = async (id) => {
    await db.Group.destroy({
        where: {
            id: id,
        },
    });
};
module.exports = {
    getAllGroup,
    getGroupById,
    createNewGroup,
    updateGroupById,
    deleteGroupById,
};

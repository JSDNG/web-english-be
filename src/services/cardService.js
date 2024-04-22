const db = require("../models");

const getAllCard = async () => {
    // test relationships
    // let newgroup = await db.Card.findOne({
    //     where: { id: 2 },
    //     include: { model: db.StudySet },
    //     raw: true,
    //     nest: true,
    // });

    // console.log(">>>> check ", roles);
    let lists = [];
    lists = await db.Card.findAll();
    return lists;
};

const getCardById = async (id) => {
    let data = await db.Card.findByPk(id);
    //let data = results && results.length > 0 ? results : {};
    return data.get({ plain: true });
};

const createNewCard = async (term, definition, studySetId) => {
    await db.Card.create({
        term: term,
        definition: definition,
        studySetId: studySetId,
    });
};
const updateCardById = async (password, id) => {
    await db.Card.update(
        {
            password,
        },
        {
            where: { id: id },
        }
    );
};

const deleteCardById = async (id) => {
    await db.Card.destroy({
        where: {
            id: id,
        },
    });
};
module.exports = {
    getAllCard,
    getCardById,
    createNewCard,
    updateCardById,
    deleteCardById,
};

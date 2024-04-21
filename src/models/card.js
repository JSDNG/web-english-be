module.exports = (sequelize, Sequelize) => {
    const Card = sequelize.define("Card", {
        term: {
            type: Sequelize.STRING,
        },
        definition: {
            type: Sequelize.STRING,
        },
        studySetId: {
            type: Sequelize.INTEGER,
        },
    });

    return Card;
};

module.exports = (sequelize, Sequelize) => {
    const Card = sequelize.define("card", {
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

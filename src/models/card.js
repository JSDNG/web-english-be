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
    Card.associate = function (models) {
        Card.belongsTo(models.StudySet, { foreignKey: "studySetId" });
    };
    return Card;
};

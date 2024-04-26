module.exports = (sequelize, Sequelize) => {
    const Card = sequelize.define(
        "Card",
        {
            term: {
                type: Sequelize.STRING,
            },
            definition: {
                type: Sequelize.STRING,
            },
            studySetId: {
                type: Sequelize.INTEGER,
            },
        },
        {
            // options
            charset: "utf8",
            collate: "utf8_general_ci",
        }
    );
    Card.associate = function (models) {
        Card.belongsTo(models.StudySet, { foreignKey: "studySetId" });
    };
    return Card;
};

const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    port: dbConfig.PORT,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
    define: {
        freezeTableName: dbConfig.define.freezeTableName,
    },
    logging: dbConfig.logging,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Account = require("./account.js")(sequelize, Sequelize);
db.Card = require("./card.js")(sequelize, Sequelize);
db.Class = require("./class.js")(sequelize, Sequelize);
db.Folder = require("./folder.js")(sequelize, Sequelize);
db.FolderDetail = require("./folderDetail.js")(sequelize, Sequelize);
db.Group = require("./group.js")(sequelize, Sequelize);
db.GroupRole = require("./groupRole.js")(sequelize, Sequelize);
db.Role = require("./role.js")(sequelize, Sequelize);
db.Student = require("./student.js")(sequelize, Sequelize);
db.StudySet = require("./studySet.js")(sequelize, Sequelize);
db.User = require("./user.js")(sequelize, Sequelize);

//Many-to-many relation between Group and Role
db.Group.belongsToMany(db.Role, { through: db.GroupRole });
db.Role.belongsToMany(db.Group, { through: db.GroupRole });

//One-to-many relation between User and Group
db.Group.hasMany(db.User);
db.User.belongsTo(db.Group);

//One-to-one relation between User and Account
db.Account.hasOne(db.User);
db.User.belongsTo(db.Account);

//One-to-many relation between Folder and User
db.User.hasMany(db.Folder);
db.Folder.belongsTo(db.User);

//One-to-many relation between Class and User(Create class)
// db.User.hasMany(db.Class);
// db.Class.belongsTo(db.User);

//Many-to-many relation between Class and User
db.User.belongsToMany(db.Class, { through: db.Student });
db.Class.belongsToMany(db.User, { through: db.Student });

//One-to-many relation between StudySet and Class
db.Class.hasMany(db.StudySet);
db.StudySet.belongsTo(db.Class);

//Many-to-many relation between  StudySet and Folder
db.Folder.belongsToMany(db.StudySet, { through: db.FolderDetail });
db.StudySet.belongsToMany(db.Folder, { through: db.FolderDetail });

//One-to-many relation between StudySet and User
db.User.hasMany(db.StudySet);
db.StudySet.belongsTo(db.User);

//One-to-many relation between StudySet and User
db.StudySet.hasMany(db.Card);
db.Card.belongsTo(db.StudySet);

module.exports = db;

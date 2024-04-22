const express = require("express");
const { getAllCards, createCard, getCard, updateCard, deleteCard } = require("../controllers/cardController");
const router = express.Router();

const initAPIRoutes = (app) => {
    router.get("/card/info/:id", getCard);

    router.post("/card", createCard);
    router.get("/card/all", getAllCards);
    router.put("/card/change-password", updateCard);
    router.delete("/card/:id", deleteCard);

    return app.use("/api/", router);
};

module.exports = initAPIRoutes; // export default

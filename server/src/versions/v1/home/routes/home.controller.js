const {getHomeData} = require("../model/home.model");
async function getHomeController(req, res) {
    try {
        const {userId} = req.user;
        const homeData = await getHomeData(userId);
        res.json(homeData);
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = {
  getHomeController,
};
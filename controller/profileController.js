const profileModel = require("../model/profileModel");

const getProfile = async (req, res) => {
    const data = await profileModel.profileModel.findOne({
        user: req.user.id,
    });
    if (!data) return res.status(404).send("No profile found!!!");

    res.send(data);
};

const setProfile = async (req, res) => {
    let userProfile = req.body;
    userProfile.user = req.user.id;

    const profile = await profileModel.profileModel.findOne({
        user: req.user.id,
    });
    if (profile) {
        const data = await profileModel.profileModel.updateOne(
            { user: req.user.id },
            userProfile
        );
        res.send(data);
    } else {
        const data = new profileModel.profileModel(userProfile);
        const result = await data.save();
        res.send(result);
    }
};

module.exports.getProfile = getProfile;
module.exports.setProfile = setProfile;

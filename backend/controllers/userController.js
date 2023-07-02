const { User } = require("../models/User");


const getUser = async (req, res) => {
  try {
    const { status } = req.params;
    switch (status) {
      case "active":
        const userActive = await User.find({ active: true });
        res.json(userActive);
        break;
      case "notactive":
        const userNotActive = await User.find({ active: false });
        res.json(userNotActive);
        break;
      case "numberUsers":
        const userallnum = await User.estimatedDocumentCount();
        res.json(userallnum);
        break;
      default:
        const user = await User.find();
        res.json(user);
        break;
    }
  } catch (error) {
    res.status(500).json({ error: `${error.message} in user/getUser` });
    console.log({ error: `${error.message} in user/getUser` });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, {
      role: "admin",
    });
    res.status(200).json({ success: "user updated successfully" });
  } catch (error) {
    res.status(500).json({ error: `${error.message} in user/updateUser` });
    console.error("Error editing user in user/updateUser", error);
  }
};

const RetrieveUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, {
      active: true,
    });
    res.status(200).json({ success: "user Retrieve successfully" });
  } catch (error) {
    res.status(500).json({ error: `${error.message} in user/updateUser` });
    console.error("Error editing user in user/updateUser", error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, {
      active: false,
    });
    res.status(200).json({ success: "user deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: `${error.message} in user/updateUser` });
    console.error("Error editing user in user/updateUser", error);
  }
};

module.exports = {
  getUser,
  updateUser,
  deleteUser,
  RetrieveUser,
};

const bcrypt = require("bcrypt");
const { Provider } = require("../models/Providers");

const addProvider = async (req, res) => {
  const {
    companyName,
    email,
    password,
    city,
    serviceType,
    description,
    companyImage,
    services,
    workHours,
  } = req.body;
  try {
    // email check
    const provider = await Provider.findOne({ email: email });
    if (provider !== null) {
      return res
        .status(409)
        .json({ error: "email already exists try another one" });
    }
    // password hash
    const hashedPwd = await bcrypt.hash(password, 10);
    const Newuser = await Provider.create({
      companyName,
      email,
      password: hashedPwd,
      city,
      serviceType,
      description,
      companyImage,
      services,
      workHours,
    });
    res
      .status(201)
      .json({ success: `New provider ${companyName} created successfully!` });
  } catch (error) {
    res.status(500).json({ error: `${error.message} in addProviders` });
    console.log(error);
  }
};

const getProvider = async (req, res) => {
  try {
    const { status } = req.params;
    switch (status) {
      case "active":
        const userActive = await Provider.find({ active: true });
        res.json(userActive);
        break;
      case "notactive":
        const userNotActive = await Provider.find({ active: false });
        res.json(userNotActive);
        break;
        case "numberProviders":
          const userallnum = await Provider.estimatedDocumentCount();
          res.json(userallnum);
          break;
      default:
        const user = await Provider.find();
        res.json(user);
        break;
    }
  } catch (error) {
    res.status(500).json({ error: `${error.message} in user/getUser` });
    console.log({ error: `${error.message} in user/getUser` });
  }
};
module.exports = { addProvider, getProvider };

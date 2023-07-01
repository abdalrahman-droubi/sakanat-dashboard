const bcrypt = require("bcrypt");
const { Provider } = require("../models/Providers");

const addProvider = async (req, res) => {
    console.log(req.body);
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
    // const hashedPwd = await bcrypt.hash(password, 10);
    const Newuser = await Provider.create({
        companyName,
        email,
        password,
        city,
        serviceType,
        description,
        companyImage,
        services,
        workHours,
      });
    res
      .status(201)
      .json({ success: `New user ${email} created successfully!` });
  } catch (error) {
    res.status(500).json({ error: `${error.message} in handleNewUser` });
    console.log(error);
  }
};

module.exports = { addProvider };

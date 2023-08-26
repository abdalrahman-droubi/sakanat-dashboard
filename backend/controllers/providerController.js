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
    phoneNumber,
    services,
    workHours,
  } = req.body;

  try {
    // email check
    const provider = await Provider.findOne({ email: email });
    if (provider !== null) {
      return res
        .status(409)
        .json({ error: "email already exists, try another one" });
    }

    // password hash
    const hashedPwd = await bcrypt.hash(password, 10);

    // Create an array to store the uploaded file paths
    const companyImagePaths = [];

    // Check if files were uploaded
    if (req.files && req.files.length > 0) {
      // Loop through the uploaded files and save them
      req.files.forEach((file) => {
        // Save the file path to the array
        companyImagePaths.push(file.path);
      });
    }
    console.log(
      companyImagePaths,
      companyName,
      email,
      password,
      city,
      serviceType,
      description,
      phoneNumber,
      services,
      workHours
    );
    // Create a new provider with the uploaded image paths
    const newProvider = await Provider.create({
      companyName,
      email,
      password: hashedPwd,
      city,
      serviceType,
      description,
      phoneNumber,
      companyImage: companyImagePaths,
      services:JSON.parse(services),
      workHours:JSON.parse(workHours),
    });

    res.status(201).json({
      success: `New provider ${companyName} created successfully!`,
    });
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
        const userAllNum = await Provider.estimatedDocumentCount();
        res.json(userAllNum);
        break;
      default:
        const user = await Provider.find();
        res.json(user);
        break;
    }
  } catch (error) {
    res.status(500).json({ error: `${error.message} in provider/getProvider` });
    console.log({ error: `${error.message} in provider/getProvider` });
  }
};

const RetrieveProvider = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Provider.findByIdAndUpdate(id, {
      active: true,
    });
    res.status(200).json({ success: "Provider Retrieve successfully" });
  } catch (error) {
    res.status(500).json({ error: `${error.message} in provider/updateUser` });
    console.error("Error Retrieve user in provider/RetrieveProvider", error);
  }
};

const deleteProvider = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Provider.findByIdAndUpdate(id, {
      active: false,
    });
    res.status(200).json({ success: "Provider deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: `${error.message} in provider/updateUser` });
    console.error("Error delete user in provider/deleteProvider", error);
  }
};
module.exports = { addProvider, getProvider, RetrieveProvider, deleteProvider };

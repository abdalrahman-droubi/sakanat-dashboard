const bcrypt = require("bcrypt");
const { Provider } = require("../models/Providers");
const { ServicesRequest } = require("../models/ServicesRequest");

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
    const newProvider = await Provider.create({
      companyName,
      email,
      password: hashedPwd,
      city,
      serviceType,
      description,
      phoneNumber,
      companyImage: companyImagePaths,
      services: JSON.parse(services),
      workHours: JSON.parse(workHours),
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

const getOneProvider = async (req, res) => {
  try {
    const { id } = req.params;
    const oneProvider = await Provider.findById(id);
    const completed = await ServicesRequest.countDocuments({
      provider: id,
      status: "completed",
    });
    const rejected = await ServicesRequest.countDocuments({
      provider: id,
      status: "rejected",
    });
    const pending = await ServicesRequest.countDocuments({
      provider: id,
      status: "pending",
    });
    const inprogress = await ServicesRequest.countDocuments({
      provider: id,
      status: "inprogres",
    });

    res
      .status(200)
      .json({ oneProvider, rejected, pending, inprogress, completed });
  } catch (error) {
    res
      .status(500)
      .json({ error: `${error.message} in provider/getOneProvider` });
    console.error("Error delete user in provider/deleteProvider", error);
  }
};

const updateProviderAccount = async (req, res) => {
  try {
    const { companyName, password, newPassword } = req.body;
    const { id } = req.params;
    const provider = await Provider.findById(id);

    if (password) {
      const truePassword = await bcrypt.compare(password, provider.password);
      if (!truePassword)
        return res.status(401).json({ error: "incorrect password" });

      const hashpassword = await bcrypt.hash(newPassword, 10);
      provider.companyName = companyName || provider.companyName;
      provider.password = hashpassword;
      const updatedUser = await provider.save();

      res.status(200).json(updatedUser);
    } else {
      provider.companyName = companyName || provider.companyName;
      const updatedUser = await provider.save();
      res.status(200).json(updatedUser);
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: `${error.message} in updateProviderAccount` });
    console.error("Error updateProviderAccount:", error);
  }
};

module.exports = {
  addProvider,
  getProvider,
  RetrieveProvider,
  deleteProvider,
  getOneProvider,
  updateProviderAccount
};

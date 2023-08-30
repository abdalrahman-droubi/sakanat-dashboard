const { ServicesRequest } = require("../models/ServicesRequest");

const getRequestServices = async (req, res) => {
  try {
    const { status, id } = req.params;
    switch (status) {
      case "pending":
        const RequestPending = await ServicesRequest.find({
          provider: id,
          status: "pending",
        }).populate("user", "fullName");
        res.json(RequestPending);
        break;
      case "inprogres":
        const Requestinprogres = await ServicesRequest.find({
          provider: id,
          status: "inprogres",
        }).populate("user", "fullName");
        res.json(Requestinprogres);
        break;
      case "rejected":
        const Requestrejected = await ServicesRequest.find({
          provider: id,
          status: "rejected",
        }).populate("user", "fullName");
        res.json(Requestrejected);
        break;
      case "completed":
        const Requestcompleted = await ServicesRequest.find({
          provider: id,
          status: "completed",
        }).populate("user", "fullName");
        res.json(Requestcompleted);
        break;
      case "numberallRequest":
        const numberallRequest = await ServicesRequest.estimatedDocumentCount();
        res.json(numberallRequest);
        break;
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: `${error.message} in servicesRequest/getRequestServices` });
    console.error("Error delete user in servicesRequest/getRequestServices", error);
  }
};

const updateRequestStatus = async (req, res) => {
  try {
    const { type, id } = req.params;
    switch (type) {
      case "reject":
        const updateReject = await ServicesRequest.findOneAndUpdate(
          {
            _id: id,
          },
          { status: "rejected" }
        );
        res.json(updateReject);
        break;
      case "accept":
        const updateinprogres = await ServicesRequest.findOneAndUpdate(
          {
            _id: id,
          },
          { status: "inprogres" }
        );
        res.json(updateinprogres);
        break;
      case "completed":
        const updatecompleted = await ServicesRequest.findOneAndUpdate(
          {
            _id: id,
          },
          { status: "completed" }
        );
        res.json(updatecompleted);
        break;
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: `${error.message} in servicesRequest/updateRequestStatus` });
    console.error("Error delete user in servicesRequest/updateRequestStatus", error);
  }
};
const getAllRequest = async (req, res) => {
  try {
        const getAllRequest = await ServicesRequest.find().populate("user", "fullName _id").populate("provider","_id companyName");
        res.json(getAllRequest);
  } catch (error) {
    res
      .status(500)
      .json({ error: `${error.message} in servicesRequest/getAllRequest` });
    console.error("Error delete user in servicesRequest/getAllRequest", error);
  }
};
module.exports = { getRequestServices, updateRequestStatus,getAllRequest };

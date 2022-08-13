import serverModel from "../models/serverModel.js";

const getData = async (req, res, next) => {
  try {
    const data = await serverModel.readData();
    res.send(data);
  } catch (err) {
    next(err);
    res.status(500).send(error.message);
  }
};

const addData = async (req, res, next) => {
  try {
    serverModel.writeData(req.body);
    res.send({ msg: "data saved" });
  } catch (error) {
    next(error);
    res.status(500).send(error.message);
  }
};

export default { getData, addData };

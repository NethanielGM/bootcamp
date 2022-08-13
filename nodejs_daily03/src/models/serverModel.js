import fs from "fs";
import { nanoid } from "nanoid";
const getDurationInMilliseconds = (start) => {
  const NS_PER_SEC = 1e9;
  const NS_TO_MS = 1e6;
  const diff = process.hrtime(start);
  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};
const logger = async (req, res, next) => {
  try {
    const start = process.hrtime();
    res.on("finish", async () => {
      const durationInMilliseconds = getDurationInMilliseconds(start);
      const newData = {
        url: req.url,
        method: req.method,
        duration: durationInMilliseconds,
      };
      await fs.promises.appendFile(
        "src/log.txt",
        JSON.stringify(newData),
        "utf8"
      );
    });
    next();
  } catch (err) {
    console.error(err);
  }
};

const readData = async () => {
  try {
    const data = await fs.promises.readFile("src/data/content.txt", "utf8");
    return data;
  } catch (err) {
    console.error(err);
  }
};

const writeData = async (textData) => {
  try {
    const newData = {
      id: nanoid(7),
      text: textData.text,
    };
    await fs.promises.appendFile(
      "src/data/content.txt",
      JSON.stringify(newData),
      "utf8"
    );
  } catch (err) {
    console.error(err);
  }
};

export default {
  readData,
  writeData,
  logger,
};

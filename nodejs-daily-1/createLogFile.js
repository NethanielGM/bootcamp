const fs = require("fs");
const path = require("path");
const args = process.argv.slice(2);
const createLog = (msg, relativePath) => {
  const isFolderExist = fs.existsSync(relativePath);
  if (!isFolderExist) {
    fs.mkdir(path.join(__dirname, relativePath), (err) => {
      if (err) throw err;
      console.log("Folder Created...");
      fs.writeFile(
        path.join(__dirname, relativePath, "log.txt"),
        new Date().toLocaleString() + ": " + msg,
        (err) => {
          if (err) throw err;
          console.log("File Created..");
        }
      );
    });
  } else {
    fs.appendFile(
      path.join(__dirname, relativePath, "log.txt"),
      "\n" + new Date().toLocaleString() + ": " + msg,
      (err) => {
        if (err) throw err;
        console.log("File written to...");
      }
    );
  }
};

createLog(args[0], args[1]);

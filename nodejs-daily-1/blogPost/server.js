const http = require("http");
const fs = require("fs");

const data = fs.readFileSync("./Lorem.txt", "utf8");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  if (req.url === "/") {
    res.write(data);
    res.end();
  } else {
    res.write("error");
    res.end();
  }
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

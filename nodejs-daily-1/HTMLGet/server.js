const http = require("http");
const fs = require("fs");

const data = fs.readFileSync("./index.html", "utf8");
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  if (req.url === "/") {
    if (req.method === "GET") {
      res.write(data);
      res.end();
    } else {
      res.statusCode = 404;
      res.write(`error ${res.statusCode} use GET`);
      res.end();
    }
  }
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

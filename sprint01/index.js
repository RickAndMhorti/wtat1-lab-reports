http = require("http")
httpStatus = require("http-status-codes")
fs = require('fs')

const port = 3000

async function loadHTMLFile() {
  let data = await fs.promises.readFile("./resources/index.html")
  return Buffer.from(data)
}

async function startServer() {
  htmlData = await loadHTMLFile()
  app = http.createServer((req, res) => {
    console.log("Received an incoming request!")
    res.writeHead(httpStatus.OK, {
      "Content-Type": "text/html"
    })
    res.write(htmlData)
    res.end()
    console.log("Sent a response to client")
  })
  app.listen(port)
  console.log(`Server started and listening on Port ${port}`)
}

/**
 * START EVERYTHING
 */
startServer()

const express = require("express");
const { spawn } = require("child_process");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());

let executionQueue = [];
let isRunning = false;

// API to add tests to the execution queue
app.post("/add-to-queue", (req, res) => {
  const { tests } = req.body;
  executionQueue.push(...tests);
  res.status(200).send({ message: "Tests added to queue" });
  if (!isRunning) runTests();
});

// Function to execute tests serially
const runTests = () => {
  if (executionQueue.length === 0) {
    isRunning = false;
    return;
  }

  isRunning = true;
  const test = executionQueue.shift();
  const process = spawn("npx", ["playwright", "test", test]);

  process.stdout.on("data", (data) => {
    io.emit("test-output", { test, output: data.toString() });
  });

  process.stderr.on("data", (data) => {
    io.emit("test-output", { test, output: data.toString() });
  });

  process.on("close", (code) => {
    io.emit("test-status", { test, status: code === 0 ? "pass" : "fail" });
    runTests();
  });
};

server.listen(3001, () => console.log("Server running on port 3001"));

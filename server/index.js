require("dotenv").config();
const socketIO = require("socket.io");
const express = require("express");
const cors = require("cors");
const connect = require("./config/connect");
const userRoutes = require("./routes/user.route");
const productRoutes = require("./routes/product.route");
const bidRoutes = require("./routes/bid.route");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.use(cors());
app.use(express.json());
const activeUsers = new Map();

io.on("connection", (socket) => {
//   console.log("connected");
  socket.on("login", (userId) => {
    activeUsers.set(userId, socket.id);
    console.log(userId, "userid");
  });

  socket.on("disconnect", () => {
    for (const [userId, socketId] of activeUsers.entries()) {
      if (socketId === socket.id) {
        activeUsers.delete(userId);
        break;
      }
    }
  });
});
app.use((req, res, next) => {
  req.io = io;
  req.activeUsers = activeUsers;
  next();
});
app.get("/", (req, res) => res.send("welcome to CIMET"));
app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/bid", bidRoutes);

console.log(activeUsers);

const PORT = process.env.PORT || 8081;
server.listen(PORT, async () => {
  await connect();
//   console.log(`listenning on Port :${PORT}`);
});

const closeServer = ()=>{
  if(server){
    server.close();
    console.log('Server stopped')

  }
  else{
    console.log('server not found');
  }
}

module.exports = {app, closeServer, server};

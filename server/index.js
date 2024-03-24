require("dotenv").config({ path: "./.env" });
import express, { Router } from "express";
import { Server } from "socket.io";
import { registerUser } from "./controllers/user.controller";
import connectDB from "./db";
import { upload } from "./middlewares/multer.middleware";
const app = express();

const PORT = 5000;

app.use(cookieParser());

connectDB();

const router = Router();

const io = new Server(app);


io.on('connection', (socket)=>{
  console.log(`socket io connected`);

socket.on('chat message', (msg)=>{
  console.log('message received', msg);
      io.emit(`server emiting`,msg)
});

socket.on('disconnect', ()=>{
console.log(`disconnected`);
})

})

router.route('/').get(
  res.sendFile(join(__dirname, 'index.html'));
)

router.route("/register").post(
  
  upload.fields([
    {
      name:'avatar',
      maxCount:1
    },{
      name:'coverImage',
      maxCount:1
    }
  ])
  registerUser);
app.listen(PORT, () => {
  console.log(`server is listening on PORT ${PORT}`);
});

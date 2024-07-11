require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 5890
const mongoose = require('mongoose')
const authRouter = require('./routes/authRouter')
const auth = require('./middleware/authentication');
// const webRouter = require('/routes/webRouter')  
const webRouter = require('./routes/webRouter')
const error = require('./utils/error')

//middleware
app.use(express.json());


//routes
app.use('/api/v1',authRouter);
// app.get('/test', auth,(req, res) =>{
// res.send("passed authentication")
// });
 
app.use('/api/v1/web',auth ,webRouter)

// error routes
app.use(error)

const server = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}..`);
  })
    } catch (error) {
        console.log(error);
    }
}; 
server();


// const app =express();
// const PORT = 3000


// // middlewares

// ///routes
// app.get('/', (req, res) =>{
// res.send("hero page");
// });
// app.get('/about',(req,res )=>{
// res.send("About page");
// });

// app.all('*',(req,res)=>{
// res.status(404).send('Error page')

// })


// app.listen(PORT, ()=>{
// console.log("app is running on port 3000...");
// });

import 'dotenv/config';
import express from "express"
import userRoute from './routes/user.route.js'
const app= express();
app.use(express.json())
app.use('/user',userRoute);
app.get('/', (req,res)=>{
    return res.status(200).json({
        success: true,
        message: "server is running on the port",
        error: false
    })
})
app.listen(process.env.PORT, ()=>{
    console.log("Server is running on the port:", process.env.PORT);
});
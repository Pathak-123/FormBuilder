const express=require('express');
const cors=require('cors');
const dotenv = require('dotenv');
const connectDB = require('./utlis/feature');
dotenv.config();
const app=express();
const port= process.env.PORT || 3000;
const mongoURI= process.env.MONGO_URI || "";
const formRoutes = require('./Routes/formRoutes');

connectDB(mongoURI);
app.use(express.json());
app.use(cors());


app.use('/api/v1/forms', formRoutes);


app.listen(port,()=>{
    console.log(`Server is working on localhost: ${port}`);
})
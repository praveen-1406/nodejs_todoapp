import mongoose from "mongoose";


export const connectDB=()=>{
    mongoose.connect(process.env.MONGO_URI, {
        dbName: 'BackendAPI',
    }).then((c) => {
        console.log(`Database Connected with ${c.connection.host}`);
    }).catch((e) => {
        console.log(e);
    })
}

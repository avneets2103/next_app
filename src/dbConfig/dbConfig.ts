import mongoose from 'mongoose'

export async function connect(){
    try {
        console.log("Inside dbBonfig");
        await mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;
        connection.on('connected', ()=>{
            console.log('MongoDB connect successful');
        })
        connection.on('error', (err)=>{
            console.log('MongoDB connection error. '+err);
            process.exit();
        })
    } catch (error) {
        console.log("Something went wrong");
        console.log(error);
    }
}
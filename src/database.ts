const mongoose = require('mongoose');


export const initDatabase = async () => {
    const clientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
    const URI = process.env.DATABASE_URL || `mongodb+srv://Admin:Admin@cluster0.pcwin.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    
    try {
        // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
        await mongoose.connect(URI, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
      } catch(e){
        console.error(e)
      }
}

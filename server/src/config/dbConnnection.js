import mongoose from "mongoose"

const connnectToDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI, {
            dbName: "TweetHub"
        })
        .then((conn) => {
            console.log(`Database named ${conn.connection.name} is connected to ${conn.connection.host} at port ${conn.connection.port}`)
        })
        .catch((err) => {
            console.log("Error occurs while connection to database!")
        })
       
    } catch (error) {
        console.log(`Error occurs while connecting database: ${error}`)
    }
}

export default connnectToDB
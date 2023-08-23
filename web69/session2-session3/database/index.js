const mongoose = require("mongoose")

const connectToDb = async () => {
    try {
        await mongoose.connect(`mongodb+srv://quangvu20022006:EFpWMj0nQkWd99Ve@cluster0.ayqjyvy.mongodb.net/?retryWrites=true&w=majority`)
        console.log("Connect to db successful")
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    connectToDb
}

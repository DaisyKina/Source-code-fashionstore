const mongoose = require("mongoose")

const Product = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        requird: true,
        ref: "users"
    },
    slug: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    content: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model("products", Product)
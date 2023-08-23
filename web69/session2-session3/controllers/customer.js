const readFile = require('../utils/readFile')
const path = require("path")

const getCustomer = (req, res) => {
    const result = readFile('customer.json')

    return res.status(200).json({result})
}

module.exports = {
    getCustomer
}
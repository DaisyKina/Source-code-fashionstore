// => token => verify_token => token nay dung => se cho nguoi ta di qua (neu token sai => thi minh se chan lai)

const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")

const authentication = async (req, res, next) => {
    const bearerToken = req.headers.authorization // Token co dang  Bearer token
    if(!bearerToken){
        return res.status(401).json({message: "Ban chua dang nhap"})
    }
    const token = bearerToken.split(" ")[1]
    try {
        const verify_token = jwt.verify(token,process.env?.SECRET_KEY)

        if(!verify_token){
            return res.status(401).json({message: "Ban chua dang nhap"})
        }

        const userId = verify_token?.userId

        const checkUser = await userModel.findById(userId)

        // const checkUser = await userModel.findOne({
        //     _id: userId
        // })

        if(!checkUser){
            return res.status(404).json({message: "Nguoi dung khong ton tai"})
        }

        req.user = checkUser

        next()

    } catch (error) {
        console.log(error)
        return res.status(401).json({message: "Ban chua dang nhap"})
    }
}

module.exports = authentication
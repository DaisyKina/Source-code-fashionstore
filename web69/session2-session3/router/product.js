const { createProduct, getProduct, deleteProduct, getById, updateProduct } = require("../controllers/product")
const authentication = require("../middlewares/authentication")

const router = require("express").Router()

router.post("/", authentication ,createProduct)
router.get("/", getProduct)
router.get("/:id", getById)
router.delete("/:id",authentication, deleteProduct)
router.put("/:id", authentication, updateProduct)

module.exports = router
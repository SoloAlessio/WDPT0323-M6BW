import multer from "multer"

const storage = multer.diskStorage({
    destination: "./src/uploads/",
    filename: function (req, file, callback) {
        if (["image/jpeg", "image/png"].includes(file.mimetype)) {
            callback(null, `${Date.now()}_${file.originalname}`)
        } else {
            const error = new Error("Please upload png or jpg")
            error.statusCode = 400
            callback(error)
        }
    },
})
const upload = multer({ storage })

export { upload }

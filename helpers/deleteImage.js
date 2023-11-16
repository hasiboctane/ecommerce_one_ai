const fs = require("fs");
const deleteImage = async (imagePath) => {
    try {
        fs.access(imagePath)
        fs.unlink(imagePath)
        console.log("User image was deleted")
    } catch (error) {
        console.log("User Image does not exist");
    }
}

module.exports = deleteImage;

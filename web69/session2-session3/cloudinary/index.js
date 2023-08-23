const cloudinary = require("cloudinary").v2
          
cloudinary.config({ 
  cloud_name: 'dwve0c1pl', 
  api_key: '126865982525911', 
  api_secret: 'm_WxcKo5VW3SeuBG_RZQIAxGst8' 
});

const uploadImage = async (file) => {
  const newFileName = `${new Date().getTime()}-${file.name}`
   return new Promise((resolve, reject)=>{
    cloudinary.uploader.upload_stream({resource_type: "image", filename_override: `${newFileName}`, use_filename: true, unique_filename: false}, (err) => reject(err)).end(file?.data, () => resolve(newFileName));
   })
    
  };

module.exports = {
    uploadImage
}
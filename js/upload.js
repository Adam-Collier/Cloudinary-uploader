let sharp = require("sharp");
var cloudinary = require("cloudinary");
const { execFile } = require("child_process");

const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");
const imageminMozjpeg = require("imagemin-mozjpeg");

let { errorStrip, successStrip } = require("./messages");

let dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.load();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

let uploadImages = (path, fileType) => {
  console.log(path);

  if (fileType.includes("jpeg")) {
    // sharp(path)
    //   .jpeg({ quality: 80 })
    //   .toBuffer()
    //   .then(data => {
    //     cloudinary.v2.uploader.upload(
    //       `data:image/jpeg;base64,${data.toString("base64")}`,
    //       function(error, result) {
    //         if (error) console.log(error);
    //         console.log(result);
    //         document
    //           .querySelector("body")
    //           .insertAdjacentHTML(
    //             "afterBegin",
    //             successStrip("successfully uploaded")
    //           );
    //         setTimeout(() => {
    //           document.querySelector(".success").remove();
    //         }, 2000);
    //         errorStrip("please drag in a jpeg or png");
    //       }
    //     );
    //   });

    imagemin([path], {
      use: [imageminMozjpeg({ quality: 80 })]
    }).then(data => {
      console.log("image optimised");
      console.log(data);
      cloudinary.v2.uploader.upload(
        `data:image/jpeg;base64,${data[0].data.toString("base64")}`,
        function(error, result) {
          console.log(data);
          console.log(data.toString("base64"));
          if (error) console.log(error);
          console.log(result);
          document
            .querySelector("body")
            .insertAdjacentHTML(
              "afterBegin",
              successStrip("successfully uploaded")
            );
          setTimeout(() => {
            document.querySelector(".success").remove();
          }, 2000);
        }
      );
      // => [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
    });
  } else if (fileType.includes("png")) {
    sharp(path)
      .png({ compressionLevel: 8 })
      .toBuffer()
      .then(data => {
        cloudinary.v2.uploader.upload(
          `data:image/jpeg;base64,${data.toString("base64")}`,
          function(error, result) {
            if (error) console.log(error);
            console.log(result);
          }
        );
      });
  } else {
    document
      .querySelector("body")
      .insertAdjacentHTML(
        "afterBegin",
        errorStrip("please drag a jpeg or png file")
      );
    setTimeout(() => {
      document.querySelector(".error").remove();
    }, 2000);
    errorStrip("please drag in a jpeg or png");
  }
};

module.exports = uploadImages;

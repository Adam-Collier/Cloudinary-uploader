let fs = require("fs");
let { errorStrip } = require("./messages");

let checkForCredentials = () => {
  fs.readFile("./.env", "utf-8", function(err, data) {
    console.log(data);
    if (data === "") {
      let cloudinaryForm = `
      <div class="cloudinary-setup">
        <label>Cloudinary Name</label>
        <input type="text" name="name">
        <label>Cloudinary Key</label>
        <input type="text" name="key">
        <label>Cloudinary Secret</label>
        <input type="text" name="secret">
        <input type="submit" value="confirm" onclick="submitForm()">
    </div>
      `;
      document
        .querySelector("body")
        .insertAdjacentHTML("afterBegin", cloudinaryForm);
    } else {
      let setup = document.querySelector(".cloudinary-setup");
      setup ? setup.remove() : null;
    }
  });
};

let envCredentials = x => {
  return `CLOUDINARY_NAME = '${x.name}'
CLOUDINARY_KEY = '${x.key}'
CLOUDINARY_SECRET = '${x.secret}'
    `;
};

let submitForm = () => {
  console.log("clicked");

  let creds = {};
  let emptyFields = 0;

  document.querySelectorAll("input[type=text]").forEach(x => {
    console.log(x.name);
    if (x.value === "") {
      document
        .querySelector("body")
        .insertAdjacentHTML("afterBegin", errorStrip("inputs cannot be empty"));
      setTimeout(() => {
        document.querySelector(".error").remove();
      }, 2000);
      emptyFields++;
    }
    creds[x.name] = x.value;
  });

  emptyFields === 0
    ? fs.writeFile("./.env", envCredentials(creds), (err, data) => {
        if (err) console.log(err);
      })
    : fs.writeFile("./.env", "", (err, data) => {
        if (err) console.log(err);
      });

  checkForCredentials();
};

module.exports = {
  checkForCredentials,
  submitForm
};

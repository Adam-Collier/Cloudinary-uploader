const { remote } = require("electron");
const path = require("path");

let { checkForCredentials, submitForm } = require("./js/add_creds");

checkForCredentials();

require("./js/drag_and_drop");

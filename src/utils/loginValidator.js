const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv();

addFormats(ajv);

const schema = {
  type: "object",
  properties: {
    email: {
      type: "string",
      format: "email",
    },
    password: {
      type: "string",
      pattern:
        "(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
    },
  },
  required: ["email", "password"],
};

module.exports = ajv.compile(schema);

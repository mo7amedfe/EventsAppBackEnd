const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv({ $data: true });

addFormats(ajv);

const schema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 3,
      maxLength: 30,
      pattern: "^[A-Za-z ]+$", // alphapets and space only
    },
    email: {
      type: "string",
      format: "email",
    },
    password: {
      type: "string",
      pattern:
        "(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
    },
    rePassword: {
      type: "string",
      const: { $data: "1/password" }, //to match password
    },
    role: {
      type: "string",
      enum: ["user", "organizer"]
    },
  },
  required: ["name", "email", "password", "rePassword"],
};

module.exports = ajv.compile(schema);

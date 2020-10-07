const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/UserModel");
const { check, validationResult } = require("express-validator");

router.get("/", (req, res) => {
  return res.send("hello");
});

// @route POST /users/register
// @desc Register user onto MongoDB database
// @access Public
router.post(
  "/register",
  // Express validation middleware
  [
    check("email", "Please include a valid email.").isEmail(),
    check(
      "password",
      "Please enter a password with 5 or more characters"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    console.log(req.body);

    try {
      // Destructure user field input from the req.body object
      const {
        firstName,
        lastName,
        email,
        username,
        password,
        passwordCheck,
      } = req.body;

      // Validation code -----------------------------------------------------------------
      // Checking for the existence of required user input
      if (
        !email ||
        !password ||
        !passwordCheck ||
        !username ||
        !firstName ||
        !lastName
      ) {
        // The res object will have a status of 400
        // .json() serilazies the object passed into JSON and sends it in the HTTP
        return res
          .status(400)
          .json({ errors: [{ msg: "Not all fields have been entered." }] });
      }

      // Checking if a client attempts to register with an email that already exist in our database
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        return res.status(400).json({
          errors: [{ msg: "An account with this email already exists." }],
        });
      }

      // Checking if a client attempts to register with a username that already exist in our database
      const existingUsername = await User.findOne({ username: username });
      if (existingUsername) {
        return res.status(400).json({
          errors: [{ msg: "An account with this username already exists." }],
        });
      }
      // End of validation code -----------------------------------------------------------------

      // Storing user credentials onto the database -----------------------------------------------------------------
      // Storing the password as a hash
      const salt = await bcrypt.genSalt(10);
      // bcrypt hash: 1st parameter is the string to hash, 2nd parameter is the salt for the hash
      const passwordHash = await bcrypt.hash(password, salt);
      // Create a newUser MongoDB object and store it into the database
      const newUser = new User({
        email: email,
        password: passwordHash,
        username: username,
        firstName: firstName,
        lastName: lastName,
      });
      // Save the new user on the database
      const savedUser = await newUser.save();
      console.log(savedUser);
      // return res.json({user: {
      //     id: savedUser.id,
      //     username: savedUser.username,
      //     email: savedUser.email
      // }});
      // End of storing user credentials -----------------------------------------------------------------

      // Signing a JWT for a specifc user -----------------------------------------------------------------
      // https://medium.com/ag-grid/a-plain-english-introduction-to-json-web-tokens-jwt-what-it-is-and-what-it-isnt-8076ca679843
      // https://auth0.com/docs/tokens/json-web-tokens/json-web-token-structure#jws-signature

      // Signing the JWT using the user id as a payload and the JWT secret
      /* The signature is used to verify that the sender of the JWT is who it says it is and
      to ensure that the message wasn't changed along the way. To create the signature, the Base64-encoded header and
       payload are taken, along with a secret, and signed with the algorithm specified in the header.*/
      // 1st argument is the payload, 2nd argugment is the JWT secret, 2rd argument is an expiration,
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
        expiresIn: 3600,
      });
      return res.json({
        token,
        user: {
          id: savedUser._id,
          username: savedUser.username,
          email: savedUser.email,
        },
      });
      // End of signing user credentials -----------------------------------------------------------------
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;

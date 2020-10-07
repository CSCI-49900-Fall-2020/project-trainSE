const router = require("express").Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const User = require("../../models/UserModel");
const { check, validationResult } = require("express-validator");

// @route    GET api/auth/
// @desc     Get user by token
// @access   Private
router.get("/", auth, async (req, res) => {
  // This function is for constantly checking if the token is still valid
  try {
    // Find a user by their id
    // Recall that the user property is on the req object because of the auth middleware
    // .select("-password") will just disregard the password
    const user = await User.findById(req.user.id).select("-password");
    return res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// @route    POST api/auth/login
// @desc     Authenticate user & get token
// @access   Public
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Destructure the email and password
      const { email, password } = req.body;

      // Validation code -----------------------------------------------------------------
      // Checking for the existence of required user input
      // if (!email || !password) {
      //   // The res object will have a status of 400
      //   // .json() serilazies the object passed into JSON and sends it in the HTTP
      //   return res
      //     .status(400)
      //     .json({ errors: [{ msg: "Not all fields have been entered." }] });
      // }
      // End of validation code -----------------------------------------------------------------

      // Verify the credentials exist in the database
      // Find user in the database based on login credentials
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(400).json({
          errors: [{ msg: "No account with this email has been registered." }],
        });
      }

      // Compare the login password with the password on the database
      // Everything is compared with hashed passwords, not plaintext
      // bcrypt.compare resolves to T/F
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials." }] });
      // End of verifying credentials -----------------------------------------------------------------

      // Signing a JWT for a specifc user -----------------------------------------------------------------
      // https://medium.com/ag-grid/a-plain-english-introduction-to-json-web-tokens-jwt-what-it-is-and-what-it-isnt-8076ca679843
      // https://auth0.com/docs/tokens/json-web-tokens/json-web-token-structure#jws-signature

      // Signing the JWT using the user id as a payload and the JWT secret
      /* The signature is used to verify that the sender of the JWT is who it says it is and
      to ensure that the message wasn't changed along the way. To create the signature, the Base64-encoded header and
       payload are taken, along with a secret, and signed with the algorithm specified in the header.*/
      // 1st argument is the payload, 2nd argugment is the JWT secret, 2rd argument is an expiration,
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: 3600,
      });

      return res.json({
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
      // End of signing user credentials -----------------------------------------------------------------
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;

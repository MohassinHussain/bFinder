const { Router } = require("express");
const router = Router();
const { getName, getEmail } = require("../controllers/testController");
router.get("/", getName);
router.get("/email", getEmail);

module.exports = router;

const pool = require("../db/pdb");

const getName = (req, res) => {
  //   res.status(200).json({ msg: "name is joe" });
  pool.query("SELECT * FROM persons", (e, result) => {
    if (e) throw e;
    res.status(200).json(result.rows);
  });
};
const getEmail = (req, res) => {
  res.status(200).json({ msg: "email is joe@gmail.com" });
};

module.exports = {
  getName,
  getEmail,
};

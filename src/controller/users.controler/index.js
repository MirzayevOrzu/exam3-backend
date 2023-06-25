const db = require("../../db/index");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const config = require("../../shared/config");
exports.postUser = async (req, res) => {
  try {
    const { first_name, last_name, mail, password } = req.body;
    const img = req.files?.img;
    const imgname = img && `${uuid.v4()}.${img?.mimetype.split("/")[1]}`;
    img?.mv(`${process.cwd()}/uploads/${imgname}`);
    const hash = await bcrypt.hash(password, 12);
    const dbq = db("users")
      .insert({
        first_name,
        last_name,
        mail,
        image: imgname,
        role: "user",
        password: hash,
      })
      .returning("*");
    const users = await dbq;
    const token = await jwt.sign(
      { id: users[0].id, role: "user" },
      config.jwt.secret
    );
    res.status(201).json({ token: token , data : users});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.registerAdmin = async (req, res) => {
  try {
    const { first_name, last_name, mail, password } = req.body;
    const img = req.files?.img;
    const imgname = img && `${uuid.v4()}.${img?.mimetype.split("/")[1]}`;
    img?.mv(`${process.cwd()}/uploads/${imgname}`);
    const hash = await bcrypt.hash(password, 12);
    const dbq = db("users")
      .insert({
        first_name,
        last_name,
        mail,
        image: imgname,
        role: "admin",
        password: hash,
      })
      .returning("*");
    const users = await dbq;
    const token = await jwt.sign(
      { id: users[0].id, role: "admin" },
      config.jwt.secret
    );
    res.status(201).json({ token: token , data:users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.loginUser = async (req, res) => {
  try {
    const { mail, password } = req.body;
    const dbq = await db("users")
      .select("mail", "password" , 'role')
      .where({ "users.mail": mail }).first();
    if (!dbq.mail) {
      return res
        .status(404)
        .send({ message: "Username or password incorrect" });
    }
    await bcrypt.compare(dbq.password, password, (clb) => {
      if (clb) {
        return res
          .status(404)
          .send({ message: "Username or password incorrect" });
      }
    });
    const token = await jwt.sign(
      { id: dbq.id, role: dbq.role },
      config.jwt.secret
    );
    res.status(201).json({ token: token , data : dbq });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getOneUser = async (req, res) => {
  try {
    const { id} = req.params;
    console.log(req.user);
    const dbq = await db("users").select().where({'users.id' : id})
    res.status(201).json({ data : dbq });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.loginUser = async (req, res) => {
  try {
    const { mail, password } = req.body;
    const dbq = await db("users")
      .select("mail", "password" , 'role')
      .where({ "users.mail": mail }).first();
    if (!dbq.mail) {
      return res
        .status(404)
        .send({ message: "Username or password incorrect" });
    }
    await bcrypt.compare(dbq.password, password, (clb) => {
      if (clb) {
        return res
          .status(404)
          .send({ message: "Username or password incorrect" });
      }
    });
    const token = await jwt.sign(
      { id: dbq.id, role: dbq.role },
      config.jwt.secret
    );
    res.status(201).json({ token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

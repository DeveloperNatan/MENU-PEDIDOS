const express = require("express");
const router = express.Router();
const path = require("path");
const dir = path.join(__dirname, "../../../frontend/src/views/");
const Service = require("../service/service");
const multer = require("multer");
const crypto = require("crypto");

const id = crypto.randomBytes(2).toString("hex");

// login
function authMiddleware(req, res, next) {
  if (req.session && req.session.user === "admin") {
    next();
  } else {
    res.redirect("/login");
  }
}

// path para pasta de imagens
const AssetsPath = path.join(dir, "assets");

// config para salvar na pasta /assets
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, AssetsPath);
  },
  filename: function (req, file, cb) {
    const FileName = `${id}-${file.originalname}`;
    cb(null, FileName);
  },
});

const upload = multer({ storage: storage });

// routes get
router.get("/", (req, res) => {
  res.sendFile(path.join(dir, "home.html"));
});

router.get("/login", (req, res) => {
  res.sendFile(path.join(dir, "login.html"));
});

router.post("/login", (req, res) => {
  const { InputSenha, InputUser } = req.body;

  if (InputUser === "admin" && InputSenha === "12345") {
    req.session.user = "admin";
    res.redirect("/admin");
  } else {
    res.redirect("/login?erro=1");
  }
});

router.get("/admin", authMiddleware, (req, res) => {
  res.sendFile(path.join(dir, "index.html"));
});

router.post("/cadastro", upload.single("ImagemURLedit"), async (req, res) => {
  await Service.Cadastro(req, res);
});

// verificar 13/06
router.post("/edit", upload.single("ImagemURLedit"), async (req, res) => {
  await Service.Edit(req, res);
});

router.post("/delete", async (req, res) => {
  await Service.Delete(req, res);
});

module.exports = router;

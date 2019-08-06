var express = require("express");
var router = express.Router();
var multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
var upload = multer({ storage: storage });

router.use(express.json());

let recordings = [];

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource" + JSON.stringify(recordings));
});

router.post("/", upload.single("recording"), function(req, res, next) {
  const recording = {
    id: recordings.length + 1,
    name: req.body.name,
    file: req.body.file
  };
  recordings.push(recording);
  res.send(recording);
});

module.exports = router;

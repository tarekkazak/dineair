const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const contentCtrl = require('../controllers/content.controller');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }))

router.route('/')
  .get((req, res) => {
      contentCtrl.get().then( (content) => {
            res.json(content);
        }
      );
  })
  .post(asyncHandler(insert));


async function insert(req, res) {
  let content = await contentCtrl.insert(req.body);
  res.json(content);
}

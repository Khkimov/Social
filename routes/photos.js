const express = require('express');
const { Photo } = require('../db/models');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('main');
});

router.post('/', async (req, res) => {
  const { link } = req.body;
  try {
    await Photo.create({ link });
    res.end();
  } catch (error) {
    console.log(error);
    res.status(501).end();
  }
});

router.delete('/bad/:pass', async (req, res) => {
  const { pass } = req.params;
  if (pass === '123') {
    const { link } = req.body;
    try {
      await Photo.destroy({ where: { link } });
      res.end();
    } catch (error) {
      console.log(error);
      res.status(501).end();
    }
  }
  res.status(503).end();
});

router.get('/photo', async (req, res) => {
  try {
    const photos = await Photo.findAll({ raw: true });
    const photo = photos[Math.round(Math.random() * photos.length)];
    res.json(photo);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

module.exports = router;

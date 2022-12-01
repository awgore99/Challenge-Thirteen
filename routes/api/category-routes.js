const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/api/categories', async (req, res) => {
  try {
    const categoriesData = await Category.findAll({
      include: {model: Product},
    });
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/api/categories/:id', async (req, res) => {
  try {
    const categoriesData = await Category.findByPk(req.params.id, {
      include: {model: Product},
    });

    if(!categoriesData) {
      res.status(404).json({message: 'No category found with that id'});
      return;
    }

    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/api/categories', async (req, res) => {
  try {
    const categoriesData = await Category.create({
      category_id: req.body.id,
    });
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/api/categories/:id', async (req, res) => {
  try {
    const categoriesData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoriesData[0]) {
      res.status(404).json({ message: 'No category with that id'});
      return;
    }
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/api/categories/:id', async (req, res) => {
  try {
    const categoriesData = await Category.destory({
      where: {
        id: req.params.id,
      },
    });
    if (!categoriesData[0]) {
      res.status(404).json({ message: 'No category with that id'});
      return;
    }
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

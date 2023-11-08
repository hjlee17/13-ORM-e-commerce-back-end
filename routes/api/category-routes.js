const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET all categories, including its associated Products
router.get('/', async (req, res) => {
  const categoryData = await Category.findAll({
    include: [{ model: Product }],
  });
  res.status(200).json(categoryData);
});

// GET a category, by its `id` value, including its associated Products
router.get('/:id', async (req, res) => {
  const categoryData = await Category.findByPk(req.params.id, {
    include: [{ model: Product }],
  });
  res.status(200).json(categoryData);

});

// CREATE new category
router.post('/', async (req, res) => {
  const newCategory = await Category.create(req.body);
  res.json(newCategory);
});

// UPDATE a category by its `id` value
router.put('/:id', async (req, res) => {
  const updatedCategory = await Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
      id: req.params.id
      },
    }
  );
  res.json(updatedCategory);
});

// DELETE a category by its `id` value
router.delete('/:id', async (req, res) => {
  const deletedCategory = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.json(deletedCategory);
});


module.exports = router;

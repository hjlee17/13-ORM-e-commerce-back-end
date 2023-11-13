const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET all tags, including its associated Product data
router.get('/', async (req, res) => {
  const tagData = await Tag.findAll({
    include: [{ model: Product, through: ProductTag }],
  });
  res.status(200).json(tagData);
});

// GET a tag by its `id` value, including its associated Product data
router.get('/:id', async (req, res) => {
  const tagData = await Tag.findByPk(req.params.id, {
    include: [{ model: Product, through: ProductTag }],
  });
  res.status(200).json(tagData);
});

// CREATE new tag
router.post('/', async (req, res) => {
  const newTag = await Tag.create(req.body);
  /* req.body should look like this...
    {
      "tag_name": "Orange"
    }
  */
  res.json(newTag);
});

// UPDATE a tag by its `id` value
router.put('/:id', async (req, res) => {
  const updatedTag = await Tag.update(
  /* req.body should look like this...
    {
      "tag_name": "Orange"
    }
  */
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
      id: req.params.id
      },
    }
  );
  res.json(updatedTag);
});

// DELETE a tag by its `id` value
router.delete('/:id', async (req, res) => {
  const deletedTag = await Tag.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.json(deletedTag);
});

module.exports = router;

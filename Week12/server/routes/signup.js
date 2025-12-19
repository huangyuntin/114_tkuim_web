import express from 'express';
import { ObjectId } from 'mongodb';
import { getCollection } from '../db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  const collection = getCollection('participants');
  let query = {};

  if (req.user.role !== 'admin') {
    query.ownerId = req.user.id;
  }

  const data = await collection.find(query).toArray();
  res.json(data);
});

router.post('/', async (req, res) => {
  const collection = getCollection('participants');
  const { name, phone } = req.body;

  const doc = {
    name,
    phone,
    ownerId: req.user.id, 
    createdAt: new Date()
  };

  const result = await collection.insertOne(doc);
  res.status(201).json({ ...doc, _id: result.insertedId });
});

router.delete('/:id', async (req, res) => {
  const collection = getCollection('participants');
  const id = new ObjectId(req.params.id);

  const item = await collection.findOne({ _id: id });
  if (!item) return res.status(404).json({ error: '找不到資料' });

  if (req.user.role !== 'admin' && item.ownerId !== req.user.id) {
    return res.status(403).json({ error: '權限不足，你不能刪除別人的資料' });
  }

  await collection.deleteOne({ _id: id });
  res.json({ message: '刪除成功' });
});

export default router;
import express from 'express';
import bcrypt from 'bcrypt';
import { findUserByEmail, createUser } from '../repositories/users.js';
import { generateToken } from '../utils/token.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    
    const existing = await findUserByEmail(email);
    if (existing) {
      return res.status(409).json({ error: 'Email 已被註冊' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    
    const user = await createUser({ email, passwordHash, role });
    
    res.status(201).json({ id: user._id, email: user.email, role: user.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ error: '帳號或密碼錯誤' });
    }

    const token = generateToken(user);
    res.json({ 
      token, 
      user: { id: user._id, email: user.email, role: user.role } 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
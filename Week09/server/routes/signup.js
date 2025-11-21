import { Router } from 'express';

export const router = Router();

// 暫時資料庫（存在記憶體）
let signupList = [];

router.get('/', (req, res) => {
  res.json({
    total: signupList.length,
    data: signupList
  });
});

router.post('/', (req, res) => {
  const { name, email, phone, password, confirmPassword } = req.body;

  if (!name || !email || !phone || !password || !confirmPassword) {
    return res.status(400).json({ error: '所有欄位都是必填！' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: '密碼與確認密碼不一致！' });
  }

  const newUser = { name, email, phone };
  signupList.push(newUser);

  res.json({
    message: '報名成功！',
    user: newUser
  });
});

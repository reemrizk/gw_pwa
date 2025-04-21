// server/server.js
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// File storage config
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (_, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  }
});
const upload = multer({ storage });

app.use('/uploads', express.static(uploadDir));

// Handle upload
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.');
  console.log('Uploaded:', req.file.filename);
  res.json({ success: true, filename: req.file.filename, path: `/uploads/${req.file.filename}` });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));

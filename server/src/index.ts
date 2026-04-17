import express from 'express';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// routes go here

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

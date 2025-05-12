const express = require('express');
const cepRoutes = require('./routes/cepRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/cep', cepRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
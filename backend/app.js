const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./database');
const notesRoutes = require('./routes/notes');

const app = express();
const port = process.env.PORT || 3000;

(async () => {
    await sequelize.sync({ force: true });
    console.log('All models were synchronized successfully.');
})();

app.use(bodyParser.json());
app.use(cors());
app.use('/api', notesRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

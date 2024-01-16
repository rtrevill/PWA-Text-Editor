 const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000|| 'https://pacific-lowlands-90183-3e021944b31d.herokuapp.com/' ;


app.use(express.static('../client/dist'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes/htmlRoutes')(app);

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));

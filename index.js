let mongoose = require('mongoose');
let express = require('express');
let productRouter = require('./routers/product')
let buyRouter = require('./routers/buying');
let retrivalRouter = require('./routers/retrival');
let userRouter = require('./routers/user');
let authRouter = require('./routers/auth');

let app = express();

mongoose.connect('mongodb://localhost/market')
    .then(console.log('Connected........'))
    .catch(err => console.log(err.message));

app.use(express.json());
app.use('/api/goods', productRouter);
app.use('/api/buy', buyRouter);
app.use('/api/retrival', retrivalRouter);
app.use('/api/register', userRouter);
app.use('/api/login', authRouter);


app.listen(3000, () => { console.log('listening........................') });

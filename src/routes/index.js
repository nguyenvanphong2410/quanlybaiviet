const userRouter = require('./user');
const postRouter = require('./post');
const categoryRouter = require('./category');


function route(app) {

    app.use('/api/users', userRouter);
    app.use('/api/post', postRouter);
    app.use('/api/category', categoryRouter);
    
}

module.exports = route;

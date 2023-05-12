const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeroutes.js');
const dashRoutes = require('./dashroutes.js');
router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashRoutes);
router.use((req, res) => {
    res.status(404).end();
});
module.exports = router;
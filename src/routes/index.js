import express from 'express';
import passport from 'passport';
const router = express.Router();
import swaggerRouter from './swagger.js';
import farmRouter from './farm.route.js';

router.use('/api-docs', swaggerRouter);
router.use('/farm', farmRouter);

router.get('/login', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }

    res.redirect('/');
  });
});

export default router;

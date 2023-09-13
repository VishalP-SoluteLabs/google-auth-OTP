require('../../util/passport-setup')

const router = require('express').Router();

const passport = require('passport');
const authController = require('../../controller/auth/authController');
const asyncRouteHandler = require('../../util/asyncRouteHandler');

const CLIENT_URL = 'http://localhost:3000/google/success'

router.post('/signup', asyncRouteHandler(authController.postSignup));

router.post('/login', asyncRouteHandler(authController.postLogin))

router.post('/verify-otp', asyncRouteHandler(authController.verifyOTP))

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], withCredentials: true } ))

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: CLIENT_URL,
    failureRedirect: '/failed'
}))

router.get('/success', asyncRouteHandler(authController.successLoginGoogleAuth))
    
module.exports = router;

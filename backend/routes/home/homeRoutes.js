const router = require('express').Router();
const User = require('../../models/user');
const asyncRouteHandler = require('../../util/asyncRouteHandler');


router.get('/',  asyncRouteHandler( async (req, res, next) => {
    const users = await User.findAll({
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] } // Exclude the 'password' field from the response
    });

    res.status(200).json(users);
})
)


module.exports = router;

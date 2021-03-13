const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
/*
const auth = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    userProperty: 'payload'
});
*/

const ctrlLocations = require('../controllers/locations');
const ctrlAdmin = require('../controllers/userController');

router.route('/locations')
.get(ctrlLocations.locationsListByDistance)
.post(ctrlLocations.createLocation);

router.route('/location/:locationid')
.get(ctrlLocations.locationReadOne)
.delete(ctrlLocations.deleteLocation)
.put(ctrlLocations.updateLocation);

router.route('/admin/login')
.post(ctrlAdmin.authUser);

router.route('/admin/create')
.post(ctrlAdmin.createAdmin);

router.route('/admin/location')
.get(ctrlLocations.allLocations);

/*
.get(ctrlAdmin.adminLogin);


router.route('/admin')
.post(ctrlAdmin.createAdmin);

router.route('/admin/location')
.get(ctrlAdmin.adminViewLocations)
.post(ctrlAdmin.createLocation)
.delete(ctrlAdmin.deleteLocation);
*/


module.exports = router;

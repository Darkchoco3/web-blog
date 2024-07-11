const router = require('express').Router()
const { 
     createWeb,
     getWeb,
     getWebs,
     updateWeb,
     deleteWeb,  
    } = require('../controllers/post');

router.route('/').post(createWeb).get(getWebs)
router.route('/:webId').patch(updateWeb).get(getWeb).delete(deleteWeb);




module.exports = router;  
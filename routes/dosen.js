const express = require('express');
const router = express.Router();

const {
  getAllDosen,
  getDosenByNIDN,
  createDosen,
  updateDosenByNIDN,
  deleteDosenByNIDN
} = require('../controllers/dosenController');

router.get('/getAllDosen', getAllDosen);
router.get('/getDosenByNIDN/:nidn', getDosenByNIDN);
router.post('/createDosen', createDosen);
router.put('/updateDosenByNIDN/:nidn', updateDosenByNIDN);
router.delete('/deleteDosenByNIDN/:nidn', deleteDosenByNIDN);

module.exports = router;
const express = require('express');
const router = express.Router();

const { getAllMahasiswa, getMahasiswaByNIM, createMahasiswa, updateMahasiswaByNIM, deleteMahasiswaByNIM } = require('../controllers/mahasiswaController');

router.get('/getAllMahasiswa', getAllMahasiswa);
router.get('/getMahasiswaByNIM/:nim', getMahasiswaByNIM);
router.post('/createMahasiswa', createMahasiswa);
router.put('/updateMahasiswaByNIM/:nim', updateMahasiswaByNIM);
router.delete('/deleteMahasiswaByNIM/:nim', deleteMahasiswaByNIM);

module.exports = router;
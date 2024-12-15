const connection = require('../models/db');

const getAllDosen = (req, res) => {
  connection.query('SELECT * FROM dosen', (err, result) => {
    if (err) {
      console.error('Gagal mengambil data dosen', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(result);
    }
  });
};

const getDosenByNIDN = (req, res) => {
  const { nidn } = req.params;

  connection.query('SELECT * FROM dosen WHERE nidn = ?', [nidn], (err, result) => {
    if (err) {
      console.error('Gagal mengambil data dosen', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (result.length === 0) {
      res.status(404).json({ error: 'Dosen tidak ditemukan' });
    } else {
      res.json(result[0]);
    }
  });
};

const createDosen = (req, res) => {
  const { nidn, nama, gender, prodi, alamat } = req.body;
  const query = `
    INSERT INTO dosen (nidn, nama, gender, prodi, alamat) 
    VALUES (?, ?, ?, ?, ?)
  `;
  connection.query(query, [nidn, nama, gender, prodi, alamat], (err) => {
    if (err) {
      console.error('Gagal menambahkan data dosen:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(201).json({ message: 'Data dosen berhasil ditambahkan' });
  });
};

const updateDosenByNIDN = (req, res) => {
  const dosenNIDN = req.params.nidn;
  const { nama, gender, prodi, alamat } = req.body;
  connection.query(
    'UPDATE dosen SET nama = ?, gender = ?, prodi = ?, alamat = ? WHERE nidn = ?',
    [nama, gender, prodi, alamat, dosenNIDN],
    (err, result) => {
      if (err) {
        console.error('Gagal mengubah data dosen', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Dosen tidak ditemukan' });
      } else {
        res.json({ message: 'Data dosen berhasil diperbarui' });
      }
    }
  );
};

const deleteDosenByNIDN = (req, res) => {
  const dosenNIDN = req.params.nidn;
  connection.query('DELETE FROM dosen WHERE nidn = ?', [dosenNIDN], (err, result) => {
    if (err) {
      console.error('Gagal menghapus data dosen', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Dosen tidak ditemukan' });
    } else {
      res.json({ message: 'Data dosen berhasil dihapus' });
    }
  });
};

module.exports = { getAllDosen, getDosenByNIDN, createDosen, updateDosenByNIDN, deleteDosenByNIDN };
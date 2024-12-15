const connection = require('../models/db');

const getAllMahasiswa = (req, res) => {
  connection.query('SELECT * FROM mahasiswa', (err, result) => {
    if (err) {
      console.error('Gagal mengambil data mahasiswa', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(result);
    }
  });
};

const getMahasiswaByNIM = (req, res) => {
  const { nim } = req.params;

  connection.query('SELECT * FROM mahasiswa WHERE nim = ?', [nim], (err, result) => {
    if (err) {
    console.error('Gagal mengambil data mahasiswa', err);
    res.status(500).json({ error: 'Internal Server Error' });
    } if (result.length === 0) {
    res.status(404).json({ error: 'Mahasiswa tidak ditemukan' });
    }
    res.json(result[0]);
  });
};

const createMahasiswa = (req, res) => {
 const { nim, nama, gender, prodi, alamat } = req.body;
 const query = `
   INSERT INTO mahasiswa (nim, nama, gender, prodi, alamat) 
   VALUES (?, ?, ?, ?, ?)
 `;
 connection.query(query, [nim, nama, gender, prodi, alamat], (err) => {
   if (err) {
     console.error('Gagal menambahkan data mahasiswa:', err);
     return res.status(500).json({ error: 'Internal Server Error' });
   }
   res.status(201).json({ message: 'Data mahasiswa berhasil ditambahkan' });
 });
};


const updateMahasiswaByNIM = (req, res) => {
 const mahasiswaNIM = req.params.nim;
 const { nama, gender, prodi, alamat } = req.body;
 connection.query('UPDATE mahasiswa SET nama = ?, gender = ?, prodi = ?, alamat = ? WHERE nim = ?', 
 [nama, gender, prodi, alamat, mahasiswaNIM], (err, result) => { 
  if (err) {
   console.error('Gagal mengubah data mahasiswa', err);
   res.status(500).json({ error: 'Internal Server Error' });
  } 
  if (result.affectedRows === 0) {
   res.status(404).json({ error: 'Mahasiswa tidak ditemukan' });
  } 
   res.json({ message: 'Data mahasiswa berhasil diperbarui' });
 });
}

const deleteMahasiswaByNIM = (req, res) => {
 const mahasiswaNIM = req.params.nim;
 connection.query('DELETE FROM mahasiswa WHERE nim = ?', [mahasiswaNIM], (err, result) => {
  if (err) {
   console.error('Gagal menghapus data mahasiswa', err);
   res.status(500).json({ error: 'Internal Server Error' });
  } else if (result.affectedRows === 0) {
   res.status(404).json({ error: 'Mahasiswa tidak ditemukan' });
  } else {
   res.json({ message: 'Data mahasiswa berhasil dihapus' });
  }
 });
}


module.exports = { getAllMahasiswa, getMahasiswaByNIM, createMahasiswa, updateMahasiswaByNIM, deleteMahasiswaByNIM };
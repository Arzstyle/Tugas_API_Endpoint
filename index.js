const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mahasiswaRoutes = require('./routes/mahasiswa' );
const dosenRoutes = require('./routes/dosen' );

const app = express( );
const PORT = 3000;

app.use(bodyParser.json( ));

app.use('/mahasiswa', mahasiswaRoutes);
app.use('/dosen', dosenRoutes);

app.listen(PORT, function () {
console.log(`Server is running on http://localhost:${PORT}`); 
});
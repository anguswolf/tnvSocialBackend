import express from 'express';
import setup from './src/controller/routes.js';
import connectionToDb from './database.js';
import cors from 'cors';

const app = express();
const host = 'localhost';
const port = 8000;

app.use(express.json());
app.use('/public/images',express.static('public/images'));
app.use(cors({ origin: 'http://localhost:5173' }));

connectionToDb().then(() => {
	setup(app);
	app.listen(port, host, () => {
		console.log('Server is running on http://localhost:8000');
	})
}).catch((error) => {
	console.log('Server not started' + error)
})

export default app;


import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import routes from './src/routes/index';

dotenv.config();

const { SERVER_PORT } = process.env;

const app = express();
app.use(cors());
const port = Number(SERVER_PORT) || 3001;
app.use(express.json());

app.use((req, _res, next) => {
	console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
	next();
});
app.use('/api', routes);

app.get('/', (_, res) => {
	res.json('👋 Howdy from the server :)');
});

app.listen(port, () => {
	console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
});

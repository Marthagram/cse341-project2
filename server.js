import express from 'express';
import connectDB from './src/models/connect.js';
import farmRouter from './src/routes/farm.route.js';

const app = express();

// Define the application environment
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';

// Define the port number the server will listen on
const PORT = process.env.PORT || 3000;

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// This middleware sets the necessary headers to allow cross-origin requests (CORS) from any origin. It allows GET, POST, PUT, and DELETE methods and specifies that the Content-Type header is allowed in requests. After setting the headers, it calls the next middleware in the stack.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
await connectDB();

app.use('/farm', farmRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://127.0.0.1:${PORT}`);
  console.log(`Environment: ${NODE_ENV}`);
});

import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../swagger.json' with { type: 'json' };
const swaggerRouter = express.Router();
swaggerRouter.use('/api-docs', swaggerUi.serve);
swaggerRouter.get('/api-docs', swaggerUi.setup(swaggerDocument));

swaggerRouter.get('/', (req, res) => {
  try {
    res.status(200).send('Welcome to the Poultry Farm API');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default swaggerRouter;

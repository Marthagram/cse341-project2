import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'project 2 (poultry farm) API',
    description: 'API for managing poultry farm expenditure'
  },
  host: 'localhost:3000',
  schemes: ['http', 'https']
};
const outputFile = './swagger.json';

const routes = ['./server.js'];

swaggerAutogen()(outputFile, routes, doc);

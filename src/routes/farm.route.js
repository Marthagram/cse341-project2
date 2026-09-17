import express from 'express';
import {
  getAllChickens,
  createChicken,
  getChickenById,
  updateChicken,
  deleteChicken
} from '../controller/chickens.js';

import {
  createEggRecord,
  getAllEggRecord,
  getOneEggRecord,
  updateEggRecord,
  deleteEggRecord
} from '../controller/eggs.js';

const farmRouter = express.Router();

//  CHICKEN COLLECTION

farmRouter.get('/chickens', getAllChickens);

farmRouter.post('/chickens', createChicken);

farmRouter.get('/chickens/:id', getChickenById);

farmRouter.put('/chickens/:id', updateChicken);

farmRouter.delete('/chickens/:id', deleteChicken);

// EGGS COLLECTION
farmRouter.get('/eggs', getAllEggRecord);

farmRouter.post('/eggs', createEggRecord);

farmRouter.get('/eggs/:id', getOneEggRecord);

farmRouter.put('/eggs/:id', updateEggRecord);

farmRouter.delete('/eggs/:id', deleteEggRecord);

// FEED INVENTORY

export default farmRouter;

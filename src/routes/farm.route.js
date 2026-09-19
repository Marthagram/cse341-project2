import express from 'express';
import { checkValidation } from '../middleware/validation.js';
import {
  getAllChickens,
  createChicken,
  getChickenById,
  updateChicken,
  deleteChicken,
  chickenValidation
} from '../controller/chickens.js';

import {
  createEggRecord,
  getAllEggRecord,
  getOneEggRecord,
  updateEggRecord,
  deleteEggRecord,
  eggValidation
} from '../controller/eggs.js';

import {
  createFeedInventory,
  getAllFeedInventory,
  getOneFeedInventory,
  updateFeedInventory,
  deleteFeedInventory,
  feedValidation
} from '../controller/feedInventory.js';

const farmRouter = express.Router();

//  CHICKEN COLLECTION

farmRouter.get('/chickens', getAllChickens);

farmRouter.post('/chickens', chickenValidation, checkValidation, createChicken);

farmRouter.get('/chickens/:id', getChickenById);

farmRouter.put('/chickens/:id', chickenValidation, checkValidation, updateChicken);

farmRouter.delete('/chickens/:id', deleteChicken);

// EGGS COLLECTION
farmRouter.get('/eggs', getAllEggRecord);

farmRouter.post('/eggs', eggValidation, checkValidation, createEggRecord);

farmRouter.get('/eggs/:id', getOneEggRecord);

farmRouter.put('/eggs/:id', eggValidation, checkValidation, updateEggRecord);

farmRouter.delete('/eggs/:id', deleteEggRecord);

// FEED INVENTORY

// FEED INVENTORY - CORRECTED
farmRouter.get('/feedInventory', getAllFeedInventory);

farmRouter.post('/feedInventory', feedValidation, checkValidation, createFeedInventory);

farmRouter.get('/feedInventory/:id', getOneFeedInventory);

farmRouter.put('/feedInventory/:id', feedValidation, checkValidation, updateFeedInventory);

farmRouter.delete('/feedInventory/:id', deleteFeedInventory);
export default farmRouter;

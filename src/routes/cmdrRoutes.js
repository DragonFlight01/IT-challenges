import express from 'express';
import { getCommanderProfile } from '../controllers/cmdrController.js';

const router = express.Router();

router.post('/', getCommanderProfile);

export default router;

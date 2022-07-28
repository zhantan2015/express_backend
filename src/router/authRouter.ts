import express from 'express'
import AuthController from '../controller/authController';


const router = express.Router();

router.post('/', AuthController.postAuth)
router.put('/',AuthController.putAuth)

export default router;
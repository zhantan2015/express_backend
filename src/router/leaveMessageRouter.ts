import express from 'express'
import LeaveMessageContorller from '../controller/leaveMessageContorller';


const router = express.Router();

router.get('/', LeaveMessageContorller.getLeaveMessage)
router.post('/', LeaveMessageContorller.postLeaveMessage)

export default router;
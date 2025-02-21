import express from "express"
const router=express.Router()
import controllers from "../controllers";
import { authenticateUser, validateRequest } from "../middleware";
import validators from "../validators";

router.post('/registerUser',validateRequest(validators.user.registerUser),controllers.User.registerUser);
router.post('/requestCreator',validateRequest(validators.user.requestCreator),controllers.User.requestCreator);
router.post('/registerGame',authenticateUser,controllers.User.registerGame);
router.get('/transactions',validateRequest(validators.user.transactions),controllers.User.transactions)

router.patch(
  '/creator-requests/:maAddress/approve',
  authenticateUser,
  validateRequest(validators.user.approveCreatorRequest),
  controllers.User.approveCreatorRequest
);
router.get('/getPendingRequests',authenticateUser,controllers.User.getPendingRequests)
router.get('/count',controllers.User.count)
router.get('/games',controllers.User.games)
router.get('/creator-request-status/:userId',controllers.User.getCreatorRequestStatus)


// router.get('/tokenTest' ,controllers.User.tokenTest)
// router.get('/data' , controllers.User.allData);

// router.get("/data",controllers.User.getdata)


export default router
import { Router } from "express";
import routeControllers from "../controllers/routeControllers.js";

const route = Router()
export default route

route.get('/', routeControllers.getController)
route.post('/', routeControllers.postController)
route.patch('/:id', routeControllers.patchController)
route.delete('/:id', routeControllers.deleteController)


import { ManagerService } from '../service/manager.service';
import { ResponseService } from '../service';

export class ManagerController {
  _managerService = new ManagerService();
  _responseService = new ResponseService();

  postManager = (req, res) => {
    const { email, password, name } = req.body;

    this._managerService
      .postManager(email, password, name)
      .then((body) => {
        this._responseService.sendResponse(res, 200, true, body);
      })
      .catch((error) => {
        this._responseService.sendResponse(res, 500, false, error);
      });
  };

  login = (req, res) => {
    const { email, password } = req.body;

    this._managerService
      .login(email, password)
      .then((body) => {
        this._responseService.sendResponse(res, 200, true, body);
      })
      .catch((error) => {
        this._responseService.sendResponse(res, 500, false, error);
      });
  };

  deleteManager = (req, res) => {
    const { id } = req.manager;

    this._managerService
      .deleteManager(id)
      .then((body) => {
        this._responseService.sendResponse(res, 200, true, body);
      })
      .catch((error) => {
        this._responseService.sendResponse(res, 500, false, error);
      });
  };
}

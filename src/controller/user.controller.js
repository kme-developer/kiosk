import { UserService } from '../service/user.service';
import { ResponseService } from '../service';

export class UserController {
  _userService = new UserService();
  _responseService = new ResponseService();

  postUser = (req, res) => {
    const { email, password } = req.body;

    this._userService
      .postUser(email, password)
      .then((body) => {
        this._responseService.sendResponse(res, 200, true, body);
      })
      .catch((error) => {
        this._responseService.sendResponse(res, 500, false, error);
      });
  };

  login = (req, res) => {
    const { email, password } = req.body;

    this._userService
      .login(email, password)
      .then((body) => {
        this._responseService.sendResponse(res, 200, true, body);
      })
      .catch((error) => {
        this._responseService.sendResponse(res, 500, false, error);
      });
  };

  deleteUser = (req, res) => {
    const { id } = req.user;

    this._userService
      .deleteUser(id)
      .then((body) => {
        this._responseService.sendResponse(res, 200, true, body);
      })
      .catch((error) => {
        this._responseService.sendResponse(res, 500, false, error);
      });
  };

  getOrdersForUser = (req, res) => {
    const { id } = req.user;

    this._userService
      .getOrdersForUser(id)
      .then((body) => {
        this._responseService.sendResponse(res, 200, true, body);
      })
      .catch((error) => {
        this._responseService.sendResponse(res, 500, false, error);
      });
  };

  getOrder = (req, res) => {
    const { orderId } = req.params;

    this._userService
      .getOrder(orderId)
      .then((body) => {
        this._responseService.sendResponse(res, 200, true, body);
      })
      .catch((error) => {
        this._responseService.sendResponse(res, 500, false, error);
      });
  };
}

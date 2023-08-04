import { OrderService, ResponseService } from '../service';

export class OrderController {
  _orderService = new OrderService();
  _responseService = new ResponseService();

  postOrder = (req, res) => {
    const { userId } = req.user;
    const { itemIds, amounts, options } = req.body;

    this._orderService
      .postOrder(userId, itemIds, amounts, options)
      .then((body) => {
        this._responseService.sendResponse(res, 200, true, body);
      })
      .catch((error) => {
        this._responseService.sendResponse(res, 500, false, error);
      });
  };

  getOrderForManager = (req, res) => {
    const { state } = req.body;

    this._orderService
      .getOrderForManager(state)
      .then((body) => {
        this._responseService.sendResponse(res, 200, true, body);
      })
      .catch((error) => {
        this._responseService.sendResponse(res, 500, false, error);
      });
  };

  getOrderForUser = (req, res) => {
    const { id } = req.user;

    this._orderService
      .getOrderForUser(id)
      .then((body) => {
        this._responseService.sendResponse(res, 200, true, body);
      })
      .catch((error) => {
        this._responseService.sendResponse(res, 500, false, error);
      });
  };

  getOrderForNotUser = (req, res) => {
    const { orderId } = req.params;

    this._orderService
      .getOrderForNotUser(orderId)
      .then((body) => {
        this._responseService.sendResponse(res, 200, true, body);
      })
      .catch((error) => {
        this._responseService.sendResponse(res, 500, false, error);
      });
  };

  updateState = (req, res) => {
    const { orderId } = req.params;
    const { state } = req.body;

    this._orderService
      .updateState(orderId, state)
      .then((body) => {
        this._responseService.sendResponse(res, 200, true, body);
      })
      .catch((error) => {
        this._responseService.sendResponse(res, 500, false, error);
      });
  };
}

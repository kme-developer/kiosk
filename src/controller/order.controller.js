import { OrderService, ResponseService } from '../service';

export class OrderController {
  _orderService = new OrderService();
  _responseService = new ResponseService();

  postOrder = (req, res) => {
    this._orderService
      .postOrder(orderId)
      .then((body) => {
        this._responseService.sendResponse(res, 200, true, body);
      })
      .catch((error) => {
        this._responseService.sendResponse(res, 500, false, error);
      });
  };

  postOrderItem = (req, res) => {
    const { itemId, orderId } = req.params;
    const { amount, option } = req.body;

    this._orderService
      .postOrderItem(itemId, orderId, amount, option)
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

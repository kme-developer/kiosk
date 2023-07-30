import { OrderService, ResponseService } from '../service';

export class OrderController {
  _orderService = new OrderService();
  _responseService = new ResponseService();

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

import { ItemService, ResponseService } from '../service';

export class ItemController {
  _itemService = new ItemService();
  _responseService = new ResponseService();

  postItem = (req, res) => {
    const { name, price, type } = req.body;

    this._itemService
      .postItem(name, price, type)
      .then((body) => {
        this._responseService.sendResponse(res, 200, true, body);
      })
      .catch((error) => {
        this._responseService.sendResponse(res, 500, false, error);
      });
  };

  getItem = (req, res) => {
    const { type } = req.body;

    this._itemService
      .getItem(type)
      .then((body) => {
        this._responseService.sendResponse(res, 200, true, body);
      })
      .catch((error) => {
        this._responseService.sendResponse(res, 500, false, error);
      });
  };

  updateItem = (req, res) => {
    const { itemId } = req.params;
    const { name, price } = req.body;

    this._itemService
      .updateItem(itemId, name, price)
      .then((body) => {
        this._responseService.sendResponse(res, 200, true, body);
      })
      .catch((error) => {
        this._responseService.sendResponse(res, 500, false, error);
      });
  };

  deleteItem = (req, res) => {
    const { itemId } = req.params;

    this._itemService
      .deleteItem(itemId)
      .then((body) => {
        this._responseService.sendResponse(res, 200, true, body);
      })
      .catch((error) => {
        this._responseService.sendResponse(res, 500, false, error);
      });
  };

  deleteItemWithResponse = (req, res) => {
    const { itemId } = req.params;
    const { answer } = req.body;

    this._itemService
      .deleteItemWithResponse(itemId, answer)
      .then((body) => {
        this._responseService.sendResponse(res, 200, true, body);
      })
      .catch((error) => {
        this._responseService.sendResponse(res, 500, false, error);
      });
  };
}

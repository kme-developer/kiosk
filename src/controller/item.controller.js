import { ItemService } from '../service';

export class ItemController {
  _itemService = new ItemService();

  postItem = (req, res) => {
    const { name, price, type } = req.body;

    this._itemService
      .postItem(name, price, type)
      .then((body) => {
        // To send response
        res.status(200).json({
          success: true,
          body,
        });
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  };
}

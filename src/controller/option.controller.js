import { OptionService, ResponseService } from '../service';

export class OptionController {
  _optionService = new OptionService();
  _responseService = new ResponseService();

  createOption = (req, res) => {
    const { extraPrice, shotPrice, hot } = req.body;

    this._optionService
      .createOption(extraPrice, shotPrice, hot)
      .then((body) => {
        this._responseService.sendResponse(res, 200, true, body);
      })
      .catch((error) => {
        this._responseService.sendResponse(res, 500, false, error);
      });
  };

  deleteOption = (req, res) => {
    const { optionId } = req.params;

    this._optionService
      .deleteOption(optionId)
      .then((body) => {
        this._responseService.sendResponse(res, 200, true, body);
      })
      .catch((error) => {
        this._responseService.sendResponse(res, 500, false, error);
      });
  };
}

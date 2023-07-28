export class ResponseService {
  sendResponse = (res, code, success, body) => {
    res.status(code).json({
      success,
      body,
    });
  };
}

import { Options } from '../database/models/orderItem';

export class OptionService {
  createOption = async (extraPrice, shotPrice, hot) => {
    try {
      await Options.create({
        extra_price: extraPrice,
        shot_price: shotPrice,
        hot: hot, // defaultValue: true
      });
      return {
        message: 'option, method: post => success',
      };
    } catch (error) {
      return {
        message: 'internal server error',
      };
    }
  };

  deleteOption = async (optionId) => {
    try {
      await Options.destroy({ where: { id: optionId } });
      return {
        message: 'option, method: delete => success',
      };
    } catch (error) {
      return {
        message: 'internal server error',
      };
    }
  };
}

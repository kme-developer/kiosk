import Options from '../database/models/option';
import Cache from '../cache/cache';

export class OptionService {
  createOption = async (name, extraPrice, shotPrice, hot) => {
    try {
      await Options.create({
        name: name,
        extra_price: extraPrice,
        shot_price: shotPrice,
        hot: hot,
      });
      Cache.flushCache();
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
      Cache.flushCache();
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

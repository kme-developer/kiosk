import { Item, itemType } from '../database';

export class ItemService {
  postItem = async (name, price, type) => {
    if (!name || !price) {
      return {
        message: `${name}을 입력해주세요.`,
      };
    }

    if (!Object.values(itemType).includes(type)) {
      return {
        message: '상품 유형을 올바르게 입력해주세요.',
      };
    }

    try {
      await Item.create({
        name: name,
        option_id: 0, // default
        price: price,
        type: type,
        amount: 0, // default
      });

      return {
        message: 'item, method: post => success',
      };
    } catch (error) {
      return {
        message: 'internal server error',
      };
    }
  };
}

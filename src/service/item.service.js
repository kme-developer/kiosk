import { Items } from '../database/models/item';
import { itemType } from '../database/enum';

export class ItemService {
  postItem = async (name, price, type) => {
    if (!name || !price) {
      return {
        message: `{name}을 입력해주세요.`,
      };
    }

    if (!Object.values(itemType).includes(type)) {
      return {
        message: '상품 유형을 올바르게 입력해주세요.',
      };
    }

    try {
      await Items.create({
        name: name,
        option_id: 0, // default
        price: price,
        type: type,
        count: 0, // default
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

  getItem = async (type) => {
    try {
      if (!type) {
        const allItems = await Items.findAll({});
        return {
          result: allItems,
        };
      } else if (type) {
        if (!Object.values(itemType).includes(type)) {
          return {
            message: '상품 유형을 올바르게 입력해주세요.',
          };
        }
        const itemsWithType = await Items.findAll({ where: { type } });
        return {
          result: itemsWithType,
        };
      }
    } catch (error) {
      return {
        message: 'internal server error',
      };
    }
  };

  updateItem = async (itemId, name, price) => {
    if (!name) {
      return {
        message: '이름을 입력해주세요.',
      };
    }

    if (!price || price <= 0) {
      return {
        message: '알맞은 가격을 입력해주세요.',
      };
    }

    try {
      await Items.update({ name, price }, { where: { id: itemId } });
      return {
        message: 'item, method: put => success',
      };
    } catch (error) {
      return {
        message: 'internal server error',
      };
    }
  };

  deleteItem = async (itemId) => {
    const item = await Items.findOne({ where: { id: itemId } });
    if (item.count === 0) {
      try {
        await Items.destroy({ where: { id: itemId } });
        return {
          message: 'item, method: delete => success',
        };
      } catch (error) {
        return {
          message: 'internal server error',
        };
      }
    } else {
      return {
        message: '판매 이력이 존재합니다. 삭제하시겠습니까?',
      };
    }
  };

  deleteItemWithResponse = async (itemId, answer) => {
    if (answer === '예') {
      try {
        await Items.destroy({ where: { id: itemId } });
        return {
          message: 'item, method: delete => success',
        };
      } catch (error) {
        return {
          message: 'internal server error',
        };
      }
    } else if (answer === '아니오') {
      return;
    }
  };
}

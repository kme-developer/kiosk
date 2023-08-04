import { Items } from '../database/models/item';
import { itemType } from '../database/enum';
import { Cache } from '../cache/cache';

export class ItemService {
  postItem = async (name, price, type) => {
    if (!name || !price) {
      return {
        message: '상품명과 가격을 입력해주세요.',
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
        const allItemsWithOption = allItems.map((item) => {
          const option = Cache.getCache(`option${item.option_id}`);
          item.option = option;
          return item;
        });
        return {
          result: allItemsWithOption,
        };
      } else if (type) {
        if (!Object.values(itemType).includes(type)) {
          return {
            message: '상품 유형을 올바르게 입력해주세요.',
          };
        }
        const itemsWithType = await Items.findAll({ where: { type } });
        const itemsWithTypeAndOption = itemsWithType.map((item) => {
          const option = Cache.getCache(`option${item.option_id}`);
          item.option = option;
          return item;
        });
        return {
          result: itemsWithTypeAndOption,
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
        message: '상품명을 입력해주세요.',
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
      await Cache.setCache(`item${itemId}`, itemId, 15000);
      return {
        message: '판매 이력이 존재합니다. 삭제하시겠습니까?',
      };
    }
  };

  deleteItemWithResponse = async (itemId, answer) => {
    const deleteItemId = await Cache.getCache(`item${itemId}`);
    if (itemId !== deleteItemId) {
      return {
        message: '다시 시도해주세요.',
      };
    }
    if (answer === '예') {
      try {
        await Items.destroy({ where: { id: itemId } });
        await Cache.deleteCache(`item${itemId}`);
        return {
          message: 'item, method: delete => success',
        };
      } catch (error) {
        return {
          message: 'internal server error',
        };
      }
    } else if (answer === '아니오') {
      await Cache.deleteCache(`item${itemId}`);
      return;
    }
  };
}

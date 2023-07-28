import { Item, itemType } from '../database/models/item';

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

  getItem = async (type) => {
    try {
      if (!type) {
        const allItems = await Item.findAll({});
        return {
          result: allItems,
        };
      } else if (type) {
        if (!Object.values(itemType).includes(type)) {
          return {
            message: '상품 유형을 올바르게 입력해주세요.',
          };
        }
        const itemsWithType = await Item.findAll({ where: { type } });
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
      await Item.update({ name, price }, { where: { item_id: itemId } });
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
    const item = await Item.findOne({ where: { item_id: itemId } });
    if (item.amount === 0) {
      try {
        await Item.destroy({ where: { item_id: itemId } });
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
        message: '현재 수량이 남아있습니다. 삭제하시겠습니까?',
      };
    }
  };

  deleteItemWithResponse = async (itemId, answer) => {
    if (answer === '예') {
      try {
        await Item.destroy({ where: { item_id: itemId } });
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

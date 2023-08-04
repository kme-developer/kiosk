import Items from '../database/models/item';
import Orders from '../database/models/order';
import OrderItems from '../database/models/orderItem';
import { orderState } from '../database/enum';
import { Transaction } from 'sequelize';
import Cache from '../cache/cache';

export class OrderService {
  postOrder = async (userId, itemIds, amounts, options) => {
    try {
      if (!itemIds || !amounts || !options) {
        return {
          message: '입력되지 않은 값이 존재합니다.',
        };
      }
      const order = await Orders.create({
        isUser: !!userId, // type => Boolean
        user_id: userId || null,
        state: 0, // default
      });
      for (let i = 0; i < itemIds.length; i++) {
        const itemId = itemIds[i];
        const amount = amounts[i];
        const option = options[i];

        const item = await Items.findOne({ where: { id: itemId } });
        const optionFromCache = Cache.getCache(`option${item.option_id}`);

        await OrderItems.create({
          item_id: itemId,
          order_id: order.id,
          amount: amount,
          option: option,
          price: item.price + optionFromCache.extra_price * option.extra + optionFromCache.shot_price * option.shot,
        });
      }
      const orderItems = await OrderItems.findAll({ order_id: order.id });
      const totalPrice = orderItems.reduce((total, item) => total + item.price, 0);
      return {
        message: `주문 번호: ${order.id}, 총합 가격: ${totalPrice}`,
      };
    } catch (error) {
      return {
        message: 'internal server error',
      };
    }
  };

  getOrderForManager = async (state) => {
    try {
      if (!state) {
        const allOrders = await Orders.findAll({ order: [['id', 'DESC']] });

        return {
          result: allOrders,
        };
      } else if (state) {
        if (!Object.values(orderState).includes(state)) {
          return {
            message: '주문 상태를 올바르게 입력해주세요.',
          };
        }
        const ordersWithState = await Orders.findAll({ where: { state } });

        return {
          result: ordersWithState,
        };
      }
    } catch (error) {
      return {
        message: 'internal server error',
      };
    }
  };

  getOrderForUser = async (id) => {
    try {
      const orders = await Orders.findAll({ where: { user_id: id }, order: [['id', 'DESC']] });
      return {
        result: orders,
      };
    } catch (error) {
      return {
        message: 'internal server error',
      };
    }
  };

  getOrderForNotUser = async (orderId) => {
    try {
      const order = await Orders.findOne({ where: { order_id: orderId } });
      return {
        result: order,
      };
    } catch (error) {
      return {
        message: 'internal server error',
      };
    }
  };

  updateState = async (orderId, state) => {
    if (!Object.values(orderState).includes(type)) {
      return {
        message: '주문 상태를 올바르게 입력해주세요.',
      };
    }

    const order = await Orders.findOne({ where: { id: orderId } });
    if (!order) {
      return {
        message: '해당 주문을 찾을 수 없습니다.',
      };
    }

    // TRANSACTION
    const transaction = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });

    try {
      if (order.state === orderState.ORDERED) {
        // ORDERED => PENDING
        if (state === orderState.PENDING) {
          await Orders.update({ state }, { where: { id: orderId } });
          return {
            message: 'state: ordered => pending',
          };
        }
        // ORDERED => CANCELED
        if (state === orderState.CANCELED) {
          await Orders.update({ state }, { where: { id: orderId } });
          return {
            message: 'state: ordered => canceled',
          };
        }
      }
      if (order.state === orderState.PENDING) {
        // PENDING => COMPLETED
        if (state === orderState.COMPLETED) {
          try {
            await Orders.update({ state }, { where: { id: orderId } }, { transaction: transaction });
            const orderItems = await OrderItems.findAll({ where: { orderId } });
            const item_ids = orderItems.map((orderItem) => orderItem.item_id);
            await Items.update({ count: Sequelize.literal('count + 1') }, { where: { id: item_ids } }, { transaction: transaction });
            transaction.commit();
            return {
              message: 'state: pending => completed',
            };
          } catch (error) {
            console.error(error);
            transaction.rollback();
            return {
              message: 'transaction error',
            };
          }
        }
        // PENDING => CANCELED
        if (state === orderState.CANCELED) {
          await Orders.update({ state }, { where: { id: orderId } });
          return {
            message: 'state: pending => canceled',
          };
        }
      }
      if (order.state === orderState.COMPLETED) {
        // COMPLETED => CANCELED
        if (state === orderState.CANCELED) {
          try {
            await Orders.update({ state }, { where: { id: orderId } }, { transaction: transaction });
            const orderItems = await OrderItems.findAll({ where: { orderId } });
            const item_ids = orderItems.map((orderItem) => orderItem.item_id);
            await Items.update({ count: Sequelize.literal('count - 1') }, { where: { id: item_ids } }, { transaction: transaction });
            await OrderItems.destroy({ where: { order_id: orderId } }, { transaction: transaction });
            transaction.commit();
            return {
              message: 'state: pending => completed',
            };
          } catch (error) {
            console.error(error);
            transaction.rollback();
            return {
              message: 'transaction error',
            };
          }
        }
      }
    } catch (error) {
      return {
        message: 'internal server error',
      };
    }
  };
}

import Items from '../database/models/item';
import Orders from '../database/models/order';
import OrderItems from '../database/models/orderItem';
import { orderState } from '../database/enum';
import { Transaction } from 'sequelize';

export class OrderService {
  postOrder = async (userId) => {
    try {
      await Orders.create({
        isUser: !!userId,
        user_id: userId || null,
        state: 0, // default
      });
      return {
        message: 'order, method: post => success',
      };
    } catch (error) {
      return {
        message: 'internal server error',
      };
    }
  };

  postOrderItem = async (itemId, orderId, amount, option) => {
    if (!option) {
      return {
        message: '상품의 option 값이 존재하지 않습니다.',
      };
    }

    try {
      const item = await Items.findOne({ where: { id: itemId } });
      await OrderItems.create({
        item_id: itemId,
        order_id: orderId,
        amount: amount, // defaultValue: 1
        option: option, // JSON
        price: item.price + option.extra + option.shot,
      });
      return {
        message: 'orderItem, method: post => success',
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

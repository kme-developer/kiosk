import { Items, Orders, OrderItems } from '../database/models';
import { orderState } from '../database/enum';
import { Transaction } from 'sequelize';

export class OrderService {
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
            await Orders.update({ state }, { where: { id: orderId }, transaction: transaction });
            const orderItems = await OrderItems.findAll({ where: { orderId } });
            const item_ids = orderItems.map((orderItem) => orderItem.item_id);
            await Items.update({ amount: Sequelize.literal('amount + 1') }, { where: { id: item_ids }, transaction: transaction });
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
            await Orders.update({ state }, { where: { id: orderId }, transaction: transaction });
            const orderItems = await OrderItems.findAll({ where: { orderId } });
            const item_ids = orderItems.map((orderItem) => orderItem.item_id);
            await Items.update({ amount: Sequelize.literal('amount - 1') }, { where: { id: item_ids }, transaction: transaction });
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
        message: '잘못된 요청입니다.',
      };
    }
  };
}

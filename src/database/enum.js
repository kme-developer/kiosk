// src/database/models/enum.js

const itemType = {
  COFFEE: 'coffee',
  DESERT: 'desert',
  JUICE: 'juice',
  TEA: 'tea',
};

const orderState = {
  ORDERED: 0,
  PENDING: 1,
  COMPLETED: 2,
  CANCELED: 3,
};

export default { itemType, orderState };

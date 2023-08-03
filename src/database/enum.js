// src/database/models/enum.js

const itemType = {
  ADE: 'ade',
  COFFEE: 'coffee',
  DESERT: 'desert',
  TEA: 'tea',
};

const orderState = {
  ORDERED: 0,
  PENDING: 1,
  COMPLETED: 2,
  CANCELED: 3,
};

export default { itemType, orderState };

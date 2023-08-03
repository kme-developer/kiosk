// src/cache/init.option.js

import Options from '../database/models/option';
import { Cache } from './cache';

export default async function initCacheOption() {
  try {
    const options = await Options.findAll({});
    options.forEach((option) => {
      Cache.setCache(`option${option.id}`, option, 15000); // 15-sec
    });
    console.log('Options data cached => success');
  } catch (error) {
    console.log('Options data cached =>', error);
  }
}

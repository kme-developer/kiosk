// src/cache/cache.js

import NodeCache from 'node-cache';

export class Cache {
  constructor() {
    this.cache = new NodeCache();
  }

  setCache(key, data, ttl) {
    this.cache.set(key, data, ttl);
  }

  getCache(key) {
    return this.cache.get(key);
  }

  flushCache() {
    this.cache.flushAll();
  }
}

const Database = require('@blocklet/sdk/lib/database');

/**
 * Data structure
 * - _id: string
 * - did: string
 * - name: string 简历名称
 * - schema: string
 * - summary: string 简历介绍
 * - updatedAt: utc datetime string
 * - createdAt: utc datetime string
 */

class Resume extends Database {
  constructor() {
    super('resume');
    this.ensureIndex({ fieldName: 'did', unique: true }, (err) => {
      if (err) {
        console.error('Failed to ensure resume unique index', err);
      }
    });
  }
}

module.exports = new Resume();

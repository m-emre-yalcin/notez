import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('notez.db', '1.0', 'Notez DB', 200000, () => {
  console.log('Database opened');
});

type query = {
  start: number,
  limit: number,
  orderBy: string,
}

const createTable = async (table: string, schema: string) => {
  let $rows: null | {} | []
  db.transaction(async tx => {
    if (!schema) {
      throw new Error('Schema is required');
    }
    const sql = `CREATE TABLE IF NOT EXISTS ${table} (${schema})`

    tx.executeSql(sql, [], (tx, { rowsAffected, rows }) => {
      console.log('Table created', table);
      $rows = rows;
    });
  })
  return Promise.all([$rows])
}

const get = async (path: string, query: query = { start: 0, limit: 10, orderBy: 'id DESC' }) => {
  let $rows: null | {} | []
  const [table, id] = path.split('/').filter((d) => d !== '');
  db.transaction(async tx => {
    const sql = `SELECT * FROM ${table} ${id ? 'WHERE id = ?' : ''} ORDER BY ${query.orderBy} LIMIT ${query.limit} OFFSET ${query.start}`

    tx.executeSql(sql, [id], (tx, { rows }) => {
      console.log('Data fetched', path, sql);
      $rows = rows
    })
  })
  return Promise.all([$rows])
}

const update = async (path: string, data: object) => {
  let $rows: null | {} | []
  const [table, id] = path.split('/').filter((d) => d !== '');
  db.transaction(async tx => {
    const sql = `UPDATE ${table} SET (${Object.keys(data).map(col => `${col} = ?`).join(',')}) WHERE id = ? RETURNING *`

    tx.executeSql(sql, [...Object.values(data), id], (tx, { rows }) => {
      console.log('Data updated', path, sql);
      $rows = rows
    })
  })
  return Promise.all([$rows])
}

const create = async (path: string, data: object) => {
  let $rows: null | {} | []
  const [table] = path.split('/').filter((d) => d !== '');
  db.transaction(async tx => {
    const sql = `INSERT INTO ${table} (${Object.keys(data).join(',')}) VALUES (${Object.keys(data).map(() => '?').join(',')}) RETURNING *`

    tx.executeSql(sql, Object.values(data), (tx, { rows }) => {
      console.log('Data created', path, sql);
      $rows = rows
    })
  }, null, () => Promise.all([$rows]))
}

const del = async (path: string) => {
  let $rows: null | {} | []
  const [table, id] = path.split('/').filter((d) => d !== '');
  db.transaction(async tx => {
    const sql = `DELETE FROM ${table} WHERE id = ? RETURNING *`

    tx.executeSql(sql, [id], (tx, { rows }) => {
      console.log('Data deleted', path, sql);
      $rows = rows
    })
  })
  return Promise.all([$rows])
}

export default {
  createTable,
  create,
  get,
  update,
  del,
  db,
}
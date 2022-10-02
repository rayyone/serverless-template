import Sql from '../services/sql';

const table = 'foo'

export default class Foo {
  static async create({ id, data } = {}) {
    const sql = ` INSERT INTO ${table} AS t (id, data, created_at, updated_at)
      VALUES ( $1, $2, NOW(), NOW() )
      ON CONFLICT (id) DO UPDATE SET
      updated_at = NOW(), data = EXCLUDED.data
    `

    return (await Sql.execute(sql, [id, data]))[0]
  }

  static async findByID(id) {
    let sql = `SELECT * FROM ${table} WHERE id = $1 `
    return (await Sql.execute(sql, [id]))[0]
  }

  static async upsertFoo(values) {
    if (!values) {
      return
    }
    const existedFoo = await Foo.findByID(values[0])
    if (existedFoo) {
      let sql = `UPDATE ${table} SET  
       data = $1,
       detail = $2,
       updated_at = NOW() WHERE id = $3;`
      return await Sql.execute(sql, [...values, existedFoo.id])
    }

    let sql = `INSERT INTO ${table} 
       (data, detail, created_at, updated_at) 
       VALUES ($1, $2, NOW(), NOW());`

    return await Sql.execute(sql, values)
  }

}

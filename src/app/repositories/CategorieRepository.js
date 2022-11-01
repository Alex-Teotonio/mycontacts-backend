const db = require('../../database');

class CategorieRepository {
  async create(name) {
    const [row] = await db.query(
      `
      INSERT INTO categories(name)
      VALUES ($1)
      RETURNING *`,
      [name],
    );

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM categories WHERE id = $1;', [id]);
    return deleteOp;
  }

  async update(id, name) {
    db.query(
      `
      UPDATE categories
      SET name = $1
      WHERE id = $2
      RETURNING *`,
      [name, id],
    );
  }

  async findByName(name) {
    const row = await db.query('SELECT * FROM categories WHERE name = $1;', [name]);
    return row;
  }

  async findById(id) {
    const row = await db.query('SELECT * FROM categories WHERE id = $1;', [id]);
    return row;
  }

  async findAll() {
    const rows = await db.query('SELECT * FROM categories;');
    return rows;
  }
}

module.exports = new CategorieRepository();

const db = require('../../database');

class ContactRepository {
  async findAll(orderBy = 'asc') {
    const isOrderBy = orderBy === 'desc' ? 'desc' : 'asc';
    const rows = await db.query(`SELECT con.*,cat.name as category_name FROM  contacts as con LEFT JOIN categories as cat on con.category_id = cat.id ORDER BY con.name ${isOrderBy};`);
    return rows;
  }

  async findById(id) {
    const row = await db.query('con.*, cat.name as category_name FROM  contacts as con LEFT JOIN categories as cat on con.category_id = cat.id WHERE id = $1;', [id]);
    return row;
  }

  async findByEmail(email) {
    const row = await db.query('SELECT * FROM contacts WHERE email = $1;', [email]);
    return row;
  }

  async create(name, email, phone, category_id) {
    const [row] = await db.query(
      `
      INSERT INTO contacts(name, email, phone, category_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [name, email, phone, category_id],
    );

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM contacts WHERE id = $1;', [id]);
    return deleteOp;
  }

  update(id, {
    name, email, phone, category_id,
  }) {
    db.query(
      `
      UPDATE contacts
      SET name = $1, email = $2, phone = $3, category_id = $4
      WHERE id = $5
      RETURNING *`,
      [name, email, phone, category_id, id],
    );
  }
}

module.exports = new ContactRepository();

const AbstractManager = require("./AbstractManager");

class UserRentProperty extends AbstractManager {
  constructor() {
    super({ table: "user_rent_property" });
  }

  insert(item) {
    return this.database.query(`insert into ${this.table} (title) values (?)`, [
      item.title,
    ]);
  }

  update(item) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [item.title, item.id]
    );
  }
}

module.exports = UserRentProperty;

const AbstractManager = require("./AbstractManager");

class PropertyManager extends AbstractManager {
  constructor() {
    super({ table: "property" });
  }

  insert(property) {
    const descriptionJSON = JSON.stringify(property.description);

    return this.database.query(
      `insert into ${this.table} (name, description, localisation, price, information, pieces,user_id ) values (?,?,?,?,?,?,?)`,
      [
        property.name,
        descriptionJSON,
        property.localisation,
        property.price,
        property.information,
        property.pieces,
        property.user_id,
      ]
    );
  }

  update(item) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [item.title, item.id]
    );
  }

  findFromUserId(id) {
    return this.database.query(
      `select *  from ${this.table}  where user_id = ?`,
      [id]
    );
  }
}

module.exports = PropertyManager;

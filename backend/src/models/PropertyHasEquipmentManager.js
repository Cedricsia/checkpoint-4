const AbstractManager = require("./AbstractManager");

class PropertyHasEquipmentManager extends AbstractManager {
  constructor() {
    super({ table: "property_has_equipment" });
  }

  insert(item) {
    return this.database.query(
      `insert into ${this.table} (property_id, equipment_id) values (?, ?)`,
      [item.property_id, item.equipment_id]
    );
  }

  update(item) {
    return this.database.query(
      `update ${this.table} set property_id = ? where id = ?`,
      [item.title, item.id]
    );
  }

  findWithProperty(id) {
    return this.database.query(
      `select e.name from ${this.table} pe inner join equipment e on e.id = pe.equipment_id   where property_id = ?`,
      [id]
    );
  }
}

module.exports = PropertyHasEquipmentManager;

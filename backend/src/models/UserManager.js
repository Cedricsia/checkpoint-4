const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    return this.database.query(
      `insert into ${this.table} ( password, pseudo, mail, firstname, lastname) values ( ?,?,?,?,?)`,
      [
        user.creationPassword,
        user.pseudo,
        user.creationMail,
        user.firstname,
        user.lastname,
      ]
    );
  }

  update(item) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [item.title, item.id]
    );
  }

  findOneByEmail(mail) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE mail = ?`, [
      mail,
    ]);
  }
}

module.exports = UserManager;

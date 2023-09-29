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

  update(user) {
    return this.database.query(
      `update ${this.table} set firstname = ?, lastname =?, pseudo=?, mail =? ,image=? where id = ?`,
      [
        user.firstname,
        user.lastname,
        user.pseudo,
        user.mail,
        user.image,
        user.id,
      ]
    );
  }

  findOneByEmail(mail) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE mail = ?`, [
      mail,
    ]);
  }

  findAllFromUser(id) {
    return this.database.query(
      `SELECT firstname,lastname,pseudo,image,mail FROM ${this.table} WHERE id = ?`,
      [id]
    );
  }
}

module.exports = UserManager;

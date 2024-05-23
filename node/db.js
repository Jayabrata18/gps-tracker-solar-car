const sqlite3 = require("sqlite3").verbose();
const fileName = "./stats.db";
const fs = require("fs");

function createDbConnection() {
    if (fs.existsSync(fileName)) {
        const db = new sqlite3.Database(fileName);
        return db;
    }
    else {
        const db = new sqlite3.Database(fileName, (error) => {
            if (error) {
                return console.error(error.message);
            }
            createTable(db);
            insertRow(db,[20,22.57631593318771, 88.4280334698181]);
        });
        console.log("Connection with SQLite has been established");
        return db;
    }
}

function createTable(db) {
    db.exec(`
    CREATE TABLE info
    (
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      battery_percentage INTEGER,
      latitude INTEGER,
      longitude INTEGER
    );
  `);
}

function insertRow(db,data) {
  db.run(
    `INSERT INTO info (battery_percentage, latitude, longitude) VALUES (?, ?, ?)`,
    data,
    function (error) {
      if (error) {
        console.error(error.message);
      }
      console.log(`Inserted a row with the ID: ${this.lastID}`);
    }
  );
}

function updateRow(db,id,data){
    db.run(
        `UPDATE info SET battery_percentage = ?, latitude = ? , longitude = ? WHERE id = ?`,
        [...data,id],
        (error) => {
            if(error)
                console.error(error.message);
            console.log(`Row ${id} has been updated`)
        }
    )
}



module.exports = {
    createDbConnection,
    insertRow,
    updateRow
}
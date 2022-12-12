import * as SQLite from 'expo-sqlite';

/**@typedef {import("./interfaces").alarmRow} alarmRow */

export default class Database {
   static instance = new this

   constructor() {
      this.db = SQLite.openDatabase("Bros_Michal_4ic1.db"); // proszę o taki schemat nazywania swojej bazy danych, zwłaszcza podczas testów na tablecie

      this.createTable()
   }

   createTable() {
      this.db.transaction(tx => {
         tx.executeSql(
            // "CREATE TABLE IF NOT EXISTS table1 (id integer primary key not null, a text, b text);"
            `CREATE TABLE IF NOT EXISTS alarms (
               id integer primary key not null, 
               time text, 
               Mon tinyint(1), 
               Tue tinyint(1), 
               Wed tinyint(1), 
               Thu tinyint(1), 
               Fri tinyint(1), 
               Sat tinyint(1), 
               Sun tinyint(1), 
               activated tinyint(1));`
         );
      });
   }

   add({ time = "00:00", activated = 0, Mon = 0, Tue = 0, Wed = 0, Thu = 0, Fri = 0, Sat = 0, Sun = 0 }) {
      return new Promise(res => {
         this.db.transaction(
            tx => {
               tx.executeSql(`INSERT INTO 
                  alarms(time, Mon, Tue, Wed, Thu, Fri, Sat, Sun, activated) 
                  values('${time}', ${Mon}, ${Tue}, ${Wed}, ${Thu}, ${Fri}, ${Sat}, ${Sun}, ${activated})`,
                  [],
                  () => { res(true) }
               );
            },
         )
      })
   }
   /** @param {number} id*/
   remove(id) {
      return new Promise(res => {
         this.db.transaction(
            tx => { tx.executeSql(`DELETE FROM alarms WHERE id=${id}`, [], () => { res(true) }); },
         )
      })
   }

   
   // update(id, { time = "00:00", activated = 0, Mon = 0, Tue = 0, Wed = 0, Thu = 0, Fri = 0, Sat = 0, Sun = 0 }) {
   /**
    * @param {string} sql
    */
   update(sql) {
      return new Promise((res,reject) => {
         this.db.transaction(
            tx => {
               tx.executeSql(sql,
                  [],
                  () => { res(true) }
               );
            },
            (tx, error) => {               
               reject(error)
            }
         )
      })
   }

   /**@return {Promise<alarmRow[]>} */
   getAll() {
      var query = "SELECT * FROM alarms";

      return new Promise((resolve, reject) => {
         this.db.transaction(tx => {
            tx.executeSql(query, [], (tx, results) => {
               console.log(JSON.stringify(results))
               resolve(results.rows._array);
            })
         }, (tx, error) => {
            reject(error)
         }
         )
      })
   }
}
 
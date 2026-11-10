import mysql from 'mysql2/promise';

const conn = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'STUDY'
});
export default conn;

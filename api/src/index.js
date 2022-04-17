const express = require("express");
const { connectDb } = require("./helpers/db");
const {host, port, db} = require("./configuration"); //Берем информацию о хосте, порте и бд.
const app = express(); 

const startServer = () => {
  //Приложение запускается только после коннекта к БД
  app.listen(port, () => {
    console.log(`Started api service on port ${port}`);
    console.log(`On host ${host}`);
    console.log(`Our databese ${db}`)
  });
}

app.get("/test", (req, res) => {
  res.send("Our api server is working correctly");
});

connectDb() //Подключение к базе
  .on('error', console.log)
  .on('disconnected', connectDb)
  .once('open', startServer);
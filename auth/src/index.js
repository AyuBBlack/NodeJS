const express = require("express");
const { connectDb } = require("./helpers/db");
const {host, port, db} = require("./configuration"); //Берем информацию о хосте, порте и бд.
const app = express();

const startServer = () => {
  //Приложение запускается только после коннекта к БД
  app.listen(port, () => {
    console.log(`Started auth service on port ${port}`);
    console.log(`On host ${host}`);
    console.log(`Our databese ${db}`)
  });
};

    // const silence = new Post({name: "Silence"});
    // console.log(silence.name);

app.get("/test", (req, res) => {
  res.send("Our auth server is working correctly");
});

connectDb() //Подключение к базе
  .on('error', console.log)
  .on('disconnected', connectDb)
  .once('open', startServer);
const express = require("express");
const mongoose = require("mongoose");
const { connectDb } = require("./helpers/db");
const {host, port, db} = require("./configuration"); //Берем информацию о хосте, порте и бд.
const app = express();
const postShema =  new mongoose.Schema({
  name: String
});
const Post = mongoose.model('Post', postShema);

const startServer = () => {
  //Приложение запускается только после коннекта к БД
  app.listen(port, () => {
    console.log(`Started api service on port ${port}`);
    console.log(`On host ${host}`);
    console.log(`Our databese ${db}`)

    //Поиск элемента
    // Post.find(function(err, posts){
    //   if (err) return console.error(err);
    //   console.log("posts", posts);
    // });

    //Сохранение 
    const silence = new Post ({name: "Silence"});
    silence.save(function(err, savedSilence){
      if (err) return console.error(err);
      console.log("savedSilence!", savedSilence);
    });
  });
};

    // const silence = new Post({name: "Silence"});
    // console.log(silence.name);

app.get("/test", (req, res) => {
  res.send("Our api server is working correctly");
});

connectDb() //Подключение к базе
  .on('error', console.log)
  .on('disconnected', connectDb)
  .once('open', startServer);
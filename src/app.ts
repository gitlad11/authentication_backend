// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from 'cors';
import { initDatabase } from "./database";
import { routes } from "./views/home_router";

var cluser = require('node:cluster');
var http = require('node:http');
var numCPUs = require('node:os').availableParallelism();
var process = require('node:process');
var PORT = process.env.PORT || 3001;


dotenv.config();

const app: Express = express();
initDatabase();
//Cors нужно поменять на frontend домен
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(express.json({limit: '500mb'}));
app.use(express.urlencoded({limit: '500mb', extended: true}));

app.use(function(request: express.Request, response: express.Response, next: express.NextFunction) {
    response.header("Access-Control-Allow-Origin", '*');
    response.header("Access-Control-Expose-Headers", "Content-Disposition");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.contentType('application/json');
    next();
});

routes(app);
app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

//Кластеризация
/*if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);
  
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
  
    cluster.on('exit', (worker : any, code: any, signal: any) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
      });
  }*/
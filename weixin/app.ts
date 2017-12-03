import * as http from "http";
import * as path from "path";
import * as express from "express";
import {Router, Request, Response, NextFunction} from 'express';

const PORT = 9527;
const app = express();
const server = http.createServer(app);

app.get('/',(req:Request,res:Response) => {
    if(res.statusCode === 200)
        res.send('welcome.This\'s just for json or xml or js.');
    else
        res.send('error.')
});

server.listen(PORT,() => {
    console.log(`http server is running on: http://localhost:${PORT}`);
})
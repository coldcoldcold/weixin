import * as http from "http";
import * as path from "path";
import * as express from "express";
import {Router, Request, Response, NextFunction} from 'express';
import {Server} from './src/server';

const PORT = 80;
const app: express.Application = new Server().app;
const server = http.createServer(app);

server.listen(PORT,() => {
    let host = server.address().address;
    let port = server.address().port;
    console.log(`http server is running on: http://${host}:${port}`);
})
import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import {weChatConfig} from './config';
import * as crypto from 'crypto';

module Routers {
    export class IndexRouter{
        public index(req: express.Request,res: express.Response,next: express.NextFunction){
            // let signature = req.query.signature;
            // let timestamp = req.query.timestamp;
            // let nonce = req.query.nonce;
            // let echostr = req.query.echostr;
            // let str = [weChatConfig.token,timestamp,nonce].sort().join('');
            // var sha1Code = crypto.createHash("sha1");
            // var code = sha1Code.update(str,'utf8').digest("hex");
            // console.log(`signature=${signature};timestamp=${timestamp};nonce=${nonce};echostr=${echostr};`);
            // if(code===signature){
            //     res.send(echostr)
            // }else{
                res.send("error get request");
            // }
        }
    }
    export class DataRouter{
        public data(req: express.Request,res: express.Response,next: express.NextFunction){
            var _da;
            req.on("data",function(data){
                /*微信服务器传过来的是xml格式的，是buffer类型，因为js本身只有字符串数据类型，所以需要通过toString把xml转换为字符串*/
                _da = data.toString();

            });
            req.on("end",function(){
                //console.log("end");
                console.log(_da);
                res.send('data end');
            });
        }
    }
}

export = Routers;
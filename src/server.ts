import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import { IndexRouter, DataRouter } from './routers';
import {weChatConfig} from './config';
import * as crypto from 'crypto';

export class Server {
    public app: express.Application;

    // public static getInstance(): Server{
    //     return new Server();
    // }

    private config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use((err: any,req: express.Request,res: express.Response,next: express.NextFunction) => {
            var error = new Error('Not Found');
            err.status = 404;
            res.send(error);
        })
    }

    private router(){
        let router: express.Router = express.Router();
        let data: DataRouter = new DataRouter();
        let index: IndexRouter = new IndexRouter();
        // router.all('*',(req: express.Request,res: express.Response,next: express.NextFunction) => {
        //     res.header("Access-Control-Allow-Origin", "*");
        //     res.header("Access-Control-Allow-Headers", "X-Requested-With");
        //     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        //     res.header("X-Powered-By",' 3.2.1');
        //     res.header("Content-Type", "application/json;charset=utf-8");
        //     next();
        // });
        // this.app.use((req: express.Request,res: express.Response,next: express.NextFunction) => {
        //     console.log('middleware in');
        //     res.header("Access-Control-Allow-Origin", "*");
        //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        //     next();
        // });
        router.post('/*', data.data.bind(data.data));
        router.post('/',index.index.bind(index.index));
        this.app.all('*',(req: express.Request,res: express.Response,next: express.NextFunction) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
            res.header("X-Powered-By",' 3.2.1');
            res.header("Content-Type", "application/json;charset=utf-8");
            console.log(req.path);
            next();
        });
        this.app.use('/api',router);
        this.app.get('/',(req: express.Request,res: express.Response,next: express.NextFunction) => {
            let signature = req.query.signature;
            let timestamp = req.query.timestamp;
            let nonce = req.query.nonce;
            let echostr = req.query.echostr;
            let str = [weChatConfig.token,timestamp,nonce].sort().join('');
            var sha1Code = crypto.createHash("sha1");
            var code = sha1Code.update(str,'utf8').digest("hex");
            console.log(`signature=${signature};timestamp=${timestamp};nonce=${nonce};echostr=${echostr};`);
            if(code===signature){
                res.send(echostr)
            }else{
                res.send("error get request");
            }
        });
    }

    constructor() {
        this.app = express();
        this.config();
        this.router();
    }
}

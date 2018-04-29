
import * as path from 'path';

import * as Koa from 'koa';
import * as KoaBody from 'koa-bodyparser';

import { logger } from 'koa-json-log';
import { config } from './config';
import { registerRoutes } from './routes';

const app = new Koa();

app.use(logger);
app.use(KoaBody());

registerRoutes(app);

app.listen(config.port);

console.log(`Server is running at http://localhost:${config.port}/`);

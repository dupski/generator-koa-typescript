
import * as path from 'path';

import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
import * as KoaBody from 'koa-bodyparser';

import { logger } from 'koa-json-log';
import { config } from './config';

const app = new Koa();
const router = new KoaRouter();

app.use(logger);
app.use(KoaBody());

router.get('/', async (ctx) => {
    const welcomeText = 'Welcome to Koa!'
    ctx.body = `<!DOCTYPE html>
<html>
<head>
    <title>${welcomeText}</title>
</head>
<body>
    <h1>${welcomeText}</h1>
</body>
</html>`
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(config.port);

console.log(`Server is running at http://localhost:${config.port}/`);

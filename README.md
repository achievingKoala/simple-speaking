# Speak Daily

侧栏的「语音识别方式」可切换浏览器识别和腾讯云识别。腾讯云模式在开口后检测停顿，录音最多 8 秒，使用 16 kHz 单声道 WAV。网页通过同源的 `/api/asr` 发送短录音，Pages Function 将音频交给腾讯云「一句话识别」英语模型。两种模式共用词卡、判定、错词重练和本地统计。

## Cloudflare Pages 部署

1. 在腾讯云开通语音识别，准备有权调用 `asr:SentenceRecognition` 的 API 凭证。
2. 在项目根目录登录 Wrangler、创建 Pages 项目并准备静态文件。若已有 Direct Upload 项目，跳过创建步骤，后续把 `simple-speaking` 替换成实际项目名。

   ```sh
   npx wrangler login
   npx wrangler pages project create simple-speaking --production-branch main
   sh build-pages.sh
   ```

3. 在 Cloudflare 的 Pages 项目 **Settings → Variables and Secrets** 中添加生产环境的两个 **Secret**，分别填入腾讯云的 SecretId 和 SecretKey。

   - `TENCENT_SECRET_ID`
   - `TENCENT_SECRET_KEY`

4. 在项目根目录部署。Wrangler 会上传 `dist` 并打包同级的 `functions`。

   ```sh
   npx wrangler pages deploy dist --project-name simple-speaking --branch main
   ```

   已接入 Git 的 Pages 项目可配置构建命令为 `sh build-pages.sh`，输出目录为 `dist`。控制台拖拽上传只适用于这里的静态文件，部署 `functions/api/asr.js` 用 Wrangler 或 Git 集成。

5. 打开部署后返回的 HTTPS 地址，选择「腾讯云识别」，允许麦克风后朗读一个词，检查转写、音效和自动切题。

腾讯云接口会消耗账号额度。同源校验用于阻止其他网页直接跨站调用，公开站点的接口仍可被直接请求。公开分享时可用 Cloudflare Access 限定试用用户，或配置接口限流。

## 本地预览

浏览器识别可沿用静态预览。联调腾讯云时，在项目根目录创建本地 `.dev.vars` 文件，写入相同名称的两个变量，每行一个 `变量名=值`，然后运行：

```sh
sh build-pages.sh
npx wrangler pages dev dist
```

打开 Wrangler 打印的本地地址。练习记录按浏览器和站点地址保存。

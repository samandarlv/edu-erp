import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";

async function start() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle("Edu CRM")
    .setDescription("Education center's API")
    .setVersion("1.0")
    .addTag("NestJs, Mongodb, JWT, OTP, Redis")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  app.setGlobalPrefix("/api");
  SwaggerModule.setup("/docs", app, document);

  app.use(cookieParser());

  const port = process.env.PORT;
  await app.listen(port, () => {
    console.log(`Listening ${port}-port`);
  });
}
start();

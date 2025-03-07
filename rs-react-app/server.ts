import express from "express";
import { renderToString } from "react-dom/server";
import fs from "fs";
import path from "path";
import App from "./src/App";

const app = express();

// Раздаём статические файлы
app.use(express.static("dist"));

// SSR-рендеринг
app.get("*", (req, res) => {
  try {
    const reactHtml = renderToString(<App ssr={true} location={req.url} />);

    const template = fs.readFileSync(path.resolve("dist/index.html"), "utf8");

    const finalHtml = template.replace('<div id="root"></div>', `<div id="root">${reactHtml}</div>`);

    res.send(finalHtml);
  } catch (error) {
    console.error("Ошибка SSR:", error);
    res.status(500).send("Внутренняя ошибка сервера");
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 SSR Server запущен на http://localhost:${PORT}`);
});

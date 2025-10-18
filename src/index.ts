import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { exec } from "child_process";
import { FSWatcher, PathLike, watch, WatchOptionsWithStringEncoding } from "fs";
import { Logestic } from "logestic";
import html from "@elysiajs/html";

import routeHandler from "./routes/handler";
import cors from "@elysiajs/cors";

const buildClient = (type?: "css" | "ts") => {
  const types = {
    css: "tailwindcss -i ./src/globals.css -o ./public/css/index.css",
    ts: "bun build --minify --target=browser --outfile=public/js/index.js ./src/client/main.ts",
  };
  return new Promise((resolve) =>
    exec(
      type != undefined ? types[type] : `${types.css} && ${types.ts}`,
      (_error, _stdout, stderr) => {
        console.log(stderr);
        resolve(null);
      }
    )
  );
};

await buildClient();

if (Bun.env.NODE_ENV != "production") {
  const watchers = (
    [
      {
        path: "./src/globals.css",
        config: {},
        type: "css",
      },
      {
        path: "./src/client",
        config: {
          recursive: true,
        },
        type: "ts",
      },
    ] as {
      path: PathLike;
      config?: WatchOptionsWithStringEncoding | BufferEncoding | null;
      type?: "css" | "ts";
    }[]
  ).map((option) =>
    watch(option.path, option.config, async () => {
      await buildClient(option.type);
    })
  );

  process.on("SIGINT", () => {
    watchers.forEach((watcher) => watcher.close());
    process.exit(0);
  });
}

const app = new Elysia()
  .use(Logestic.preset("common"))
  .use(cors())
  .use(
    staticPlugin({
      assets: "public",
      prefix: "",
    })
  )
  .use(html())
  .use(routeHandler)
  .listen(Bun.env.PORT || 3000, ({ url }) => {
    console.log(`Server started ${url}`);
  });

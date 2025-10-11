import { Html } from "@elysiajs/html";
import { PropsWithChildren } from "@kitajs/html";

export default ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Portfolio</title>
        <meta name="description" content="Ban" />

        <link rel="stylesheet" href="/css/index.css" />
        <script src="/js/index.js" defer></script>
      </head>
      <body>{children}</body>
    </html>
  );
};

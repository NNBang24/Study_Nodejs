const http = require("http");
const fs = require("fs");

const server = http.createServer(async (req, res) => {
  if (req.url === "/products" && req.method === "GET") {
    try {
      const data = await fs.promises.readFile("data.json", "utf8");
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(data);
    } catch (error) {
      res.writeHead(500, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify({ message: "Lỗi server khi lấy dữ liệu sản phẩm" }));
    }
  }

  else if (req.url === "/products" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      try {
        const newProduct = JSON.parse(body);

        // Đọc file
        const data = await fs.promises.readFile("data.json", "utf8");
        const products = JSON.parse(data);

        // Gán id mới
        newProduct.id = products.length + 1;
        products.push(newProduct);

        await fs.promises.writeFile("data.json", JSON.stringify(products, null, 2));
        res.writeHead(201, {
          "Content-Type": "application/json",
        });
        res.end(JSON.stringify(newProduct));

      } catch (error) {


        res.writeHead(400, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: 'du lieu khong hop le' })); ``
      }
    });
  }

  else {
    res.writeHead(404, {
      "Content-Type": "text/plain",
    });
    res.end("Không tìm thấy trang");
  }
});

const PORT = 5001;
server.listen(PORT, () => {
  console.log("Server đang lắng nghe tại http://localhost:" + PORT);
});

const http = require('http');
const fs = require('fs');

const sever = http.createServer(async (req, res) => {
    if (req.url === '/products' && req.method === "GET") {
        try {
            const data = await fs.promises.readFile("data.json", "utf8");
            res.writeHead(200, { "content-type": "application/json" });
            res.end(data)
        } catch (error) {
            res.writeHead(500, { "content-type": "application/json" });
            res.end({ message: "loi server khi lay du lieu san pham" })
        }
    }
    else if (req.url === '/products' && req.method === "POST") {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });
        req.on('end', async () => {
            try {

                const newProduct = JSON.parse(body);
                const data = await fs.promises.readFile("data.json", "utf8");
                const products = JSON.parse(data);

                newProduct.id = products.length + 1;

                products.push(newProduct);

                await fs.promises.writeFile('data.json', JSON.stringify(products, null, 2), 'utf8');
                res.writeHead(201, { 'content-type': 'application/json' })
                res.end(JSON.stringify(newProduct));
            } catch (error) {
                res.writeHead(400, { "content-type": "application/json" });
                res.end({ message: "du lieu khon hop le" })
            }
        })
    }
    else if (req.url.startsWith('/products/') && req.method === "PUT") {
        const productId = parseInt(req.url.split("/")[2]);
        // console.log(productId) ;
        if (isNaN(productId)) {
            res.writeHead(400, { "content-type": "application/json" });
            res.end({ message: "du lieu khon hop le" });
            return ;
        };
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });
        req.on('end', async () => {
            try {
                const updateProduct = JSON.parse(body);
                const data = await fs.promises.readFile('data.json', 'utf8');
                const products = JSON.parse(data);

                const productIndex = products.findIndex(p => {
                    return p.id === productId
                });
                if (productIndex === -1) {
                    res.writeHead(400, { "content-type": "application/json" });
                    res.end({ message: "du lieu khon hop le" });
                    return ;
                };

                products[productIndex] ={...products[productIndex] ,...updateProduct};

                await fs.promises.writeFile('data.json', JSON.stringify(products,null,2) ,'utf8');
                res.writeHead(201, { 'content-type': 'application/json' })
                res.end(JSON.stringify(products[productIndex]));


            } catch (error) {
                res.writeHead(400, { "content-type": "application/json" });
                res.end({ message: "du lieu khon hop le" })
            }
        })

    }

    else {
        res.writeHead(404, { 'content-type': 'text/plain' });
        res.end('Not found')

    }
});

const POST = 5000;
sever.listen(POST, () => {
    console.log("server dang lang nghe tai htpp://localhost :" + POST);
})
const http = require('http');
const fs = require('fs');

const server = http.createServer(async (req, res) => {
    // : Lấy danh sách tất cả danh mục sản phẩm
    if (req.url === '/categories' && req.method === "GET") {
        try {
            const data = await fs.promises.readFile('categories.json', 'utf8');
            res.writeHead(200, { 'content-type': 'application/json' });
            res.end(data)
        } catch (error) {
            res.writeHead(500, { 'content-type': 'application/json' });
            res.end(JSON.stringify({ message: "loi server" }))
        }
    }
    //: Lấy thông tin chi tiết của một danh mục sản phẩm theo ID
    else if (req.url.startsWith('/categories/') && req.method === "GET") {
        const categoriId = parseInt(req.url.split('/')[2]);
        if (isNaN(categoriId)) {
            res.writeHead(400, { "content-type": "application/json" });
            res.end(JSON.stringify({ message: "du lieu khon hop le" }));
            return;
        }
        try {
            const data = await fs.promises.readFile('categories.json', 'utf8');
            const categories = JSON.parse(data)

            const categoriFind = categories.find(c => {
                return c.id === categoriId;
            });

            if (!categoriFind) {
                res.writeHead(404, { 'content-type': 'application/json' });
                res.end(JSON.stringify({ message: 'khong tim thay danh muc' }));
                return;
            };
            res.writeHead(200, { 'content-type': 'application/json' });
            res.end(JSON.stringify(categoriFind));


        } catch (error) {
            res.writeHead(500, { 'content-type': 'application/json' });
            res.end(JSON.stringify({ message: 'Loi server khi doc file' }));
        }

    }
    //Tạo mới một danh mục sản phẩm 
    else if (req.url === '/categories' && req.method === "POST") {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        })
        req.on('end', async () => {
            try {
                const newCategory = JSON.parse(body);
                const data = await fs.promises.readFile('categories.json', 'utf8');
                const categories = JSON.parse(data);

                newCategory.id = categories.length + 1;

                categories.push(newCategory);
                await fs.promises.writeFile('categories.json', JSON.stringify(categories, null, 2), 'utf8')
                res.writeHead(201, { 'content-type': 'application/json' });
                res.end(JSON.stringify(categories));

            } catch (error) {
                res.writeHead(400, { "content-type": "application/json" });
                res.end({ message: "du lieu khon hop le" })
            }
        })

    }
    // Cập nhật thông tin của một danh mục sản phẩm theo ID     
    else if (req.url.startsWith('/categories/') && req.method === ("PUT")) {
        const categoriId = parseInt(req.url.split('/')[2]);
        if (isNaN(categoriId)) {
            res.writeHead(400, { "content-type": "application/json" });
            res.end(JSON.stringify({ message: "du lieu khon hop le" }));
            return;
        }
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });
        req.on('end', async () => {
            try {
                const updateCategory = JSON.parse(body);
                const data = await fs.promises.readFile('categories.json', 'utf8');
                const categories = JSON.parse(data);

                const categoriIndex = categories.findIndex(c => {
                    return c.id === categoriId;
                });
                if (categoriId === -1) {
                    res.writeHead(400, { "content-type": "application/json" });
                    res.end(JSON.stringify({ message: "du lieu khon hop le" }));
                    return;
                }

                categories[categoriIndex] = { ...categories[categoriIndex], ...updateCategory };
                await fs.promises.writeFile('categories.json', JSON.stringify(categories, null, 2), 'utf8')
                res.writeHead(201, { 'content-type': 'application/json' });
                res.end(JSON.stringify(categories[categoriIndex]));

            } catch (error) {
                res.writeHead(400, { "content-type": "application/json" });
                res.end(JSON.stringify({ message: "Du lieu khong hop le" }));
            }
        })

    }
    else if (req.url.startsWith('/categories') && req.method === "DELETE") {
        const categoriId = parseInt(req.url.split('/')[2]);
        if (isNaN(categoriId)) {
            res.writeHead(400, { "content-type": "application/json" });
            res.end(JSON.stringify({ message: "du lieu khon hop le" }));
            return;
        }
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });
        req.on('end', async () => {
            try {
                const data = await fs.promises.readFile('categories.json', 'utf8');
                const categories = JSON.parse(data);

                const categoriIndex = categories.findIndex(c => {
                    return c.id === categoriId;
                });
                if (categoriIndex === -1) {
                    res.writeHead(400, { "content-type": "application/json" });
                    res.end(JSON.stringify({ message: "du lieu khon hop le" }));
                    return;

                };
                categories.splice(categoriIndex, 1);

                await fs.promises.writeFile('categories.json', JSON.stringify(categories, null, 2), 'utf8');
                res.writeHead(204, { "content-type": "application/json" });
                res.end();
            } catch (error) {
                res.writeHead(400, { "content-type": "application/json" });
                res.end(JSON.stringify({ message: "Du lieu khong hop le" }));
            }
        })
    }

    else {
        res.writeHead(404, { 'content-type': 'application/json' });
        res.end({ message: "loi server" })
    }
});

const POST = 3306;

server.listen(POST, () => {
    console.log(`Server chay tai http://localhost : ${POST}`);
})
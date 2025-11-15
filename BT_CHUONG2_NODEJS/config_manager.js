const fs = require('fs');
let config;
try {
    const data = fs.readFileSync('config.json', 'utf8');
    config = JSON.parse(data);
    console.log("cau hinh ung dung : " + config);
    console.log(data);


} catch (error) {
    console.error('loi doc file cau hinh', error);
    process.exit(1);

}

// thay doi cau hinh 
config.theme = "light"

try {

    fs.writeFileSync('config.json', JSON.stringify(config, null, 2), 'utf8');
    console.log('ghi file thanh cong' + config);
} catch (error) {
    console.error('loi doc file cau hinh', error);
    process.exit(1);

}
// cau 1 dap an B
// cau 2 dap an B 
// cau 3 dap an C 
// cau 4 dap an B
// cau 5 dap an A 
// cau 6 dap an C 
// cau 7 dap an B 
// cau 8 dap an D 

// cau 9 
// cau 10 dap an B 
// cau 11 dap an C
// cau 12 dap an B
// cau 13 dap an B
// cau 14 dap an B 
// cau 15 dap an B 
// cau 16 dap an C 
// cau 17 dap an C 
// cau 18 


const fs = require('fs');

// callback ;
fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.log('loi server' + err);
        return;
    };
    console.log(data);
});

// promise 
const readFileAsync = async () => {
    try {
        const data = await fs.promises.readFile('input.txt', 'utf8');
        console.log(data)
    } catch (error) {
        console.error('loi server :' + error.message)
    }
}
readFileAsync();

// cau 19 
fs.writeFile('output.txt', 'xin chao tat ca moi nguoi','utf8', (err) => {
    if (err) {
        console.log('loi server' + err);
        return;
    };
    console.log("ghi file thanh cong");
});

// promise 
const writeFileAsync = async () => {
    try {
        await fs.promises.writeFile('output1.txt','xin chao 1', 'utf8');
        console.log('ghi file thanh cong')
    } catch (error) {
        console.error('loi server :' + error.message)
    }
}
writeFileAsync();
// cau 20 


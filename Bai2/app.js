const { error } = require("console");
const fs = require("fs");
///

// try{
//     // const data = fs.readFileSync("input.txt" , "utf8");
//     // console.log(data);
//     fs.writeFileSync("output.txt" , "Hello world \n Javascript" ,"utf8")
//     console.log('da ghi xong file')
// }catch(error){
//     console.log("Error : " ,error);
// }

// fs.readFile('input.txt' ,'utf8' , (error  ,data) => {
//     if(error) {
//         console.log("Error" ,error) ;
//         return ;
//     }
//     console.log(data) ;
// })

// fs.writeFile('output.txt' , "Hello world \nJavascript" ,"utf8" , (error) => {
//     if(error) {
//         console.log("Error" ,error) ;
//         return ;
//     }
//     console.log('ghi file thanh cong')
// } )

// fs.promises.readFile('input.txt' ,'utf8')
// .then(data => {
//     console.log(data);
// })
// .catch(error => {
//     console.log(error)
// })

// fs.promises.writeFile('output.txt' ,"Hello world \nJavascript \n Bang" ,"utf8")
// .then(() => {
//     console.log("ghi file thanh cong");
// })
// .catch(error => {
//     console.log(error)
// })

async function readFileAsyncAwait() {
  try {
    const data = await fs.promises.readFile("input.txt", "utf8");
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
readFileAsyncAwait();
console.log("chuong trinh tiep tuc chay ngay lap tuc");

function errorHanldeMiddlewaers (err,req ,res , next) {
    console.error(`Error : ${err.stack}`) ;
    res.status(500).send('loi server vui long thu lai sau !!')
}
module.exports = errorHanldeMiddlewaers ;
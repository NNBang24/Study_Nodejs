const express = require('express') ;
const router = express.Router() ;
// Route: /set
// Mỗi lần truy cập, server sẽ lưu dữ liệu vào session của người dùng
router.get('/set', (req, res) => {

    // Tạo biến đếm số lần người dùng truy cập route này
    req.session.views = (req.session.views || 0) + 1;

    // Lưu object vào session
    req.session.userData = {
        name: 'bang',
        role: 'user'
    };

    // Lưu thêm 1 thông điệp vào session
    req.session.message = "hello session !";

    // Phản hồi cho client biết session đã được lưu thành công
    res.json({
        message: `Session đã được lưu! Views hiện tại: ${req.session.views}`
    });
});

router.get('/get', (req, res) => {
    // kiem tra 
    if (req.session.views) {
        console.log(req.session);
        res.json({ message: 'get session' })
    }
    else {
        res.json({ message: 'no session data . Try / set first .' })
    }

});

router.get('/update', (req, res) => {
    if (req.session.userData) {
        req.session.userData.lastSeen = new Date();
        res.json({ message: ' session  data update !' })
    }
    else {
        res.json({ message: 'no session data . Try / set first .' })
    }
})

// huy 

router.get('/destroy', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                console.error("Error destroy session : ", err);
                return res.status(500).send({ message: "cant not destroy session" })
            }
            res.clearCookie("connect.sid");
            res.json({ message: " Session desrtoy successfuly" });
        }) // huy 
    } else {
        res.json({ message: "no acctive session destroy" })
    }

}); 


module.exports = router 
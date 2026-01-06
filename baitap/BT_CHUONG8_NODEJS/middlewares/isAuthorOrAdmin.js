const {Post} = require('../models') ;

const isAuthorOrAdmin = async ( req , res , next) => {
    try {
        const post = await Post.findByPk(req.params.id) ;
        if(!post) {
            return res.status(404).json({message : 'bai viet khong ton tai'})
        } ;

        // req.post = post
        if(post.userId === req.user.id) {
            return next() ;

        }
        if (req.user.role === 'admin') {
            return next();
        }
        return res.status(403).json({
            message: 'Bạn không có quyền xóa bài viết này'
        });
        
    } catch (error) {
        next(error);
    }
}
module.exports = isAuthorOrAdmin;
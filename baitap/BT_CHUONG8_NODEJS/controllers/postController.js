const {Post,User} = require('../models')

exports.getAllPosts = async(req , res , next) => {
    try {
        const posts = await Post.findAll(
            {
                include : [
                    {
                        model : User ,
                        as : 'user' ,
                        attributes : [ 'id' , 'username']
                    }
                ]
            }
        )
        res.json(posts) ;
    } catch (error) {
        next(error)
    }
}

exports.getPostById = async ( req , res , next) => {
    try {
        const post = await Post.findByPk(req.params.id , 
            {
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['id', 'username']
                    }
                ]
            }
        )
        if(!post) {
            return res.status(404).json({message : 'khong tim thay bai post'})
        }
        res.json(post)
    } catch (error) {
        next(error)
    }
}

exports.createPost = async (req , res , next) => {
    try {
        const {title , content} = req.body
        const newProduct = await Post.create(
            {
                title , 
                content ,
                userId : req.user.id
            }
        )
        res.status(201).json(newProduct) ;
    } catch (error) {
        next(error)
    }
}

exports.updatePost = async (req, res, next) => {
    try {
        const { title, content } = req.body;

        const [updatedRows] = await Post.update(
            { title, content },
            { where: { id: req.params.id } }
        );

        if (updatedRows === 0) {
            return res.status(404).json({
                message: 'bai viet khong ton tai'
            });
        }

        const updatedPost = await Post.findByPk(req.params.id);
        res.json(updatedPost);

    } catch (error) {
        next(error);
    }
};


exports.deletePost = async (req, res, next) => {
    try {
        const deletedRows = await Post.destroy({
            where: { id: req.params.id }
        });

        if (deletedRows === 0) {
            return res.status(404).json({
                message: 'bai viet khong ton tai'
            });
        }

        res.status(204).send();

    } catch (error) {
        next(error);
    }
};

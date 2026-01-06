const authorizeRole = (allowedRoles) => {
    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles] ;

    return (req , res , next) => {
        if(!req.user || !req.user.role) {
            console.error('authorization error') ;
            return res.status(403).json({message : "khong the xac dinh vai tro cua nguoi dung nay "})
        }
        const userRole = req.user.role ;
        if(!roles.includes(userRole)) {
            return res.status(403).json({message : "Ban khong co quyen try cap"});

        }
        next()
    }
}

module.exports = authorizeRole
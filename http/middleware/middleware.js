module.exports = (req, res, next) =>{
    if (req.body.title.length > 40) {
        return res.send({message: "Not 40 !"})
    }
    else if (req.body.author.length > 100) {
        return res.send({message: "Title is not null"})
    }
    else  if (req.body.title.length === 0) {
        return res.send({message: "Fuck title Null"})
    }
    else  if (req.body.author.length === 0) {
        return res.send({message: "Fuck author Null"})
    }
    next();
};
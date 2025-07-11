const handleProfileGet = (req,res,db) => {
    //grab parameter id
    const { id } = req.params;
    db.select('*').from('users').where({id})
    .then(user => {
        if(user.length){
            res.json(user[0]);
        } else {
            res.status(400).json('Not Found')
        } 
    })
    .catch(err => res.status(400).json('Error Getting User!'))
}

module.exports = {
    handleProfileGet: handleProfileGet
}
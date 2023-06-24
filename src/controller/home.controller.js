exports.homeGet =  (req, res) =>{
    try {
        res.status(200).send("Welcome to API")
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
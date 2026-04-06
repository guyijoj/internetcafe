const pool = require("../db")

exports.getCategories = async(req, res) =>{
    try{
        const result = await pool.query(`select * from category;`)
        res.json(result.rows)
    }catch(error){
        console.log(error)
        res.status(500).json({error: error.message})
    }

}
const pool = require('../../db');
const queries = require('./queries');

const getStudents = (req,res)=>{
    pool.query(queries.getStudents,(err,results)=>{
        if(err)throw err;
        else{
            res.status(200).json(results.rows);
        }
    })
}

const getStudentById = (req,res)=>{
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentById,[id],(err,result)=>{
        if(err)throw err;
        else{
            res.status(200).json({
                "status": 200,
                "student_data": result.rows[0]
            });
        }
    });
}

const addStudent = (req,res)=>{
    const {name,email,age,dob} = req.body;
    pool.query(queries.checkEmailExists,[email],(err,result)=>{
        if(result.rows.length){
            res.send("Email Already Exists!");
        }
        else{
            pool.query(queries.addStudent,[name,email,age,dob],(err,result)=>{
                if(err) throw err;
                else{
                    res.status(201).send("Student Created Successfully!");
                }
            })
        }
    })
}


module.exports = {
    getStudents,
    getStudentById,
    addStudent

};
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
            if(!result.rows.length){
                res.send("No Such Student by This ID");
            }
            else{
                res.status(200).json({
                    "status":200,
                     "student_data":result.rows[0]
                })
            }
        }
    })
   
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

const deleteStudent = (req,res)=>{
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentById,[id],(err,result)=>{
        const noStudentFound = !result.rows.length;
        if(noStudentFound) res.send("Student does not Exist in the database , could not remove!");
        else{
            pool.query(queries.deleteStudent,[id],(err,result)=>{
                if(err)throw err;
                else{
                    res.status(200).send("Students Removed Successfully!");
                }
            })
        }
    })
}

const updateStudent = (req,res)=>{
    const id = parseInt(req.params.id);
    const {name} = req.body;
    pool.query(queries.getStudentById,[id],(err,result)=>{
        const noStudentFound = !result.rows.length;
        if(noStudentFound) res.send("Students Doesnot Exist in the database , could not update");
        else{
            pool.query(queries.updateStudent,[name,id],(err,result)=>{
                if(err)throw err;
                else{
                    res.status(200).send("Student Updated Successfully!");
                }
            });
        }
    })
}

module.exports = {
    getStudents,
    getStudentById,
    addStudent,
    deleteStudent,
    updateStudent,
};
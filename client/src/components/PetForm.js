import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { navigate, Link } from '@reach/router';
import { Paper, 
    FormControl, 
    InputLabel, 
    OutlinedInput,
    Button,
    } from '@material-ui/core';

const PetForm = (props) => {
    const [name, setName] = useState("");
    const [type, setType] = useState("")
    const [desc, setDesc] = useState("");
    const [skill1, setSkill1] = useState("");
    const [skill2, setSkill2] = useState("");
    const [errors, setErrors] = useState([]);
    
    const onSubmitHandler = (u, data) => {

        u.preventDefault();
        axios.post('http://localhost:8000/api/pets/new', {
            name, 
            type, 
            desc, 
            skill1, 
            skill2
        })
            .then(() => navigate('/'))
            .catch(err => {
            const errorResponse = err.response.data.errors;
            const errorArr = [];
            for(const key of Object.keys(errorResponse)){
                errorArr.push(errorResponse[key].message);
            }
            setErrors(errorArr);

        },[])

    };
    


    const styles = {
        paper: {
            width: "50rem", padding: "1rem",
            marginLeft:350
        },
        input: {
            marginBottom: "1rem",
            width:"25rem"
        },
        button: {
            width: "100%",
            marginLeft:-400,
        },
        Link: {
            marginRight:10,
            marginTop: 50
        },
        h1:{
            display:"inline-Block"
        }

    }
    return (
        <>
        <h1 style={styles.h1}>Pet Shelter</h1>
        <p><Link to="/" style={styles.Link}>Back to home</Link></p>
        <h2>Know a pet needing a home?</h2>
        <Paper elevation={6} style={styles.paper}>
            <h1>Pet Form</h1>
            <form onSubmit = {onSubmitHandler}>
            {errors.map((err,i) =>{return (<p key={i}>{err}</p>)
            })}
                <FormControl variant="outlined" size="small" style={styles.input} errors="true">
                    <InputLabel >Name: </InputLabel>
                    <OutlinedInput type="text" name="name" 
                    value={name} onChange={(e)=>setName(e.target.value)} color="secondary"/>

                    </FormControl><br/>
                    <FormControl variant="outlined" size="small" style={styles.input} errors="true">
                    <InputLabel>Type: </InputLabel>
                    <OutlinedInput type="text" name="type"
                    value={type} onChange={(e)=> setType(e.target.value)} color="secondary"/>
                    </FormControl><br/>
                    
                    <FormControl variant="outlined" size="small" style={styles.input} errors="true">
                    <InputLabel>Description: </InputLabel>
                    <OutlinedInput type="text" name="desc"
                    value={desc} onChange={(e)=>setDesc(e.target.value)} color="secondary"/>
                    
                    </FormControl><br/>
                    <FormControl variant="outlined" size="small" style={styles.input}>
                    <InputLabel htmlFor={errors}>First Skill: </InputLabel>
                    <OutlinedInput type="text" name="skill1"
                    value={skill1} onChange={(e)=>setSkill1(e.target.value)} color="secondary"/>
                    
                    </FormControl><br/>
                    <FormControl variant="outlined" size="small" style={styles.input}>
                    <InputLabel htmlFor={errors}>Second Skill: </InputLabel>
                    <OutlinedInput type="text" name="skill2"
                    value={skill2} onChange={(e)=>setSkill2(e.target.value)} color="secondary"/>
                    </FormControl><br/>
                <Button type="submit" variant="contained" color="primary">
                    Add Pet
                </Button>
            </form>
        </Paper>
    </>
    )
}
export default PetForm;
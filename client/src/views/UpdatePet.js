import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { navigate, Link } from '@reach/router';
import { Paper, 
    FormControl, 
    OutlinedInput,
    Button, 
    FormHelperText} from '@material-ui/core';

const UpdatePet = (props) => {
    const { id } = props;
    const [name, setName] = useState();
    const [type, setType] = useState();
    const [desc, setDesc] = useState();
    const [skill1, setSkill1] = useState();
    const [skill2, setSkill2] = useState();
    const [pet, setPet] = useState({});
    const [errors, setErrors] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/pets/' + id)
            .then(res => {
                setName(res.data.name);
                setType(res.data.type);
                setDesc(res.data.desc);
                setSkill1(res.data.skill1);
                setSkill2(res.data.skill2);
            })
    }, [])

    const updatePet = (e) => {
        e.preventDefault()
        axios.put('http://localhost:8000/api/pets/' + id + '/edit', {
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
    
    }

    const styles = {
        paper: {
            width: "40rem", padding: "1rem",
            marginLeft:400,
            marginTop: -15
        },
        input: {
            marginBottom: "1rem",
            width:"20rem"
        },
        button: {
            width: "100%"
        },
        h1: {
            display: "inline-block",
            marginTop:50
        },
        p: {
            display:"inline-block",
            marginRight:-220,
            marginLeft:115
        }

    }
    return (
        <>
        <h1 style={styles.h1}>Pet Shelter</h1>
        <p style={styles.p}><Link to="/">Back to home</Link></p>
        <Paper elevation={6} style={styles.paper}>
            <h1>Edit Pet</h1>
            <form onSubmit = {updatePet}>
            {errors.map((err,i) =>{return (<p key={i}>{err}</p>)
            })}
                <FormControl variant="outlined" size="small" style={styles.input} errors="true">
                    <OutlinedInput type="text" name="name"
                    value={name} onChange={(e)=>setName(e.target.value)} color="secondary"/>
                    <FormHelperText>Name</FormHelperText>
                    </FormControl><br/>
                    <FormControl variant="outlined" size="small" style={styles.input} errors="true">
                    
                    <OutlinedInput type="text" name="type"
                    value={type} onChange={(e)=> setType(e.target.value)} color="secondary"/>
                    <FormHelperText>Type</FormHelperText>
                    </FormControl><br/>
                    
                    <FormControl variant="outlined" size="small" style={styles.input} errors="true">
                    <OutlinedInput label="Description" type="text" name="desc"
                    value={desc} onChange={(e)=>setDesc(e.target.value)} color="secondary"/>
                    <FormHelperText>Description</FormHelperText>
                    </FormControl><br/>
                    <FormControl variant="outlined" size="small" style={styles.input}>
            
                    <OutlinedInput type="text" name="skill1"
                    value={skill1} onChange={(e)=>setSkill1(e.target.value)} color="secondary"/>
                    <FormHelperText>Skill 1</FormHelperText>
                    </FormControl><br/>
                    <FormControl variant="outlined" size="small" style={styles.input}>

                    <OutlinedInput type="text" name="skill2"
                    value={skill2} onChange={(e)=>setSkill2(e.target.value)} color="secondary"/>
                    <FormHelperText>Skill 2</FormHelperText>
                    </FormControl><br/>
                <Button type="submit" variant="contained" color="primary">
                &#9999; Edit Pet
                </Button>
            </form>
        </Paper>
    </>
    )
}
export default UpdatePet;
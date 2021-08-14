import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { navigate, Link } from '@reach/router';
import { Button } from '@material-ui/core';
import DeleteButton from './DeleteButton';

const PetList = (props) => {
    const [pet, setPet] = useState();
    const [pets, setPets] = useState();
    const [skill1, setSkill1] = useState("");
    const [skill2, setSkill2] = useState("");

    useEffect(() => {
        axios.get('http://localhost:8000/api/')
        .then(res => setPets(res.data));
    }, [])

    const deletePet = petId => {
        axios.delete('http://localhost:8000/api/' + petId + "/delete")
            .then( res =>{ 
                props.removeFromDom(petId)
        }).catch(errors => { console.log(errors)});
    }
    const styles = {
        h1: {
            display: "inline-block"
        },
        Link: {
            display: "inline-block"
        }
    }
    
    return (
        <>
        <h1 stlye={{display:"inline-block"}}>Pet Shelter</h1>
        <Link stlye={{display:"inline-block"}}  to="/pets/new">add a pet to the shelter</Link>
        <h2>These pets are looking for a good home</h2>
        <table className = "table table-secondary table-bordered" >
        <thead>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Desciption</th>
            <th>Skills</th>
            <th>Likes</th>
            <th>Actions</th>
        </tr>
        </thead>
        {props.pets.sort((pet,i) => (pet.type.toString() > i.type.toString()) ? 1 : -1).map((pet, i) => {
                return (
        <tbody key={i}>
        <tr> 
            <td>{ pet.name }</td> 
            <td>{ pet.type }</td>  
            <td>{ pet.desc }</td>    
            <td>{ pet.skill1 } | { pet.skill2 }</td> 
            <td>{ pet.likes }</td>
            <td><Button><Link style={{textDecoration:"none", color:"black"}} 
            to={"/pets/" + pet._id}
            >Details</Link></Button> | <Button><Link style={{textDecoration:"none", color:"black"}} 
            to={"/pets/" + pet._id + "/edit"}
            >Edit</Link></Button></td>
        </tr>
        </tbody>
        )})}
    </table>
    </>
    )
} 
export default PetList;
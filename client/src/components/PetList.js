import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { navigate, Link } from '@reach/router';
import { Button } from '@material-ui/core';
import io from 'socket.io-client';


const PetList = (props) => {
    const [pets, setPets] = useState();
    const [skill1, setSkill1] = useState("");
    const [skill2, setSkill2] = useState("");
    const [skill3, setSkill3] = useState("");
    const [ socket ] = useState(() => io(":8000") );
    

    useEffect(() =>{
        console.log("inside of useEffect for socktes");

         //listen useing the .on()
        socket.on("connect", () => {
            console.log("We are connected with the server on: " + socket.id);
        });


        socket.on("pet_deleted", (data) => {

            console.log(data);
            console.log("Previous pets state: ");
            console.log(pets);
            setPets((previousPetsValue) => {
                console.log("Inside setPets: " + previousPetsValue);
                return [...previousPetsValue, data];
            });
        });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8000/api/')
        .then(res => setPets(res.data));
    }, [])

    const styles = {
        h1: {
            marginRight:1200
        },
        h2: {
            display:"inline-block"

        },
        Link: {
            display: "inline-block",
            marginLeft: 658
        }
    }
    
    return (
        <>
        <h1 style={styles.h1}>Pet Shelter</h1>
        <h2 style={styles.h2}>These pets are looking for a good home:</h2>
        <Link style={styles.Link}  to="/pets/new">add a pet to the shelter</Link>
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
        {props.pets.sort((pet,i) => (pet.type.toLowerCase() > i.type.toLowerCase()) ? 1 : -1).map((pet, i) => {
                return (
        <tbody key={i}>
        <tr> 
            <td>{ pet.name }</td> 
            <td>{ pet.type }</td>  
            <td>{ pet.desc }</td>    
            <td>{ pet.skill1 } | { pet.skill2 } | { pet.skill3 }</td> 
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
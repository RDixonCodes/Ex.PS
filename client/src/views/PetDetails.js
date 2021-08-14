import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import { Paper } from '@material-ui/core';
import { Button } from 'reactstrap';
import DeleteButton from '../components/DeleteButton';

const Detail = (props) => {
    const {petId} = props; 
    const [pet, setPet] = useState({});
    const [likes, setLikes] = useState(0);
    const [errors, setErrors] = useState();

    const displayPet = () => {
        axios.get("http://localhost:8000/api/pets/" + props.id)
        .then(res => {setPet(res.data) })
        .catch(err => {console.log(err)});
    }

    useEffect(() => {
        displayPet();
    }, [props._id])
    
    // const{ removeFromDom } = props;
    const deletePet = petId => {
        axios.delete('http://localhost:8000/api/pets' + petId + "/delete")
            .then( res =>{ 
                props.removeFromDom(petId)
        }).catch(errors => { console.log(errors)});
    }

    const like = _id => {
        axios.put("http://localhost:8000/api/like/" + pet._id, { likes })
        .then(res => { displayPet() })
        .catch(err => console.log(err));
        document.getElementById('like_button').setAttribute("disabled", "disabled");
    }

    const styles = {
        paper: {
            width: "50rem", padding: "1rem",
            marginLeft:320,
            marginTop:10
        },
        h1: {
            display:"inline-block",
            marginRight:510
        },
        h2: {
            display:"inline-block",
            marginRight:410
        },
    }
    return (
        <div>
            <h1 style={styles.h1}>Pet Shelter</h1> <Link to="/">back to home</Link>
            <h2 style={styles.h2}>Details about: {pet.name} </h2>
            <DeleteButton petId={pet._id} successCallback= {() => navigate("/")}></DeleteButton>
            <Paper elevation={6} style={styles.paper}>
            <h2>Pet type: <strong>{pet.type}</strong></h2>
            <p>Pet Description: <strong>{pet.desc}</strong></p>
            <p>Pet Skills: <strong>{pet.skill1} | {pet.skill2}</strong></p>

            <Button id="like_button" disabled={likes} color="success"
            onClick= { e => { like(pet._id)}}>
                &#128077; Like {pet.name}</Button> 
                <p>{pet.likes} like(s)</p>
            </Paper>
        </div>
    )
}

export default Detail;
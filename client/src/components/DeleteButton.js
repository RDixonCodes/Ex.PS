import React, {useState} from 'react'
import axios from 'axios';
import { Button } from 'reactstrap';

const DeleteButton = (props) => {
    const { petId, successCallback } = props;
    const [pet, setPet] = useState({});
    const [errors, setErrors] = useState();

    const deletePet = e => {
        axios.delete('http://localhost:8000/api/pets/' + petId + "/delete")
            .then( res =>{ 
                alert("Congratulations on your newly adopted pet!")
                successCallback();
        }).catch(errors => { console.log(errors)});
    }

    return (
        <Button onClick={deletePet} color="danger">
        &#127968; Adopt
        </Button>
    )
}
export default DeleteButton;
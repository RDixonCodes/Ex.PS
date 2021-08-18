import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Button } from 'reactstrap';
import io from 'socket.io-client';

const DeleteButton = (props) => {
    const { petId, successCallback } = props;
    const [pet, setPet] = useState({});
    // sockets wont use a setter.
    const [ socket ] = useState(() => io(":8000") );
    const [errors, setErrors] = useState();

    useEffect(() =>{
        console.log("inside of useEffect for socktes");

         //listen useing the .on()
        socket.on("connect", () => {
            console.log("We are connected with the server on: " + socket.id);
        });


        socket.on("pet_deleted", (data) => {
            
            console.log(data);
        })
    }, [])


    const deletePet = e => {
        axios.delete('http://localhost:8000/api/pets/' + petId + "/delete")
            .then( res =>{ 
                alert("Congratulations on your newly adopted pet!")
                //tell server we deleted a pet
                socket.emit("deleted_pet", res.data);
                //clean up after yourself. Don't leave socket connected.
                socket.disconnect();
            
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
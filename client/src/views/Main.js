import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from '@reach/router';
import PetList from '../components/PetList';

const Main = () => {
    const [pets, setPets] = useState();
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        axios.get('http://localhost:8000/api')
        .then(res => {
            setPets(res.data);
            setLoaded(true);
        });
    }, [pets])

    const removeFromDom = petId => {
        setPets(pets.filter(pet => pet._id!== petId));
    }

    const styles = {
        p:{
            marginRight:1280,
            fontSize:"larger"
        },
        h2: {
            marginRight:870
        }
    }
    return (
        <div>
            { loaded && <PetList pets={pets} removeFromDom={removeFromDom}/>}
        </div>
    )
}
export default Main;
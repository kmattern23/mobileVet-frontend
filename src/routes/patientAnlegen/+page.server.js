import {backend_url} from '$env/static/private';
import fetch from 'node-fetch';

const base = backend_url;

// laden der owner

export const load = async() =>{

    const fetchOwner = async() =>{
        const result = await fetch(`${base}/owner/getAll`);
        const data = await result.json();
        return data;
    }

    const ownerData = await fetchOwner();

    // consolen ausgabe
   console.log('loadedData:' , {owner : ownerData});

    return{
        owner: ownerData,
    }
}
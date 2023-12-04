import  axios  from 'axios';

export default function Request(){

    const req = 
    axios.create({
        baseURL: (`http://172.20.10.8:5000`),
         headers: {

            "Content-Type": "application/json"
         } 
       
    })
    return req;
} 

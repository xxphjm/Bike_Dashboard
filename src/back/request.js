import  axios  from 'axios';

export default function Request(url){
    
    const req = 
    axios.create({
        baseURL: (`http://${url}:5000`),
         headers: {

            "Content-Type": "application/json"
         } 
       
    })
    return req;
} 

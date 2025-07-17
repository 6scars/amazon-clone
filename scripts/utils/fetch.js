export async function UserVeryficationToken(){
    try{
        const token = localStorage.getItem('jwt');
        const respond = await fetch('http://localhost:3000/veryfication-token',{
            method:'GET',
            headers:{
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        
        if(!respond.ok){
            console.warn('Token is not valid or server error')
        }

        return respond.ok;
    }catch(err){
        console.log('authorization Token error:',err);
    }

}
UserVeryficationToken();
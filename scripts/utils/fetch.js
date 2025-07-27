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
        const data = await respond.json();
        console.log(data)
        return data;
    }catch(err){
        console.log('authorization Token error:',err);
    }

}

export async function takeUserData() {
    try {
        const respond = await fetch('http://localhost:3000/userData', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        });

        if (!respond.ok) {
            const errorData = await respond.json();
            throw new Error(errorData.message || 'takeUserData fetch error');
        }

        const data = await respond.json();
        return data.user
    } catch (err) {
        console.error('takingUserData failed',err);
    }
}

export async function takeUserCart(){
    try{   
        const response = await fetch('http://localhost:3000/userDataCart',{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        const data = await response.json();
        return data;
    }catch(err){
        console.log('error takeUserData',err);
    }
}
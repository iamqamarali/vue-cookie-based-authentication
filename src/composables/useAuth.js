import { ref } from 'vue'

const user = ref(null)

export default () => {

    const checkAuth = async () => {
        if(user.value){
            return true
        }

        try{
            let res = await fetch('/api/user', {
                method: 'GET',
                credentials: 'include' // this sends our session cookie with the request
            })
            const data = await res.json()

            // if user is returned, it means that the cookie is valid,
            //  and we are logged in
            if(data.user){
                // set the user for later use
                user.value = data.user
                return true
            }            
        }catch(err){
            // do nothing
        }

        // if we get here, it means we are not logged in
        user.value = null;
        return false;
    }

        

    return {
        user,
        checkAuth
    }
}
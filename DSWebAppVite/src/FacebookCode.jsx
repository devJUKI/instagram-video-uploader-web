import { useEffect, } from 'react';
import axios from 'axios'

function FacebookCode() {
    useEffect(() => {
        async function GetToken() {
            const queryParams = new URLSearchParams(location.search);
            if (queryParams.has('code')) {
                let code = queryParams.get('code')
                let response = await axios.post('https://graph.facebook.com/v15.0/oauth/access_token?client_id=483341770598169&redirect_uri=https://localhost:5173/facebook-token/&client_secret=656b89799d8db8fa7eb4d18d6f8bf587&code=' + code)
                localStorage.setItem('fb_token', response.data['access_token'])
                window.location.href = '/';
            }
        }
        GetToken()
    }, []);
    return null;
}

export default FacebookCode
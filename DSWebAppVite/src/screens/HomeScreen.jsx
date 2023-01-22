import { React, useState, useRef } from 'react'
import { useEffect } from 'react';
import axios from 'axios'

function HomeScreen() {
    const [data, setData] = useState([])
    const [btnName, setName] = useState('Login to Facebook')
    const tiktokUrlRef = useRef()
    const [infoMessage, setInfoMessage] = useState('')

    useEffect(() => {
        if (localStorage.getItem('fb_token') != null) {
            setName('Logged in')
        }
    }, [])

    async function fetchData() {
        setInfoMessage('Getting TikTok without watermark...')
        let tiktok_url = tiktokUrlRef.current.value
        const resVideo = await axios.get('http://localhost:8000/get-tiktok-without-watermark?tiktok_url=' + tiktok_url);
        setData(resVideo.data['message']);
        console.log(resVideo.data['message'])
        setInfoMessage('Uploading video without watermark to Instagram...')
        const resUpload = await axios.get('http://localhost:8000/upload-tiktok?tiktok_url=' + resVideo.data['message'] + '&access_token=' + localStorage.getItem('fb_token'))
        console.log(resUpload.data['message'])
        setInfoMessage('Video uploaded!')
    }

    return (
        <div className='homeScreen'>
            <div>
                <a
                    href='https://www.facebook.com/v15.0/dialog/oauth?client_id=XXXXXXX&scope=ads_management,business_management,instagram_basic,instagram_content_publish,pages_read_engagement&redirect_uri=https://localhost:5173/facebook-token/'
                >{btnName}</a>
            </div>
            <input ref={tiktokUrlRef} type='text' />
            <div>
                <button onClick={fetchData}>Upload</button>
            </div>
            <div>
                Status: {infoMessage}
            </div>
        </div>
    )
}

export default HomeScreen

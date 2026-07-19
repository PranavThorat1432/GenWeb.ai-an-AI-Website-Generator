import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { serverUrl } from "../App";
import axios from "axios";

const LiveSite = () => {

    const {id} = useParams();

    const [html, setHTML] = useState('');
    const [err, setErr] = useState('');

    useEffect(() => {
        const handleGetWebsite = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/website/get-slug/${id}`, {
                    withCredentials: true
                });
                setHTML(result.data.latestCode);

            } catch (error) {
                console.log(error);
                setErr(error.response.data.message || 'Site not found!')
            }
        };

        handleGetWebsite();
    }, [id]);
    
    if(err) {
        return (
            <div className="h-screen flex items-center justify-center bg-black text-white">
                {err}
            </div>
        )
    }

  return (
    <iframe title='Live Site' srcDoc={html} className="h-screen w-screen border-none" sandbox='allow-scripts allow-same-origin allow-forms allow-popups'/>
  )
}

export default LiveSite

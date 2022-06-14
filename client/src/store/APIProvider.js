import React from 'react'
import APIContext from "./APIContext"



const APIProvider =  (props) => {

    //set api url based on current url 
    var url = ""
    console.log(window.location.href)
    if (window.location.href.includes("localhost")) {
        url = "http://localhost:3001"
    } else {//will be production
        url = "https://colorsappraheema.herokuapp.com"
    }


    //get authorization token 
    var options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: '{"client_id":"LbCNbwpfuTKNvUOOOTRXNdF3RMRz6Hf3","client_secret":"omHXxXQ5qxeK4LY8jFrX9_YoibC6OOACKsjx2vApMlAw4gYUgR8pM1XSG4BlYbu2","audience":"https://colorsappraheema.herokuapp.com/","grant_type":"client_credentials"}'
    };

    var authorizationToken=""
    fetch("https://dev-nze5vfxy.us.auth0.com/oauth/token", options)
    .then ((res)=>res.json())    
    .then ((res)=>{authorizationToken = res.access_token; })
            

    const apiContext = {
        api_url: url,
        authorization: `Bearer ${authorizationToken}`
    }

    return (
        <APIContext.Provider value={apiContext}>
            {props.children}
        </APIContext.Provider>
    )
}

export default APIProvider;
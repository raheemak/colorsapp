import React from 'react'
import APIContext from "./APIContext"



const APIProvider = (props) => {

    //set api url based on current url 
    var url = ""
    console.log (window.location.href)
    if (window.location.href.includes ("localhost")){
        url = "http://localhost:3001"
    }else {//will be production
        url = "https://colorsappraheema.herokuapp.com"
    }

    const apiContext = {
        api_url: url ,
        authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjZ3TTZRV2w5dHVLM3pLcGFWLWNXNiJ9.eyJpc3MiOiJodHRwczovL2Rldi1uemU1dmZ4eS51cy5hdXRoMC5jb20vIiwic3ViIjoiTGJDTmJ3cGZ1VEtOdlVPT09UUlhOZEYzUk1SejZIZjNAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vY29sb3JzYXBwcmFoZWVtYS5oZXJva3VhcHAuY29tLyIsImlhdCI6MTY1NTA4MDE1MSwiZXhwIjoxNjU1MTY2NTUxLCJhenAiOiJMYkNOYndwZnVUS052VU9PT1RSWE5kRjNSTVJ6NkhmMyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.SQyWdRhREVBr3TH33ikIKghXE81xGf9bDPmS7Bd4m9LiSWUCR9TI2N1i6Xq3JL6jdTcoQn0gEq092N7PRMqJXQutg5KZrsOVobXv49qMoW-_7lHPEWQnTZHgtHvHzXy2eUKmm5WhtbyAGZep_ic3DwVk_slXXC_2nFa4J7NZitGJ-8VItGwbICEjMnYaDe6qzicnpinduX8kn6UznajMWoOsnOUm8b7VIUBB4mTVWPQIfU3YnS8qQ5-tDFwb0jdIUHyeE_2H1Y1U3YH_Yr7Kwd-747nOSUOoeThv1ZNwYi8t330NUUKHLall8rhPuvKZgmRSwxmNwwS2l73DuT4T3w'

    }

    return (
        <APIContext.Provider value={apiContext}>
            {props.children}
        </APIContext.Provider>
    )
}

export default APIProvider;
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
        authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjZ3TTZRV2w5dHVLM3pLcGFWLWNXNiJ9.eyJpc3MiOiJodHRwczovL2Rldi1uemU1dmZ4eS51cy5hdXRoMC5jb20vIiwic3ViIjoiTGJDTmJ3cGZ1VEtOdlVPT09UUlhOZEYzUk1SejZIZjNAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vY29sb3JzYXBwcmFoZWVtYS5oZXJva3VhcHAuY29tLyIsImlhdCI6MTY1NTE3NDY4MiwiZXhwIjoxNjU1MjYxMDgyLCJhenAiOiJMYkNOYndwZnVUS052VU9PT1RSWE5kRjNSTVJ6NkhmMyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.A5W0aI1Mjy8CLPDTEkbZVWM5clKatjVtpjzHGSm8B16LWU2tqyHRredI67QW9oc_4bfQiDm9tJiBAR0BaMHCEmPros2ftcV2Cd9DMLE9bqOF2e75uyH-0v6jAMx18KZISrZhXfz-m2OV4hn_tjcic26s1WKUcellTuf5M2gDmhkpJw0RgylITpKCo3sZFIsGnj2UbnzRzxEbJZATbaLOQrCowVqmKNoFLiF9HajiaISQcDme3ICHkKS8Zl1uVzlnKl1V7-q4kkrpdR-2i4BTzpM_nZHBDD_qvfX11L6SdZXo1d-7Ms9YxV1L2sqrAb6lH8nxvTNla8B99nHmH7AN8g"'

    }

    return (
        <APIContext.Provider value={apiContext}>
            {props.children}
        </APIContext.Provider>
    )
}

export default APIProvider;
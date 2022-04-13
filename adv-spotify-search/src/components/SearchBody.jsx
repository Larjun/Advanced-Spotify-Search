import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Container, Form } from "react-bootstrap"
import SpotifyWebApi from 'spotify-web-api-node'

const clientId = 'd677f29341d8486f90c37f08fe86a25e'
const spotifyApi = new SpotifyWebApi({
    clientId: clientId
})
export default function SearchBody() {
    const getSongURL = 'https://api.spotify.com/v1/search/?type=track&q='
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState("")
    const token = window.location.hash.substring(1).split("&")[0].split('=')[1];

    useEffect(() => {
        if(!token) return
        else spotifyApi.setAccessToken(token)
        //console.log(token)
        //console.log(clientId)
    }, [token])

    useEffect(() => {
        if(!search) return setSearchResults([])
         else if(!token) return
        //console.log(searchResults)
        else {
            
            spotifyApi.searchTracks(search).then(res => {
                console.log(res.body.tracks.items)
            })
        }
    }, [search, token])

    return (
        <Container>
                <Form.Control 
                type="search"
                placeholder="Search Songs"
                value={search}
                onChange={e => setSearch(e.target.value)}
                /> 

                <div>
                    Songs
                </div>
        </Container>
    )
}

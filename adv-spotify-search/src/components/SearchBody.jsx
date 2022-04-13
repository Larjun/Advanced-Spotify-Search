import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Container, Form } from 'react-bootstrap'
import SpotifyWebApi from 'spotify-web-api-node'
import TrackSearchResult from './TrackSearchResult'


const clientId = 'd677f29341d8486f90c37f08fe86a25e'
const spotifyApi = new SpotifyWebApi({
    clientId: clientId
})
export default function SearchBody() {
    const getSongURL = 'https://api.spotify.com/v1/search/?type=track&q='
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const token = window.location.hash.substring(1).split("&")[0].split('=')[1];

    useEffect(() => {
        if(!token) return
        else spotifyApi.setAccessToken(token)
        //console.log(token)
        //console.log(clientId)
    }, [token])

    useEffect(() => {
        if (!search) return setSearchResults([])
        if (!token) return
    
        let cancel = false
        spotifyApi.searchTracks(search).then(res => {
          if (cancel) return
          setSearchResults(
            res.body.tracks.items.map(track => {
              const smallestAlbumImage = track.album.images.reduce(
                (smallest, image) => {
                  if (image.height < smallest.height) return image
                  return smallest
                },
                track.album.images[0]
              )
    
              return {
                artist: track.artists[0].name,
                title: track.name,
                uri: track.uri,
                albumUrl: smallestAlbumImage.url,
              }
            })
          )
        })
        //console.log(searchResults)
        return () => (cancel = true)
      }, [search, token])

    return (
        <Container className="d-flex flex-column py-2" style = {{height: "100vh"}}>
                <Form.Control 
                type="search"
                placeholder="Search Songs"
                value={search}
                onChange={e => setSearch(e.target.value)}
                /> 

                <div className="flex-grow-1 my-2" style={{overflowY: "auto", color:"white"}}>
                    {searchResults.map(track => (
                        <TrackSearchResult track={track} key={track.uri} />

                    ))}
                </div>
        </Container>
    )
}

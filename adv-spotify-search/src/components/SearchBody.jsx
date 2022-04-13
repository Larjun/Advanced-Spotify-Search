import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Container, Form, Row, Col} from 'react-bootstrap'
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
    const [selectedTrack, setSelectedTrack] = useState([])
    const [audioFeatures, setAudioFeatures] = useState([])
    const token = window.location.hash.substring(1).split("&")[0].split('=')[1];

    function chooseTrack(track) {
      //setSelectedTrack(track)
      
      spotifyApi.getTrack(track.id).then(res => {
        console.log(res)
        setSelectedTrack(
          /*res.body.map(track => {
            const biggestAlbumUimage = track.album.images.reduce(
              (biggest, image) => {
                if (image.height > biggest.height) return image
                return biggest
              },
              track.album.images[0]
            )

            return {
              artist: track.artists[0].name,
              title: track.name,
              uri: track.uri,
              albumUrl: biggestAlbumUimage.url,
              id: track.id
            }
          })*/
          res.body
        )
      })
      spotifyApi.getAudioFeaturesForTrack(track.id).then(res => {
        console.log(res)
        setAudioFeatures(
          /*res.body.map(track=> {
            return{
              acousticness: track.acousticness,
              danceability: track.danceability,
              energy: track.energy,
              instrumentalness: track.instrumentalness,
              liveness: track.liveness,
              loudness: track.loudness,
              speechiness: track.speechiness,
              valence: track.valence
            }
          })*/
          res.body
        )
      })

      setSearch('')
    }

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
          //console.log(res)
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
                id: track.id
              }
            })
          )
        })
        //console.log(searchResults)
        return () => (cancel = true)
      }, [search, token])

    return (
        <Container className="d-flex flex-column py-2" style={{height: "100vh"}}>

          <Row className="py-2">
            <Form.Control type="search" placeholder="Search Songs" value={search} onChange={e=>
              setSearch(e.target.value)}
              />
          </Row>
          <Row>
            <Col xs={12} md={8}>


            <div className="flex-grow-1 my-2" style={{overflowY: "auto", color:"white"}}>
              {searchResults.map(track => (
              <TrackSearchResult track={track} key={track.uri} chooseTrack={chooseTrack} />

              ))}
            </div>
            </Col>
            <Col xs={6} md={4} style={{color: "white"}} className="py-3">
              {/* UI For Song Stats Goes Here*/}
                
              <h3>{selectedTrack.name}</h3>
              <h4>{audioFeatures.acousticness}</h4>
            </Col>
          </Row>
        </Container>
    )
}

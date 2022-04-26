import React from 'react'
import styleds from 'styled-components'
import axios from 'axios'
import spotifyWebApi from 'spotify-web-api-node'

const clientId = 'd677f29341d8486f90c37f08fe86a25e'
const spotifyApi = new spotifyWebApi({
    clientId: clientId
})

const AdvSearch = () => {
  const navToSearch = () => {

  }

  const spotifyToken = window.location.hash.substring(1).split("&")[0].split('=')[1]
  spotifyApi.setAccessToken(spotifyToken)

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function generateQuery(length) {
    var result = ""
    var characters = "abcdefghijklmnopqrstuvwxyz"
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  }
  
  async function generateSongList(
                                acousL = 0, acousH = 1, 
                                danceL = 0, danceH = 1, 
                                enL = 0, enH = 1, instL = 0, 
                                instH = 1, liveL = 0, liveH = 1, 
                                speechL = 0, speechH = 1, 
                                valL = 0, valH = 1, 
                                length = 10) {
    var count = 0;
    var trackList = [];

    while(trackList.length < length) {
      var searchQuery = generateQuery(2)
      //console.log(searchQuery)
      spotifyApi.searchTracks(searchQuery).then(res => {
        var id = res.body.tracks.items[0].id
        //console.log(trackList.length)
        spotifyApi.getAudioFeaturesForTrack(id).then(features => {
          var song = features.body
          if(song.acousticness > acousL && 
          song.acousticness <= acousH && 
          song.danceability > danceL && 
          song.danceability <= danceH && 
          song.energy > enL && 
          song.energy <= enH &&
          song.instrumentalness > instL && 
          song.instrumentalness <= instH &&
          song.liveness > liveL &&
          song.liveness <= liveH &&
          song.speechiness > speechL &&
          song.speechiness <= speechH &&
          song.valence > valL &&
          song.valence <= valH 
          ) {
            if(!trackList.includes(id)) {
              console.log(trackList.length)
              trackList.push(id)
              console.log("ID: " + id + ", Danceablity: " + song.danceability + ", Energy: " + song.energy)
            }
        }
        }).catch(error => {
          //console.log(error)
        })
      }).catch(function(err) {
        //console.log(err)
      })
      await sleep(50);
    }
    return trackList
  }


  function callSearch() {
      console.log('post request attempted')
      var danceL = 0.4
      var danceH = 0.6
      var eneL = 0.4
      var eneH = 0.9
      const searchTrack = new Promise((resolve, reject) => {
        var trackList = generateSongList(
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          10
        )
        resolve(trackList)
      }) 
      
      searchTrack.then((trackList) => {
        var playlistId
        var playlistLink
        var newTrackList = []
        for (let i = 0; i < trackList.length; i++) {
          newTrackList.push("spotify:track:" + trackList[i])
        }
        console.log(newTrackList)

          spotifyApi.createPlaylist('Playist Made In Adv Search', {'description' : 'Made in advance spotify search', 'public': true}).then((playlist) => {
            playlistId = playlist.body.id;
            playlistLink = playlist.body.external_urls.spotify
            spotifyApi.addTracksToPlaylist(playlistId, newTrackList).then((tracks) => {
              console.log("Added tracks to playlist: " + playlistLink)
              axios.post('http://localhost:3001/addPlaylist', {
                playlistId: playlistId,
                playlistLink: playlistLink
              }).then((response) => {
                console.log("Post is made successfully")
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
            }).catch((error) => {
              console.log(error)
            })
          }).catch((err) => {
            console.log(err)
          })
          
        })
  }

  return (
    <div>AdvSearch</div>
  )
}

export default AdvSearch
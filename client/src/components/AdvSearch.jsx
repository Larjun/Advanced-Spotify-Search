import React from 'react'
import axios from 'axios'
import spotifyWebApi from 'spotify-web-api-node'
import styled from "styled-components";
import { useRanger } from "react-ranger";

const clientId = 'd677f29341d8486f90c37f08fe86a25e'
const spotifyApi = new spotifyWebApi({
    clientId: clientId
})


export const Track = styled("div")`
  display: inline-block;
  height: 7px;
  width: 80%;
  margin: 0 5%;
  z-index: 1;
`;

export const Tick = styled("div")`
  :before {
    content: "";
    position: absolute;
    left: 0;
    background: rgba(0, 0, 0, 0.2);
    height: 5px;
    width: 2px;
    transform: translate(-50%, 0.7rem);
  }
`;

export const TickLabel = styled("div")`
  position: absolute;
  font-size: 0.6rem;
  color: lightgray;
  top: 100%;
  transform: translate(-50%, 1.2rem);
  white-space: nowrap;
`;

export const Segment = styled("div")`
  background: ${props =>
    props.index === 0
    ? "white"
    : props.index === 1
    ? "#1ed760"
    : "white"};
  height: 100%;
`;

export const Handle = styled("div")`
  background: #1db954;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 100%;
  font-size: 0.7rem;
  white-space: nowrap;
  color: white;
  font-weight: ${props => (props.active ? "bold" : "normal")};
  transform: ${props =>
    props.active ? "translateY(-100%) scale(1.3)" : "translateY(0) scale(0.9)"};
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
`;

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

          spotifyApi.createPlaylist('Playlist Made In Adv Search', {'description' : 'Made in advance spotify search', 'public': true}).then((playlist) => {
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

  const [values0, setValues0] = React.useState([20, 80]);

  const [values1, setValues1] = React.useState([10, 90]);

  const [values2, setValues2] = React.useState([20, 80]);

  const [values3, setValues3] = React.useState([10, 90]);

  const [values4, setValues4] = React.useState([20, 80]);

  const [values5, setValues5] = React.useState([10, 90]);

  const [values6, setValues6] = React.useState([20, 80]);

  const { getTrackProps, ticks, segments, handles } = useRanger({
    min: 0,
    max: 100,
    stepSize: 1,
    values: values0,
    onChange: setValues0
  });

  const { getTrackProps: getTrackProps1, ticks: ticks1, segments: segments1, handles: handles1 } = useRanger({
    min: 0,
    max: 100,
    stepSize: 1,
    values: values1,
    onChange: setValues1
  });

  const { getTrackProps: getTrackProps2, ticks: ticks2, segments: segments2, handles: handles2 } = useRanger({
    min: 0,
    max: 100,
    stepSize: 1,
    values: values2,
    onChange: setValues2
  });

  const { getTrackProps: getTrackProps3, ticks: ticks3, segments: segments3, handles: handles3 } = useRanger({
    min: 0,
    max: 100,
    stepSize: 1,
    values: values3,
    onChange: setValues3
  });

  const { getTrackProps: getTrackProps4, ticks: ticks4, segments: segments4, handles: handles4 } = useRanger({
    min: 0,
    max: 100,
    stepSize: 1,
    values: values4,
    onChange: setValues4
  });

  const { getTrackProps: getTrackProps5, ticks: ticks5, segments: segments5, handles: handles5 } = useRanger({
    min: 0,
    max: 100,
    stepSize: 1,
    values: values5,
    onChange: setValues5
  });

  const { getTrackProps: getTrackProps6, ticks: ticks6, segments: segments6, handles: handles6 } = useRanger({
    min: 0,
    max: 100,
    stepSize: 1,
    values: values6,
    onChange: setValues6
  });

  return (
    <Container>
      <h1>Advanced Search</h1>
      <p>Create playlists based on song characteristics</p>
      <br />
      <br />
      <h2> Acousticness </h2>
      <Track {...getTrackProps()}>
        {ticks.map(({ value, getTickProps }) => (
          <Tick {...getTickProps()}>
            <TickLabel>{value}</TickLabel>
          </Tick>
        ))}
        {segments.map(({ getSegmentProps }, i) => (
          <Segment {...getSegmentProps()} index={i} />
        ))}
        {handles.map(({ value, active, getHandleProps }) => (
          <button
            {...getHandleProps({
              style: {
                appearance: "none",
                border: "none",
                background: "transparent",
                outline: "none"
              }
            })}
          >
            <Handle active={active}>{value}</Handle>
          </button>
        ))}
      </Track>
      <br />
      <br />
      <br />
      <h2> Danceability </h2>
      <Track {...getTrackProps1()}>
        {ticks1.map(({ value, getTickProps }) => (
          <Tick {...getTickProps()}>
            <TickLabel>{value}</TickLabel>
          </Tick>
        ))}
        {segments1.map(({ getSegmentProps }, i) => (
          <Segment {...getSegmentProps()} index={i} />
        ))}
        {handles1.map(({ value, active, getHandleProps }) => (
          <button
            {...getHandleProps({
              style: {
                appearance: "none",
                border: "none",
                background: "transparent",
                outline: "none"
              }
            })}
          >
            <Handle active={active}>{value}</Handle>
          </button>
        ))}
      </Track>
      <br />
      <br />
      <br />
      <h2> Energy </h2>
      <Track {...getTrackProps2()}>
        {ticks2.map(({ value, getTickProps }) => (
          <Tick {...getTickProps()}>
            <TickLabel>{value}</TickLabel>
          </Tick>
        ))}
        {segments2.map(({ getSegmentProps }, i) => (
          <Segment {...getSegmentProps()} index={i} />
        ))}
        {handles2.map(({ value, active, getHandleProps }) => (
          <button
            {...getHandleProps({
              style: {
                appearance: "none",
                border: "none",
                background: "transparent",
                outline: "none"
              }
            })}
          >
            <Handle active={active}>{value}</Handle>
          </button>
        ))}
      </Track>
      <br />
      <br />
      <br />
      <h2> Instrumentalness </h2>
      <Track {...getTrackProps3()}>
        {ticks3.map(({ value, getTickProps }) => (
          <Tick {...getTickProps()}>
            <TickLabel>{value}</TickLabel>
          </Tick>
        ))}
        {segments3.map(({ getSegmentProps }, i) => (
          <Segment {...getSegmentProps()} index={i} />
        ))}
        {handles3.map(({ value, active, getHandleProps }) => (
          <button
            {...getHandleProps({
              style: {
                appearance: "none",
                border: "none",
                background: "transparent",
                outline: "none"
              }
            })}
          >
            <Handle active={active}>{value}</Handle>
          </button>
        ))}
      </Track>
      <br />
      <br />
      <br />
      <h2> Liveness </h2>
      <Track {...getTrackProps4()}>
        {ticks4.map(({ value, getTickProps }) => (
          <Tick {...getTickProps()}>
            <TickLabel>{value}</TickLabel>
          </Tick>
        ))}
        {segments4.map(({ getSegmentProps }, i) => (
          <Segment {...getSegmentProps()} index={i} />
        ))}
        {handles4.map(({ value, active, getHandleProps }) => (
          <button
            {...getHandleProps({
              style: {
                appearance: "none",
                border: "none",
                background: "transparent",
                outline: "none"
              }
            })}
          >
            <Handle active={active}>{value}</Handle>
          </button>
        ))}
      </Track>
      <br />
      <br />
      <br />
      <h2> Speechiness </h2>
      <Track {...getTrackProps5()}>
        {ticks5.map(({ value, getTickProps }) => (
          <Tick {...getTickProps()}>
            <TickLabel>{value}</TickLabel>
          </Tick>
        ))}
        {segments5.map(({ getSegmentProps }, i) => (
          <Segment {...getSegmentProps()} index={i} />
        ))}
        {handles5.map(({ value, active, getHandleProps }) => (
          <button
            {...getHandleProps({
              style: {
                appearance: "none",
                border: "none",
                background: "transparent",
                outline: "none"
              }
            })}
          >
            <Handle active={active}>{value}</Handle>
          </button>
        ))}
      </Track>
      <br />
      <br />
      <br />
      <h2> Valence </h2>
      <Track {...getTrackProps6()}>
        {ticks6.map(({ value, getTickProps }) => (
          <Tick {...getTickProps()}>
            <TickLabel>{value}</TickLabel>
          </Tick>
        ))}
        {segments6.map(({ getSegmentProps }, i) => (
          <Segment {...getSegmentProps()} index={i} />
        ))}
        {handles6.map(({ value, active, getHandleProps }) => (
          <button
            {...getHandleProps({
              style: {
                appearance: "none",
                border: "none",
                background: "transparent",
                outline: "none"
              }
            })}
          >
            <Handle active={active}>{value}</Handle>
          </button>
        ))}
      </Track>
      <br />
      <br />
      
      <button className="submitButton">Generate Playlist</button>
    </Container>
  );
}

export default AdvSearch

const Container = styled.div`
  
  margin-bottom: 200px;
  h1 {
    font-family: 'Raleway', sans-serif;
    font-weight: 800;
    color: white;
    padding: 0rem 5rem;
  }

  p {
    font-family: 'Raleway', sans-serif;
    font-weight: 300;
    color: lightgray;
    padding: 0rem 5rem;
  }

  h2 {
    color: white;
    padding: 0rem 5rem;
  }

  .submitButton {
    margin: 3rem 5rem;
    align-items: center;
    appearance: none;
    background-color: #1db954;
    border-radius: 4px;
    border-width: 0;
    box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #1ed760 0 -3px 0 inset;
    box-sizing: border-box;
    color: white;
    cursor: pointer;
    display: inline-flex;
    height: 48px;
    justify-content: center;
    line-height: -110px;
    list-style: none;
    overflow: hidden;
    padding-left: 16px;
    padding-right: 16px;
    position: relative;
    text-align: left;
    text-decoration: none;
    transition: box-shadow .15s,transform .15s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    white-space: nowrap;
    will-change: box-shadow,transform;
    font-size: 18px;
    font-weight: 500;


    &:focus {
      box-shadow: #1ed760 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #1ed760 0 -3px 0 inset;
    }

  &:hover {
    box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, black 0 -3px 0 inset;
    transform: translateY(-2px);
  }

  &:active {
    box-shadow: #1ed760 0 3px 7px inset;
    transform: translateY(2px);
  }
    
}
`;
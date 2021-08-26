import './App.css';
import {useEffect, useState} from "react";

const INITIAL_PODS = [
  {
    name: 'future funk beats',
    audio: new Audio('/120_future_funk_beats_25.mp3'),
    isActive: false,
  },
  {
    name: 'stutter breakbeats',
    audio: new Audio('/120_stutter_breakbeats_16.mp3'),
    isActive: false,
  },
  {
    name: 'Bass Warwick',
    audio: new Audio('/Bass Warwick heavy funk groove on E 120 BPM.mp3'),
    isActive: false,
  },
  {
    name: 'electric guitar country',
    audio: new Audio('/electric guitar coutry slide 120bpm - B.mp3'),
    isActive: false,
  },
  {
    name: 'FUd stompy slosh',
    audio: new Audio('/FUD_120_StompySlosh.mp3'),
    isActive: false,
  },
  {
    name: 'groove tanggu',
    audio: new Audio('/GrooveB_120bpm_Tanggu.mp3'),
    isActive: false,
  },
  {
    name: 'mazepolitics',
    audio: new Audio('/MazePolitics_120_Perc.mp3'),
    isActive: false,
  },
  {
    name: 'PAS3 groove',
    audio: new Audio('/PAS3GROOVE1.03B.mp3'),
    isActive: false,
  },
  {
    name: 'SilentStar Organ Synth',
    audio: new Audio('/SilentStar_120_Em_OrganSynth.mp3'),
    isActive: false,
  },
]

function Pod({name, setIsActive, isActive}) {
  return (
    <div className={`pod ${isActive ? 'active' : 'inactive'}`} onClick={() => setIsActive(!isActive)}>
      {name}
    </div>
  )
}

let playIntervalHandle

function App() {
  const [playing, setPLaying] = useState(false)
  const [pods, setPods] = useState(INITIAL_PODS)

  useEffect(() => {
    if (playing && !playIntervalHandle) {
      const intervalFunc = () => {
        INITIAL_PODS.forEach(({isActive, audio}) => {
          if (isActive) {
            audio.currentTime = 0
            audio.play()
          } else {
            audio.pause()
            audio.currentTime = 0
          }
        })
      }
      intervalFunc()
      playIntervalHandle = setInterval(intervalFunc, 8000)
    } else if (!playing) {
      clearInterval(playIntervalHandle)
      playIntervalHandle = null
      INITIAL_PODS.forEach(({audio}, index) => {
        audio.pause()
        audio.currentTime = 0
      })
    }
  }, [playing])

  const setPodIsActive = (index, isActive) => {
    const clonedPods = pods.slice()
    clonedPods[index].isActive = isActive
    if (!isActive) {
      INITIAL_PODS[index].audio.pause()
      INITIAL_PODS[index].audio.currentTime = 0
    }
    setPods(clonedPods)
  }

  return (
    <div className="App">
      <div>
        <button disabled={playing} onClick={() => setPLaying(true)} className={''}>Play</button>
        <button disabled={!playing} onClick={() => setPLaying(false)} className="stop">Stop</button>
      </div>
      <div className="pods">
        {
          pods.map(({name, isActive}, podIndex) => (
            <Pod name={name} key={name} isActive={isActive} setIsActive={(podIsActive) => setPodIsActive(podIndex, podIsActive)} />
          ))
        }
      </div>
    </div>
  );
}

export default App;

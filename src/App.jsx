import { useEffect, useRef, useState } from 'react';
import Card  from './componets/Card'
import ScoreCard from './componets/ScoreCard'
import './index.css'
import Welcom from './Welcom';

function App() {
  const [all, setAll] = useState([]);
  const [limit, setLimit] = useState(12)
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [level, setLevel] = useState('Medium')
  const [isHome, setIsHome] = useState(true)

  const nameRef = useRef([])

  function shuffle(arr, lmt) {
    let copyCard = arr.slice();
    let shufInd = []
    let newArr = []

    while(shufInd.length < lmt) {
        let ran = Math.floor(Math.random() * lmt)
        if (shufInd.includes(ran)) {
            continue
        }else {
            shufInd.push(ran)
        }
    }
    shufInd.forEach(id=> newArr.push(copyCard[id]))
    setAll(newArr)
  }
  function clearOnLevelChange() {
    nameRef.current = []
  }
  function countScore(namee) {
    if (nameRef.current.includes(namee)) {
      nameRef.current = []
      alert(namee + ' was taken Unfortunately')
      setBestScore((score > bestScore) ? score : bestScore)
      setScore(0)
    }
    else {
      nameRef.current.push(namee)
      setScore(score+1)
    }
  }

  useEffect(()=> {

    const pokemon = async () => {
      let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
      let data = await response.json()
      const datass = [...data.results]

      let allData = await Promise.all(
        datass.map(async(da)=>{
          let res = await fetch(da.url)
          let resData = await res.json()
          return {
            name: da.name,
            url: resData.sprites.other.dream_world.front_default
          }
        })
      )
      shuffle(allData, limit)
    }
    pokemon()

  }, [limit])

  return (
    <div className='text-1xl select-none text-lime-500 font-mono bg-purple-950 min-h-screen flex flex-col items-center'>
      <div className='flex justify-between w-full flex-wrap'>
        
        {!isHome && <button onClick={()=>setTimeout(()=>setIsHome(!isHome), 500)} className='text-6xl pl-2 pr-2 pt-2 self-start active:bg-red-600 mt-2 rounded-full' title='To our home babe' >⬅️</button>}
        <h1 className='text-3xl text-center bg-sky-950 shadow-black shadow-sm font-bold pt-4 self-start p-2 '> 🧠 Memory Card Game</h1>
        {!isHome && <ScoreCard  score={score} bestScore={bestScore} level={level}/>}
      </div>

      {isHome ?

      <Welcom
        limit={limit}
        setLimit={setLimit}
        setScore={setScore}
        setBestScore={setBestScore}
        shuffle={shuffle}
        all={all}
        isHome={isHome}
        setIsHome={setIsHome}
        setLevel={setLevel}
        clearOnLevelChange={clearOnLevelChange} /> :

      <div>
        {all.length === 0 ? <h1>Loading...</h1> :
        <div className='flex gap-6 flex-wrap justify-center mt-6'>
          {
            all.map((data, index) => <Card key={data.name + index} limit={limit} shuffle = {shuffle} all={all} countScore = {countScore} names={data}/>)
          }
        </div>}
      </div>}


    </div>
  )
}
export default App
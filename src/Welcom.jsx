/* eslint-disable react/prop-types */
const Welcom = ({
              limit,
              setLimit,
              setScore,
              setBestScore,
              shuffle,
              all,
              isHome,
              setIsHome,
              setLevel,
              clearOnLevelChange
            }) => {

  return (
    <div className="flex flex-col justify-around h-96 items-center">
      <h1 className="text-3xl font-extrabold text-orange-400">Memorize It!🧠</h1>
      <p className="text-xs"><span className="text-xl">➡️</span> Get points by clicking on an image but {"don't"} click on any more than once!</p>
      <div>
        <label htmlFor="levels">Select Level Then: </label>
        <select
            id='levels'
            name="levels"
            value={limit}
            className='outline-none p-2 w-32 text-2xl rounded-lg  bg-emerald-950'
            onChange={(e) => {
            setLevel(e.target.selectedOptions[0].text)
            shuffle(all,limit)
            setLimit(e.target.value)
            setScore(0)
            setBestScore(0)
            clearOnLevelChange()
            }}>

            <option value={8}>Easy</option>
            <option value={12}>Medium</option>
            <option value={16}>Hard</option>

        </select>
      </div>
      <button
            onClick={()=>setTimeout(()=>setIsHome(!isHome), 500)}
            className="border p-4 w-32 text-2xl rounded-xl hover:bg-slate-700 active:bg-red-300 bg-emerald-950">Play
      </button>

    </div>
  )
}

export default Welcom

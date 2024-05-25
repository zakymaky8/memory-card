/* eslint-disable react/prop-types */
const Card = ({
              names,
              shuffle,
              all,
              countScore,
              limit
            }) => {
  return (
    <div className="h-96 hover:bg-emerald-900 cursor-pointer border-b-8 border-2
                   border-green-600 border-t-8 rounded-2xl w-72 bg-emerald-950
                   flex flex-col items-center justify-between gap-9 p-3"
          onClick={
            ()=>{
              countScore(names.name)
              shuffle(all, limit)
            }}>

      <img
         src={names.url}
          alt={names[3]}
          width='200px'
          height='200px'/>

      <h2 className="text-3xl mb-5">{names.name[0].toUpperCase() + names.name.slice(1,)}</h2>
    </div>
  )
}

export default Card

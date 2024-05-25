/* eslint-disable react/prop-types */
const ScoreCard = ({score, bestScore, level}) => {
  return (
    <div className="p-3">
      <h1>Level: {level}</h1>
      <h2>Score: {score}</h2>
      <h2>Best Score: {bestScore}</h2>
    </div>
  )
}

export default ScoreCard

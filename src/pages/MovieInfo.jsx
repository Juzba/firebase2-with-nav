import { useParams } from "react-router-dom"
// import {data} from "./Movies"

const MovieInfo = () => {
  const {id} = useParams()
  
  return (
    <div>
      <h1>Movie Info</h1>
      <p>{id}</p>

    </div>
  )
}

export default MovieInfo
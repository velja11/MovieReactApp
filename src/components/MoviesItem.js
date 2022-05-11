import classes from './MoviesItem.module.css'
import MovieContext from '../context/movie-context'
import { useContext } from 'react'
import { Link } from 'react-router-dom'


const MoviesItem = (props) => {

    const movCtx = useContext(MovieContext)

    const isInList = movCtx.isAdded(props.id)
    

    const toogleHandler = () => {
        if(isInList){
            return

        }else{
                fetch('https://movieappstore2-default-rtdb.firebaseio.com/movies.json', {
                    method:'POST',
                    body: JSON.stringify({
                        id: props.id,
                        title: props.title,
                        year: props.year,
                        genre: props.genre
                    }),
                    headers:{
                        "Content-type":"movies/json"
                    }
                }).then(response => {
                     
                     if(response.ok){
                        movCtx.addMovies({
                            id: props.id,
                            title: props.title,
                            year: props.year,
                            genre: props.genre
                        })
                     }
                    }
                )
        
        }

    }


    return (
        <div className={classes.card}>
            <div className={classes.container}>
            <div>{props.title}</div>
            <h4><b>{props.year}</b></h4>
            <p>{props.genre}</p>
            <Link style={{border: '1px solid green', 
                          backgroundColor:'lightblue', 
                          padding:'4px'}} 
                          to={`/movies/${props.id}`}
                          >View Details</Link>
            <div>
            <button onClick={toogleHandler}  className={`${isInList ? classes.added : classes.addBut }`} disabled={isInList}>{isInList ? '✓': '+'}</button>
            </div>
            </div>
        </div>
    )
}



export default MoviesItem
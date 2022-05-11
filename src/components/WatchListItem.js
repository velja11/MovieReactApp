import classes from './WatchListItem.module.css'
import { useContext } from 'react'
import MovieContext from '../context/movie-context'

const WatchListItem = (props) => {

    const movCtx = useContext(MovieContext)

    const deleteHandler = () => {
        fetch(`https://movieappstore2-default-rtdb.firebaseio.com/movies/${props.id1}.json`,{
            method:'DELETE'
        }).then(response => {
            movCtx.deleteMovie(props.id2)

            
        })
       
    }


    return (
        <div className={classes.card}>
            
        <div className={classes.container}>
        <div>{props.title}</div>
        <h4><b>{props.year}</b></h4>
        <p>{props.genre}</p>
        <button onClick={deleteHandler} className={classes.delBut}>X</button>
        </div>
    </div>
    )

}

export default WatchListItem
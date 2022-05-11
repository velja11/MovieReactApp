import { useContext, useEffect, useState } from "react"
import MovieContext from "../context/movie-context"
import WatchListItem from "./WatchListItem"
import classes from './MyWatchList.module.css'



const MyWatchList = () => {
    const [loadedMovies, setLoadedMovies] = useState([])
    const [loader, setLoader] = useState(true)
    
    const movCtx = useContext(MovieContext)

    useEffect(() => {
        setLoader(true)
        fetch('https://movieappstore2-default-rtdb.firebaseio.com/movies.json').then(response => response.json()).then(responseData => {
            
            const movieList = []

            for(const key in responseData){
                movieList.push({
                    id1: key,
                    id2: responseData[key].id,
                    title: responseData[key].title,
                    year: responseData[key].year,
                    genre: responseData[key].genre
                })
            }
            setLoader(false)
            setLoadedMovies(movieList)
            
        })

    }, [movCtx.movies])
    

    //const items = movCtx.movies

    // let content 

    // if(loadedMovies.length === 0){
    //     content = <p style={{color:'wheat'}}>No movies in list. Add some to list...</p>
    // }else{
        
    //     content= loadedMovies.map(item => {
    //         return (<WatchListItem key={item.id2} id1={item.id1} id2={item.id2} title={item.title} genre={item.genre} year={item.year}/>)
            
    //     })
    // }

    let isEmpty = loadedMovies.length === 0


    return (
       <div className={classes.watchlist}>
            {/* {content} */}
            {loader && <p style={{color:'wheat', textAlign:'center'}}>Loading</p>}
           {isEmpty && !loader && <p style={{color:'wheat', textAlign:'center'}}>No movies in list</p>}
           <div style={{display:'flex'}}>
            {loadedMovies.map(item => {
                return (<WatchListItem key={item.id2} id1={item.id1} id2={item.id2} title={item.title} genre={item.genre} year={item.year}/>)
            })}
            </div>
           
           
       </div>
    )



    
}


export default MyWatchList
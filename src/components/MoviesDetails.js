import classes from './MoviesDetails.module.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'



// const MY_MOVIE_LIST = [
//     {id: '1', title: 'Godfather', year: '1970', genre: 'Crime, Drama', description:'An organized crime dynastys aging patriarch transfers control of his clandestine empire to his reluctant son', actors:'Al Pacino'},
//     {id: '2', title: 'Snatch', year: '2001', genre: 'Comedy, Crime, Drama',description:'Unscrupulous boxing promoters, violent bookmakers, a Russian gangster, incompetent amateur robbers and supposedly Jewish jewelers fight to track down a priceless stolen diamond ', actors:'Brad Pitt'},
//     {id: '3', title: 'Life is a beautiful', year: '1968', genre: 'War, Drama',description:'When an open-minded Jewish librarian and his son become victims of the Holocaust, he uses a perfect mixture of will, humor, and imagination to protect his son from the dangers around their camp.', actors:'Roberto Benigni'},
//     {id: '4', title: 'Pulp Fiction', year: '1994', genre: 'Crime, Drama',description:'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption. ', actors:'Samuel L. Jacskon'},
//     {id:'5', title: 'Taxi', year: '1998', genre: 'Comedy, Action',description:'To work off his tarnished driving record, a hip taxi driver must chauffeur a loser police inspector on the trail of German bank robbers.', actors:'Samy Nacery'},
//     {id:'6', title: 'Taxi2', year: '1999', genre: 'Comedy, Action',description:'To work off his tarnished driving record, a hip taxi driver must chauffeur a loser police inspector on the trail of German bank robbers.', actors:'Samy Nacery'},
//     {id:'7', title: 'Taxi3', year: '2000', genre: 'Comedy, Action',description:'To work off his tarnished driving record, a hip taxi driver must chauffeur a loser police inspector on the trail of German bank robbers.', actors:'Samy Nacery'},
//     {id:'8', title: 'Taxi4', year: '2001', genre: 'Comedy, Action',description:'To work off his tarnished driving record, a hip taxi driver must chauffeur a loser police inspector on the trail of German bank robbers.', actors:'Samy Nacery'}
// ]




const MoviesDetails = (props) => {
 
    const [singleMovie, setSingleMovie] = useState(null)


    const params = useParams()

    const { movieId} = params

    //let detMovie = {}

    /* FROM API*/
    useEffect(() => {
    fetch(`https://moviesapp2-281c4-default-rtdb.firebaseio.com/movies/${movieId}.json`)
    .then(response => response.json())
    .then(responseData => {
        setSingleMovie(responseData)
        // detMovie = {
        //     id:movieId,
        //     title:responseData.title,
        //     year:responseData.year
        // }
        
    })
    },[movieId])
    
    // setSingleMovie (detMovie)
    

    // const movie = MY_MOVIE_LIST.find(movie => movie.id === movieId)

    // if(!movie){
    //     return <p style={{textAlign:'center', color:'wheat'}}>No movie found</p>
    // }


    if(!singleMovie){
        return <p style={{textAlign:'center', color:'white'}}>Loading...</p>
    }

    

    return ( 
        <div className={classes.allCard}>
            <div className={classes.card}>
            <div className={classes.container}>
            <h3>{singleMovie.title}</h3>
            <h3>{singleMovie.description}</h3>
            <p><b>Genre:</b>{singleMovie.genre}</p>
            <p><b>Actors:</b>  {singleMovie.actors}</p>
            <p><b>Release date:</b> {singleMovie.year}</p>
            </div>
        </div>
        </div>
    )
}


export default MoviesDetails
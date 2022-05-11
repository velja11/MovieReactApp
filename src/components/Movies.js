import MoviesItem from "./MoviesItem"
import classes from './Movies.module.css'
import React, { useEffect } from "react"
import { useState } from "react"

// let MY_MOVIE_LIST = [
//     {id: '1', title: 'Godfather', year: '1970', genre: 'Crime, Drama'},
//     {id: '2', title: 'Snatch', year: '2001', genre: 'Comedy, Crime, Drama'},
//     {id: '3', title: 'Life is a beautiful', year: '1968', genre: 'War, Drama'},
//     {id: '4', title: 'Pulp Fiction', year: '1994', genre: 'Crime, Drama'},
//     {id:'5', title: 'Taxi', year: '1998', genre: 'Comedy, Action'},
//     {id:'6', title: 'Taxi2', year: '1999', genre: 'Comedy, Action'},
//     {id:'7', title: 'Taxi3', year: '2000', genre: 'Comedy, Action'},
//     {id:'8', title: 'Taxi4', year: '2001', genre: 'Comedy, Action'}
// ]

const Movies = () => {

    

    const [myMovies, setMyMovies] = useState([])
     const [searchTerm, setSearchTerm] = useState('')
    
    const [isLoader, setLoader] = useState(true)
  


    /*FETCH FROM FIREBASE*/

    // useEffect(() => {
    //     setLoader(true)
    //     fetch('https://movieapi-cbbcc-default-rtdb.firebaseio.com/movies.json').then(response => response.json()).then(responseData => {
    //         const loadMovies = []

    //         for(const key in responseData){
    //             loadMovies.push({
    //                 id:key,
    //                 title:responseData[key].title,
    //                 year:responseData[key].year,
    //                 genre: responseData[key].genre
    //             })
    //             console.log(responseData[key].title)
    //         }
    //        setLoader(false)
    //         setMyMovies(loadMovies)
    //     })

    //  }, [])

    /*SEARH WITH BACKEND AND FETCH FROM FIREBASE*/

    const filterMoviesHandler = (event) => {
        setSearchTerm(event.target.value)
    }

    useEffect(() => {
        setLoader(true)
        fetch('https://moviesapp2-281c4-default-rtdb.firebaseio.com/movies.json').then(response => response.json()).then(responseData => {
            const loadMovies = []

            for(const key in responseData){
                if(responseData[key].title.toLowerCase().includes(searchTerm.toLowerCase())){
                loadMovies.push({
                    id:key,
                    title:responseData[key].title,
                    year:responseData[key].year,
                    genre: responseData[key].genre
                })
            }
                
            }
           setLoader(false)
          
            setMyMovies(loadMovies)
        })

     }, [searchTerm])


     /*SEARCH WITHOUT BACKEND*/

    // useEffect(() => {
    //     setMyMovies(() => {
    //         return MY_MOVIE_LIST.filter(movie => movie.title.toLowerCase().includes(searchTerm.toLowerCase()))
    //     })

    // }, [searchTerm])





    return (
        <React.Fragment>
        <div className={classes.search}><input placeholder='Search' onChange={filterMoviesHandler} /></div>

         FOR LOADING FROM API
       {isLoader && <p style={{color:'white', textAlign:'center'}}>Loading</p>}

        <div className={classes.movies}>
          {myMovies.map(movie => {
              return  <MoviesItem key={movie.id} id={movie.id} title={movie.title} year={movie.year} genre={movie.genre}  />
          })} 
        </div>
        </React.Fragment>
    )
}


export default Movies
import React from "react"
import { useState } from "react"

const MovieContext = React.createContext({
    movies:[],
    totalMov: 0,
    idToken:'',
    login: (token) => {},
    logout: () => {},
    addMovies: (movie) => {

    },
    deleteMovie:(id) => {},
    isAdded: (id) => {}

})





export const MovieContextProvider = (props) => {

    const initialToken = localStorage.getItem('tok');

    const [movies, setMovies] = useState([])
    const [tokenUser, setTokenUser] = useState(initialToken)

    const totNumber = movies.length
    

    const addMovieToList = (movie) => {
        setMovies((prevState) => {
            return prevState.concat(movie)

        })

    }


    const deleteMovieFromList = (id) => {
        setMovies((prevState) => {
            return prevState.filter(movie => movie.id !== id)
        })

    }

    const isPartOfList = (id) => {
        return movies.some(movie => movie.id === id)

    }

    const loginUser = (token) => {
        setTokenUser(token)
        localStorage.setItem('tok', token)
    }

    const logoutUser = () => {
        setTokenUser('')
        localStorage.removeItem('tok')
    }

    const tokenForUser = !!tokenUser



    const context = {
        movies: movies,
        totalMov: totNumber,
        idToken: tokenForUser,
        addMovies: addMovieToList,
        deleteMovie: deleteMovieFromList,
        isAdded: isPartOfList,
        login: loginUser,
        logout: logoutUser
    }

    return (
        <MovieContext.Provider value={context}>
            {props.children}
        </MovieContext.Provider>
    )
} 


export default MovieContext


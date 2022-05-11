import classes from './Navigation.module.css'
import { useContext, useEffect, useState } from 'react'
import MovieContext from '../context/movie-context'
import { Link, useHistory } from 'react-router-dom'
import logo from './../img/threelines.png'




const Navigation = () => {

    //const totalNum = useContext(MovieContext).totalMov

    const movCtx = useContext(MovieContext)

    const history = useHistory()

    const checkLog = movCtx.idToken

    const [lenghArr, setLengthArr] = useState(0)

    const [navVisible, setNavVisible] = useState(false)

    const logoutHandler = () => {
        movCtx.logout()
        history.replace('/auth')
    }

    const navVisibleHandler = () => {
        setNavVisible((prevState) => !prevState)
    }

    useEffect(() => {
        fetch('https://movieappstore2-default-rtdb.firebaseio.com/movies.json').then(response => response.json()).then(responseData => {

            const newData = responseData || {}

            const arr = Object.keys(newData)

            setLengthArr(arr.length)
            
        })

    }, [movCtx.movies])

    return (
        <nav className={classes.navigation}>
            
            <img src={logo} alt="" className={classes.slika} onClick={navVisibleHandler} />

            <div style={{height:'40px'}}></div>
           
            <ul className={`${!navVisible ? classes.lista : classes.listaVisible}`}>
           
                {!checkLog &&
                <li>
                    <Link to='/auth'>Login</Link>
                </li>
                    }
                {checkLog &&
                <li>
                
                    <Link to='/movies'>Movies</Link>
                </li>
                    }
                    
                {checkLog &&
                <li>
                    
                    <Link to='/forms'>Forms</Link>
                </li>
                    }
                {checkLog && 
                <li>
                     <Link to='/watchlist'>My Watchlist</Link> 
                    <span style={{marginLeft:'5px' , backgroundColor:'greenyellow', border:'1px solid white', padding: '4px', borderRadius:'8px'}}>{lenghArr}</span>
                </li>
                }       
                <li>
                    <Link to='/about'>About</Link>
                </li>
                { checkLog &&
                <li>
                    <button className={classes.logout} onClick={logoutHandler}>Logout</button>
                </li>
                    }
                  
            </ul>
        </nav>
    )
}

export default Navigation
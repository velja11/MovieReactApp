import classes from './Login.module.css'
import { useState, useRef, useContext } from 'react'
import MovieContext from '../context/movie-context'
import { useHistory} from 'react-router-dom'
import ErrorModal from './ErrorModal'
import SuccesModal from './SuccesModal'

let tekst = ''

const Login = () => {


    const moveCtx = useContext(MovieContext)

    const [loginState, setLoginState] = useState(false)
    
    const [greska, setGreska] = useState(false)

    const [succesSign, setSuccesSign] = useState(false);

  

    const history = useHistory()

    const inputNameRef = useRef()
    const inputPassRef = useRef()

    const closeModal = () => {
         setGreska(false)
     }


    const changeFormHandler = (event) => {
        event.preventDefault()

        setLoginState(!loginState)
    }

    const logHandler = (event) => {
        event.preventDefault()

        const inputName = inputNameRef.current.value
        const inputPass = inputPassRef.current.value

        if(loginState){
            

            fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB-aMlr4DF-HlYV-8GgJ2YbLKY_JwF9PuU',{
                method:'POST',
                body:JSON.stringify({
                    email: inputName,
                    password: inputPass,
                    returnSecureToken: true
                }),
                headers:{
                    'Content-type':'aplication/json'
                }
            }).then(response => {
                if(response.ok){
                  
                    setSuccesSign(true)
                }
                else{
                    return response.json().then(responseData => {
                        
                        tekst = responseData.error.message
                        setGreska(true)
                    })
                }
            })
        }else{
            
            fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB-aMlr4DF-HlYV-8GgJ2YbLKY_JwF9PuU', {
                method:'POST',
                body:JSON.stringify({
                    email: inputName,
                    password: inputPass,
                    returnSecureToken: true
                }),
                headers:{
                    'Content-type':'aplication/json'
                }
            }).then(res => {
                if(res.ok){
                    return res.json().then(resData => {
                        
                        moveCtx.login(resData.idToken)
                        history.push('/movies')
                    })

                }
                else{
                    return res.json().then(resData => {
                        
                        tekst = resData.error.message
                        setGreska(true)
                      
                       
                    })
                }
            })
          
        }

        


        inputNameRef.current.value = ''
        inputPassRef.current.value = ''
        
    }





    return (
       
        <div className={classes.login}>
            
            <p className={`${loginState ? classes.parSign : classes.parLog}`}>{loginState ? "Sign up" : "Login"}</p>
            {greska && <ErrorModal onConfirm={closeModal} onClose={closeModal} tekst={tekst} />}
            {succesSign && <SuccesModal />}
            <div style={{display:'flex', justifyContent:'center'}}>
            <form onSubmit={logHandler}>
                <div >
                    {/* <label  htmlFor='user'>Username</label> */}
                    <input type='email' id='user' required ref={inputNameRef} placeholder='Username'></input>
                </div>
                <div>
                    {/* <label  htmlFor='pass'>Password</label> */}
                    <input type='password' id='pass' required ref={inputPassRef} placeholder='Password'></input>
                </div>
                <div>
                    <button className={`${loginState ? classes.button2 : classes.button1}`}>{loginState ? "Sign up": "Login"}</button>
                </div>
                <div>
                    <button className={classes.linkButt} onClick={changeFormHandler}>{loginState ? 'Already have acount? Login now':'Do not have account? Create now'}</button>
                </div>
            </form>
            </div>
        </div>
       
    )

}

export default Login
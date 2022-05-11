import classes from './ErrorModal.module.css'
import React from 'react'


const ErrorModal = (props) => {
    return <React.Fragment>
        <div>
        <div className={classes.backdrop} onClick={props.onConfirm} />
            <div className={classes.modal}>
                <header className={classes.head}>
                    <p className={classes.text}>Error</p>
                    
                </header>
                <p style={{color:'black', marginTop:'60px', textAlign:'center'}}>{props.tekst}</p>
                <button onClick={props.onClose} className={classes.button}>Close</button>
                
            </div>
        </div>
    </React.Fragment>
}


export default ErrorModal
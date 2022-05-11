import { Link } from 'react-router-dom'
import classes from './SuccesModal.module.css'

const SuccesModal = (props) => {
    return (
        <div>
             <div>
             <div className={classes.backdrop} onClick={props.onConfirm} />
            <div className={classes.modal}>
                <header className={classes.head}>
                    <p className={classes.text}>Awesome</p>
                    
                </header>
                <p style={{color:'black', marginTop:'74px'}}>Succesfully sign up</p>
                <Link to='/' className={classes.link}>Now log in</Link>
                
            </div>
        </div>
        </div>
        
    )

}


export default SuccesModal

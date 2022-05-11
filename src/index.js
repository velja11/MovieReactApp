import ReactDOM from 'react-dom';
import { MovieContextProvider } from './context/movie-context';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'

ReactDOM.render(<MovieContextProvider><BrowserRouter><App /></BrowserRouter></MovieContextProvider>, document.getElementById('root'));

import React from 'react'
import ReactDOM from 'react-dom/client'
import './Resources/css/app.css'
import Routes from './routes.tsx'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase.tsx'


// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <Routes />
//   </React.StrictMode>,
  
// )
const App = (props:any) =>{
  return(
    <Routes {...props}/>
  )
}
onAuthStateChanged(auth, (user) => {

  console.log(user);
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <App user={user}/>
  )
  
});
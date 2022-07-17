import { useEffect, useState } from "react"

import api from "./services/api"
import SearchUser from "./components/SearchUser"

import "./App.css"

interface IUserDate {

}

export default function App() {
  const [userName, setUserName] = useState("")
  const [userData, setUserData] = useState(null)
  const [reposList, setReposList] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(userName)

    await api.get(`/users/${userName}/repos`)
    .then((response) => {
      setReposList(response.data)
    })
    .catch((error) => {
      alert("Ocorreu um erro: " + error)
    })

    await api.get(`/users/${userName}`)
    .then((response) => {
      setUserData(response.data)
    })
    .catch((error) => {
      alert("Ocorreu um erro: " + error)
    })
  }

  useEffect(() => {
    console.log(userData)
    console.log(reposList)
  },[userData])
  
  return (
    <div className="App">      
        <SearchUser
           handleSubmit={handleSubmit}
           setUserName={setUserName}
           userName={userName} 
        />      
    </div>
  )
}

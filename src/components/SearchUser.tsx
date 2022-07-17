import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Card from '@mui/material/Card';
import "./SearchUser.css"

interface ISearchUser {
  handleSubmit: any
  setUserName: any
  userName: string
}

const SearchUser = ({
  handleSubmit,
  setUserName,
  userName  
}:ISearchUser ) => {
    
  return (
    <div className="searchUser">      
      <h1>Pesquisa de perfil de usuários do GitHub</h1>      
      <Card className="inputUser">        
        <form onSubmit={handleSubmit}>
          <TextField
            type="text"
            className='textField'
            onChange={(e) => setUserName(e.target.value)}
            required
            value={userName}            
            placeholder="Digite o perfil do usuário" 
            label="Perfil de usuário"               
          />
          <Button size='large' type="submit" variant="contained">Pesquisar</Button>
        </form>
      </Card>      
    </div>
  )
}

export default SearchUser

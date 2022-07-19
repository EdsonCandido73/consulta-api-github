import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Search from "@mui/icons-material/Search";

import "./SearchUser.css";
import { api } from "../services/api";
import { useEffect, useState } from "react";
import { UserProfile } from "./UserProfile";
import { IReposList, IUserData } from "./Types";

const SearchUser = () => {
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState<IUserData>(null);
  const [reposList, setReposList] = useState<IReposList[]>(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userName);

    await api
      .get(`/users/${userName}/repos`)
      .then((response) => {
        setReposList(response.data);
      })
      .catch((error) => {
        alert("Ocorreu um erro: " + error);
      });

    await api
      .get(`/users/${userName}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        alert("Ocorreu um erro: " + error);
      });
  };

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  useEffect(() => {
    console.log(reposList);
  }, [reposList]);

  return (
    <div className="searchUser">
      <Card className="inputUser">
        <h1>Pesquisa de perfil de usuários do GitHub</h1>
        <form onSubmit={handleSubmit}>
          
          <TextField
            type="text"
            className="textField"
            onChange={(e) => setUserName(e.target.value)}
            required
            value={userName}
            placeholder="Digite o perfil do usuário"
            label="Perfil de usuário"
          />
          <Button
            size="large"
            type="submit"
            variant="contained"
            color="inherit"
          >
            <Search />
          </Button>
          
        </form>
        {userData?.avatar_url && (
            <img
              src={userData.avatar_url}              
              alt={userData.name}
              loading="lazy"
            />
          )}
      </Card>
      <UserProfile userData={userData} reposList={reposList} />
    </div>
  );
};

export default SearchUser;

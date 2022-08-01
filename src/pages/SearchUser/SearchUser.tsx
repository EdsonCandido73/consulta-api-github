import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Search from "@mui/icons-material/Search";

import { api } from "../../services/api";
import { useEffect, useState } from "react";
import { UserProfile } from "../UserProfile/UserProfile";
import { IReposList, IUserData } from "./Types";
import { Box, Container, Grid, Typography } from "@mui/material";


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
    <Container>
      <Box
        alignItems="center"
        padding="20px"
        sx={{
          width: "100%",
          backgroundColor: "whitesmoke",
          border: "1px solid lightgrey ",
        }}
      >
        <Grid>
          <Typography
            variant="h3"
            justifyContent="center"
            component="div"
            marginBottom={5}
            marginTop={3}
          >
            Pesquisa de perfil de usuários do GitHub
          </Typography>
        </Grid>
        <form onSubmit={handleSubmit}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={6}>
              <TextField
                type="text"
                className="textField"
                onChange={(e) => setUserName(e.target.value)}
                required
                fullWidth
                value={userName}
                placeholder="Digite o nome do perfil do usuário"
                label="Perfil do usuário"
              />
            </Grid>
            <Grid item xs={1}>
              <Button
                size="large"
                type="submit"
                sx={{ height: "50px" }}
                variant="contained"
                color="inherit"
              >
                <Search />
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
      <UserProfile userData={userData} originalReposList={reposList} />
    </Container>
  );
};

export default SearchUser;

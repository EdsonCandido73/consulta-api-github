import { useEffect, useState } from "react";

import Search from "@mui/icons-material/Search";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";

import moment from "moment";
import { IReposList, IUserData } from "../SearchUser/Types";

interface IUserProfile {
  userData: IUserData;
  originalReposList: IReposList[];
}

export const UserProfile = ({ userData, originalReposList }: IUserProfile) => {
  const [searchString, setSearchString] = useState("");
  const [orderBy, setOrdeBy] = useState("name");
  const [reposList, setReposList] = useState<IReposList[]>([]);
  const [sortedReposList, setSortedReposList] = useState<IReposList[]>([]);  
  const [clean, setClean] = useState(false);
  const [filterByArchived, setFilterByArchived] = useState(false);
  const [filterByIssues, setFilterByIssues] = useState(false);
  const [filterByStars, setFilterByStars] = useState(false);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrdeBy((event.target as HTMLInputElement).value)
    handleOrderRepos((event.target as HTMLInputElement).value);
  };

  const handleOrderRepos = (sortKey: string) => {
    
    if (reposList.length > 0) {      
      if (sortKey === "name") {
        setSortedReposList(reposList.sort((a, b) => {
          return a.name.toLowerCase() < b.name.toLowerCase() ? -1 
          : a.name.toLowerCase() > b.name.toLowerCase() ? 1 : 0;
        }))          
      }
      if (sortKey === "create") {
        setSortedReposList(reposList.sort((a, b) => {
          return a.created_at < b.created_at ? -1
            : a.created_at > b.created_at ? 1 : 0;
        }))          
      }
      if (sortKey === "update") {
        setSortedReposList(reposList.sort((a, b) => {
          return a.updated_at < b.updated_at ? -1
            : a.updated_at > b.updated_at ? 1 : 0;
        }))          
      }
    }
  };

  const handleClickSearch = () => {
    setReposList(
      originalReposList?.filter(
        (repo) =>
          (repo.description
            ?.toLowerCase()
            .includes(searchString?.toLowerCase()) ||
          repo.language?.toLowerCase().includes(searchString?.toLowerCase()) ||
          repo.name?.toLowerCase().includes(searchString?.toLowerCase())) &&
          (!filterByArchived || (filterByArchived && repo.archived === true)) &&
          (filterByStars ? repo.stargazers_count > 0 : repo.stargazers_count >= 0) &&
          (filterByIssues ? repo.open_issues_count > 0 : repo.open_issues_count >= 0)
      )
    );
  };

  const handleClickClear = () => {
    setSearchString("");
    setOrdeBy("name");
    setFilterByArchived(false);
    setFilterByIssues(false);
    setFilterByStars(false);
    setClean(true);
  };

  useEffect(() => {
    setReposList(originalReposList);
  }, [originalReposList]);

  useEffect(() => {
    setReposList(sortedReposList);
  }, [sortedReposList]);  
  
  useEffect(() => {
    if (clean) {
      handleClickSearch();
      setClean(false);
    }
  }, [clean]);

  useEffect(() => {
    handleClickSearch();
    console.log(reposList);
    console.log(filterByArchived);
    console.log(filterByIssues);
    console.log(filterByStars);
    console.log(orderBy);
  }, [filterByArchived, filterByIssues, filterByStars]);

  return (
    userData &&
    reposList && (
      <>
        <Box
          alignItems="center"
          padding="20px"
          marginTop="5px"
          marginBottom="5px"
          sx={{
            width: "100%",
            backgroundColor: "whitesmoke",
            border: "1px solid lightgrey ",
          }}
        >
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={6}>
              <TextField
                type="text"
                className="textField"
                onChange={(e) => setSearchString(e.target.value)}
                fullWidth
                value={searchString}
                placeholder="Pesquisar por..."
                label="Pesquisa por (nome, descrição e linguagem)"
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                size="large"
                type="submit"
                sx={{ height: "50px" }}
                variant="contained"
                color="inherit"
                onClick={() => handleClickSearch()}
              >
                <Search />
              </Button>
              <Button
                size="large"
                type="submit"
                sx={{ height: "50px", marginLeft: "20px" }}
                variant="contained"
                color="inherit"
                onClick={() => handleClickClear()}
              >
                Limpar
              </Button>
            </Grid>
          </Grid>

          <Grid container alignItems="center" spacing={2} marginTop={1}>
            <Grid item xs={1.2}>
              <Typography variant="body1" component="div">
                Filtar por:
              </Typography>
            </Grid>
            <Grid item xs={0.4}>
              <Checkbox
                value={filterByArchived}
                onClick={() => setFilterByArchived(!filterByArchived)}
                checked={filterByArchived}
              />
            </Grid>
            <Grid item xs={1.6}>
              <Typography variant="body1" component="div">
                Arquivados
              </Typography>
            </Grid>
            <Grid item xs={0.4}>
              <Checkbox
                value={filterByIssues}
                onClick={() => setFilterByIssues(!filterByIssues)}
                checked={filterByIssues}
              />
            </Grid>
            <Grid item xs={1.6}>
              <Typography variant="body1" component="div">
                Issues abertas
              </Typography>
            </Grid>
            <Grid item xs={0.4}>
              <Checkbox
                value={filterByStars}
                onClick={() => setFilterByStars(!filterByStars)}
                checked={filterByStars}
              />
            </Grid>
            <Grid item xs={1.6}>
              <Typography variant="body1" component="div">
                Com Estrelas
              </Typography>
            </Grid>
          </Grid>

          <Grid container alignItems="center" spacing={2} marginTop={1}>
            <Grid item xs={1.2}>
              <Typography variant="body1" component="div">
                Ordenar por:
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <RadioGroup value={orderBy} onChange={handleRadioChange} row>
              <FormControlLabel
                  value="name"
                  control={<Radio />}
                  label="Nome"
                  sx={{ marginLeft: "3px" }}
                />
                <FormControlLabel
                  value="create"
                  control={<Radio />}
                  label="Data criação"
                  sx={{ marginLeft: "15px" }}
                />                
                <FormControlLabel
                  value="update"
                  control={<Radio />}
                  label="Último commit"
                  sx={{ marginLeft: "15px" }}
                />
              </RadioGroup>
            </Grid>
          </Grid>
        </Box>

        <Box
          alignItems="center"
          padding="20px"
          sx={{
            width: "100%",
            backgroundColor: "whitesmoke",
            border: "1px solid lightgrey ",
          }}
        >
          <Grid container alignItems="center" spacing={2} marginBottom={2}>
            <Grid marginRight={1} item xs={1}>
              {userData?.avatar_url ? (
                <Avatar
                  alt={userData.name}
                  src={userData.avatar_url}
                  sx={{ width: 90, height: 90 }}
                />
              ) : (
                <Avatar
                  src="../../images/broken-avatar.jpg"
                  sx={{ width: 80, height: 80 }}
                />
              )}
            </Grid>
            <Grid item xs={5}>
              <Typography variant="h4" component="div">
                {userData?.name}
              </Typography>
              <Typography variant="body1" component="div">
                {userData.bio}
              </Typography>
              <Typography variant="body1" component="div">
                {userData?.location}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body1" component="div">
                {`Perfil criado em: ${moment(userData?.created_at).format(
                  "DD/MM/YYYY"
                )}`}
              </Typography>
              <Typography variant="body1" component="div">
                {`Repositórios públicos: ${userData?.public_repos}`}
              </Typography>
              <Typography variant="body1" component="div">
                {`Seguidores: ${userData?.followers}`}
              </Typography>
            </Grid>
          </Grid>
          {reposList.length > 0 && (
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              item
              xs={12}
              gap="5px"
            >
              {reposList.map((repos) => (
                <Grid key={repos.clone_url} item xs={5.9} marginTop="5px">
                  <Card sx={{ backgroundColor: repos.archived ? "coral" : "" }}>
                    <CardContent>
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        component="div"
                        marginBottom={1}
                      >
                        {repos.name}
                      </Typography>
                      <Typography variant="body1" component="div">
                        {`Descrição: ${repos.description || ""}`}
                      </Typography>
                      <Typography variant="body1" component="div">
                        {`Criado em: ${moment(repos.created_at).format(
                          "DD/MM/YYYY"
                        )}`}
                      </Typography>
                      <Typography variant="body1" component="div">
                        {`Última atualização: ${moment(repos.updated_at).format(
                          "DD/MM/YYYY"
                        )}`}
                      </Typography>
                      <Typography variant="body1" component="div">
                        {`Linguagem utilizada: ${repos.language || ""}`}
                      </Typography>
                      <Typography variant="body1" component="div">
                        {`Estrelas: ${repos.stargazers_count}`}
                      </Typography>
                      <Typography variant="body1" component="div">
                        {`Repositório original do GitHub no link abaixo:`}
                      </Typography>
                      <Link
                        href={repos.clone_url}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {repos.clone_url}
                      </Link>
                      {repos.archived && (
                        <Typography
                          color="white"
                          variant="body1"
                          component="div"
                        >
                          Repositório arquivado!
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </>
    )
  );
};

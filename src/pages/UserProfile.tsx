import { IReposList, IUserData } from "./Types";

interface IUserProfile {
  userData: IUserData
  reposList: IReposList[]
}

export const UserProfile = ({userData, reposList}: IUserProfile ) => {



  return <h1>Teste</h1>;
};

export interface IUserData {
    avatar_url: string
    bio: string
    created_at: Date
    followers: number  
    location: string
    name: string
    public_repos: number
  }
  
  export interface IReposList {
    archived: boolean
    clone_url: string
    created_at: Date
    description: string
    language: string
    name: string
    stargazers_count: number
    updated_at: Date
    url: string
  }
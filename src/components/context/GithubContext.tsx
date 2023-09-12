import { createContext, useReducer } from "react";
import GithubReducer from "../Reducer/GithubReducer";
import { User, Repo, Profile } from "../../lib/type";
export const BASE_API_URL = "https://api.github.com";

interface GithubContextProps {
  users: User[];
  user: Profile;
  repos: Repo[];
  loading: boolean;
  fetchUsers: () => void;
  searchResults: (text: string) => void;
  clearResults: () => void;
  getUser: (login: string | undefined) => void;
  getUserRepos: (login: string | undefined) => void;
}
export const GithubContext = createContext<undefined | GithubContextProps>(
  undefined
);
export const GithubProvider = ({ children }) => {
  //   const [users, setUsers] = useState([]);
  //   const [loading, setLoading] = useState(true);
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(GithubReducer, initialState);
  //   get rendom users

  const fetchUsers = async () => {
    setLoading();
    const response = await fetch(BASE_API_URL + "/users");
    const data = await response.json();
    // console.log(data);
    // setUsers(data);
    // setLoading(false);
    dispatch({
      type: "GET_USERS",
      payload: data,
    });
  };
  const setLoading = () =>
    dispatch({
      type: "SET_LOADING",
    });
  // gitHub searchResults
  const searchResults = async (text) => {
    setLoading();
    const params = new URLSearchParams({
      q: text,
    });
    const response = await fetch(`${BASE_API_URL}/search/users?${params}`);
    const { items } = await response.json();
    dispatch({
      type: "GET_USERS",
      payload: items,
    });
    // setUsers(data);
    // setLoading(false);
  };
  //   Lets clear users form state
  const clearResults = () => {
    dispatch({
      type: "CLEAR_USERS",
    });
  };

  //   get a single user
  const getUser = async (login) => {
    setLoading();
    const response = await fetch(`${BASE_API_URL}/users/${login}`);
    if (response.status === 404) {
      // window.location = "/notfound";
    } else {
      const data = await response.json();
      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
    // setUsers(data);
    // setLoading(false);
  };
  //  get user repos
  const getUserRepos = async (login) => {
    setLoading();
    // const params = new URLSearchParams({
    //   sort: 'created',
    //   per_page: 10,
    // })
    const response = await fetch(`${BASE_API_URL}/users/${login}/repos`);
    const data = await response.json();
    dispatch({
      type: "GET_REPOS",
      payload: data,
    });
    // setUsers(data);
    // setLoading(false);
  };
  return (
    <GithubContext.Provider
      value={{
        // ...state,
        // dispatch,
        users: state.users,
        loading: state.loading,
        user: state.user,
        repos: state.repos,
        fetchUsers,
        searchResults,
        clearResults,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

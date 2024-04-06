export const initialState = {
  token: null,
  user: {
    name: "",
    email: "",
    role: "",
    subtype: "",
    fav: [],
    watchlist: [],
    profilePic: "",
    isGoogleAuth: false,
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE_TOKEN":
      const tokenFromStorage = localStorage.getItem("token");
      return {
        ...state,
        token: tokenFromStorage,
      };
    case "INITIALIZE_USER":
      const userJSON = localStorage.getItem("user");
      if(userJSON === null || userJSON === undefined || userJSON === "null" || userJSON === "undefined") return initialState;
      const userFromStorage = userJSON ? JSON.parse(userJSON) : initialState.user;
      return {
        ...state,
        user: userFromStorage,
      };
    case "SET_USER":
      localStorage.setItem("user", JSON.stringify(action.user));
      return {
        ...state,
        user: action.user,
    };
    case "REMOVE_TOKEN":
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        token: null,
        user: {
          name: "",
          email: "",
          role: "",
          subtype: "",
          fav: [],
          profilePic: "",
          isGoogleAuth: false,
        },
      };
    case "SET_TOKEN":
      localStorage.setItem("token", action.token);
      localStorage.setItem("user", JSON.stringify(action.user));
      return {
        token: action.token,
        user: action.user,
      };
    case "ADD_FAV":
      localStorage.setItem("user", JSON.stringify({...state.user, fav: [...state.user.fav, action.movie]}));
      return {
        ...state,
        user: {
          ...state.user,
          fav: [...state.user.fav, action.movie],
        },
      };
    case "REM_FAV":
      localStorage.setItem("user", JSON.stringify({...state.user, fav: state.user.fav.filter(item => item._id !== action.movie._id)}));
      return {
        ...state,
        user: {
          ...state.user,
          fav: state.user.fav.filter(item => item._id !== action.movie._id),
        },
      };
    case "CREATE_WATCHLIST":
      if(state.user.watchlist === undefined) {
        localStorage.setItem("user", JSON.stringify({...state.user, watchlist: [{_id: action.watchlistID, name: action.watchlistID, movies: [action.movie]}]}));
        return {
          ...state,
          user: {
            ...state.user,
            watchlist: [{_id: action.watchlistID, name: action.watchlistID, movies: [action.movie]}],
          },
        };
      };
      localStorage.setItem("user", JSON.stringify({...state.user, watchlist: [...state.user.watchlist, {_id: action.watchlistID, name: action.watchlistID, movies: [action.movie]}]}));  
      return {
        ...state,
        user: {
          ...state.user,
          watchlist: [...state.user.watchlist, {_id: action.watchlistID, name: action.watchlistID, movies: [action.movie]}],
        },
      };
    case "REMOVE_WATCHLIST":
      localStorage.setItem("user", JSON.stringify({...state.user, watchlist: state.user.watchlist.filter(watchlist => watchlist._id !== action.watchlistID)}));
      return {
        ...state,
        user: {
          ...state.user,
          watchlist: state.user.watchlist.filter(watchlist => watchlist._id !== action.watchlistID),
        },
      };
    case "REMOVE_MOVIE_FROM_WATCHLIST":
      localStorage.setItem("user", JSON.stringify(
        {
          ...state,
          user: {
            ...state.user,
            watchlist: state.user.watchlist.map(watchlist => {
              if (watchlist._id === action.watchlistID) {
                return {
                  ...watchlist,
                  movies: watchlist.movies.filter(movie => movie._id !== action.movieID),
                };
              }
              return watchlist;
            }),
          },
        }
      ));
      return {
        ...state,
        user: {
          ...state.user,
          watchlist: state.user.watchlist.map(watchlist => {
            if (watchlist._id === action.watchlistID) {
              return {
                ...watchlist,
                movies: watchlist.movies.filter(movie => movie._id !== action.movieID),
              };
            }
            return watchlist;
          }),
        },
      };
    case "ADD_MOVIE_TO_WATCHLIST":
      localStorage.setItem("user", JSON.stringify({
        ...state,
        user: {
          ...state.user,
          watchlist: state.user.watchlist.map(watchlist => {
            if (watchlist._id === action.watchlistID) {
              return {
                ...watchlist,
                movies: [...watchlist.movies, action.movie],
              };
            }
            return watchlist;
          }),
        },
      }));
      return {
        ...state,
        user: {
          ...state.user,
          watchlist: state.user.watchlist.map(watchlist => {
            if (watchlist._id === action.watchlistID) {
              return {
                ...watchlist,
                movies: [...watchlist.movies, action.movie],
              };
            }
            return watchlist;
          }),
        },
      };
    case "SET_SUBTYPE":
      localStorage.setItem("user", JSON.stringify({...state.user, subtype: action.subtype}));
      return {
        ...state,
        user: {
          ...state.user,
          subtype: action.subtype,
        },
      };
    default:
      return state;
  }
};

export default reducer;

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
        token: tokenFromStorage,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "REMOVE_TOKEN":
      localStorage.removeItem("token");
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
      return {
        token: action.token,
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
    case "ADD_FAV":
      return {
        ...state,
        user: {
          ...state.user,
          fav: [...state.user.fav, action.movie],
        },
      };
    case "REM_FAV":
      return {
        ...state,
        user: {
          ...state.user,
          fav: state.user.fav.filter(item => item._id !== action.movie._id),
        },
      };
    case "CREATE_WATCHLIST":
      return {
        ...state,
        user: {
          ...state.user,
          watchlist: [...state.user.watchlist, action.watchlist],
        },
      };
    case "REMOVE_WATCHLIST":
      return {
        ...state,
        user: {
          ...state.user,
          watchlist: state.user.watchlist.filter(watchlist => watchlist._id !== action.watchlistID),
        },
      };
    default:
      return state;
  }
};

export default reducer;

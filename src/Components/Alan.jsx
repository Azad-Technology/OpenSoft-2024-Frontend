import {useEffect} from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import {useStateValue} from "../MyContexts/StateProvider";
const useAlan = handleFoundGenre => {
  const [{token, user}] = useStateValue();
  useEffect(() => {
    if (user?.subtype === "Gold") {
      alanBtn({
        key: "a2e30ce08222ef4aac4b4ef40bbcd5ca2e956eca572e1d8b807a3e2338fdd0dc/stage",
        onCommand: ({command, genres, genreOrCategory, query}) => {
          if (command === "chooseGenre") {
            const foundGenre = genres.find(g => g.name.toLowerCase() === genreOrCategory.toLowerCase());
            handleFoundGenre(foundGenre.name);
          } else if (command === "logout") {
            localStorage.removeItem("token");
            window.location.reload();
          } else if (command === "home") {
            window.location.replace("https://popkorn.tech");
          } else if (command === "pricing") {
            window.location.replace("https://popkorn.tech/pricing");
          } else if (command === "profile") {
            window.location.replace("https://popkorn.tech/profile");
          } else if (command === "buypremium") {
            window.location.replace("https://popkorn.tech/buyPremium");
          } else if (command === "search") {
            window.location.replace(`https://popkorn.tech/search/${query}`);
          } else if (command === "scrolltop") {
            window.scrollTo(0, 0);
          } else if (command === "goback") {
            window.history.back();
          } else if (command === "login") {
            window.location.replace("https://popkorn.tech/login");
          }
        },
      });
    }
  }, [user, token]);
};

export default useAlan;

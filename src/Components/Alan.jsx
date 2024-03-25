import {useEffect} from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
const useAlan = handleFoundGenre => {
  useEffect(() => {
    alanBtn({
      key: "a2e30ce08222ef4aac4b4ef40bbcd5ca2e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: ({command, genres, genreOrCategory, query}) => {
        if (command === "chooseGenre") {
          const foundGenre = genres.find(g => g.name.toLowerCase() === genreOrCategory.toLowerCase());
          handleFoundGenre(foundGenre.name);
        } else if (command === "logout") {
          localStorage.clear();
          window.location.reload();
        } else if (command === "home") {
          window.location.replace("http://localhost:5173");
        } else if (command === "pricing") {
          window.location.replace("http://localhost:5173/pricing");
        } else if (command === "profile") {
          window.location.replace("http://localhost:5173/profile");
        } else if (command === "buypremium") {
          window.location.replace("http://localhost:5173/buyPremium");
        } else if (command === "search") {
          window.location.replace(`http://localhost:5173/search/${query}`);
        } else if (command === "scrolltop") {
          window.scrollTo(0, 0);
        } else if (command === "goback") {
          window.history.back();
        } else if (command === "login") {
          window.location.replace("http://localhost:5173/login");
        }
      },
    });
  });
};

export default useAlan;

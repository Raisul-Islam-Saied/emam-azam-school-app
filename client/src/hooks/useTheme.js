import { useEffect, useState } from "react";

function useTheme() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(localStorage.getItem("dark") === "true" ? true : false);
    if (dark) {
      document.documentElement.classList.add("dark");
    }
  }, [dark]);
  const changeTheme = () => {
    if (dark === true) {
      localStorage.setItem("dark", false);
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");

      setDark(false);
    } else {
      localStorage.setItem("dark", true);
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  };
  return [dark, changeTheme];
}

export default useTheme;

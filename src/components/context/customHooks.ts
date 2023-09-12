import { useContext } from "react";
import { GithubContext } from "./GithubContext";
import { AlertContext } from "./AlertContext";

export const useGithub = () => {
  const context = useContext(GithubContext);

  if (!context) {
    throw new Error("useGithub must be used within a GithubProvider");
  }

  return context;
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within a AlertProvider");
  }

  return context;
};

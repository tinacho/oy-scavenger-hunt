import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
  useMemo,
} from "react";
import { GAME_MASTER } from "./constants";

function useSessionState() {
  // null => dont know yet (app not loaded)
  // true => yes
  // false => no
  const [loggedIn, setLoggedIn] = useState(null);

  const getSession = useCallback(
    () => ({
      teamId: window.localStorage.getItem("credentialsTeamId"),
      teamName: window.localStorage.getItem("credentialsTeamName"),
    }),
    []
  );

  // in next window is not defined on first render so we need to use an effect here to set the session
  useEffect(() => {
    const session = getSession();
    setLoggedIn(!!session.teamId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = useCallback(({ teamId, teamName }) => {
    window.localStorage.setItem("credentialsTeamName", teamName);
    window.localStorage.setItem("credentialsTeamId", teamId);
    setLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    window.localStorage.clear();
    setLoggedIn(false);
  }, []);

  return useMemo(
    () => ({
      isGameMaster: loggedIn && getSession().teamName === GAME_MASTER.name,
      loggedIn,
      getSession,
      login,
      logout,
    }),
    [loggedIn, getSession, login, logout]
  );
}

export function withSessionState(Component) {
  return function SessionStateConsumer(props) {
    const session = useSessionState();
    return <Component {...props} session={session}></Component>;
  };
}

export const SessionContext = createContext({
  loggedIn: null,
  teamId: null,
  teamName: null,
});

export const withSessionProvider = (Component) => {
  return function SessionProvider(props) {
    const { getSession, ...sessionState } = useSessionState();

    // app still loading in
    if (sessionState.loggedIn === null) {
      return null;
    }

    return (
      <SessionContext.Provider
        value={{ ...sessionState, session: getSession() }}
      >
        <Component {...props}></Component>
      </SessionContext.Provider>
    );
  };
};

export const useSessionContext = () => useContext(SessionContext);

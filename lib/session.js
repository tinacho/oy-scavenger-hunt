import { createContext, useCallback, useEffect, useState } from "react"

function useSessionState() {

  // null => dont know yet (app not loaded)
  // true => yes
  // false => no
  const [loggedIn, setLoggedIn] = useState(null) 

  const getSession = useCallback(() => ({
    teamId: window.localStorage.getItem("credentialsTeamId"),
    teamName: window.localStorage.getItem("credentialsTeamName")
  }), [])

  // in next window is not defined on first render so we need to use an effect here to set the session
  useEffect(() => {
    const session = getSession()
    setLoggedIn(!!session.teamId) 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const login = useCallback(({ teamId, teamName }) => {
    window.localStorage.setItem("credentialsTeamName", teamName);
    window.localStorage.setItem("credentialsTeamId", teamId);
    setLoggedIn(true)
  }, [])

  const logout = useCallback(() => {
    window.localStorage.clear()
    setLoggedIn(false)
  }, [])

  return {
    loggedIn,
    getSession,
    login,
    logout
  }
}

export const SessionContext = createContext({
  loggedIn: null,
  teamId: null,
  teamName: null
})

export const withSessionProvider = Component => {
  return function SessionProvider(props)  {

    const { loggedIn, getSession, login, logout } = useSessionState() 

    // app still loading in
    if(loggedIn === null) {
      return null
    }


    return (
      <SessionContext.Provider value={{ loggedIn, login, logout, session: getSession()}}>
        <Component {...props}></Component>
      </SessionContext.Provider>
    )
  }
}

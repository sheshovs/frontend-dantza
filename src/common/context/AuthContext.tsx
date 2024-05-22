import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '../types'
import API from '../api'

interface ContextProps {
  user: User | null
  isLoading: boolean
  isLogged: boolean
  logIn: (accessToken: string) => Promise<void>
  logOut: () => void
}

const AuthContext = createContext({} as ContextProps)

const initialState = {
  user: null,
  isLoading: false,
}

const AuthProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [state, setState] = useState(initialState)
  const { user, isLoading } = state

  const isLogged = user != null

  const logIn = async (accessToken: string): Promise<void> => {
    setState({ ...state, isLoading: true })
    localStorage.setItem(`dantza_token`, accessToken)
    validateUser()
  }

  function logOut(): void {
    localStorage.removeItem(`dantza_token`)
    setState({ ...state, user: null })
    window.location.href = `/login`
    return
  }

  async function validateUser(): Promise<void> {
    try {
      const { data: user } = await API.currentUser()
      setState({ ...state, user, isLoading: false })
    } catch (error) {
      setState({ ...state, user: null, isLoading: false })
      if (window.location.pathname === `/dashboard` && !user) {
        logOut()
      }
    }
  }
  useEffect(() => {
    validateUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isLogged,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = (): ContextProps => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}

export { AuthProvider, useAuth }

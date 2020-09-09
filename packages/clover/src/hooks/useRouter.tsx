import {useState} from 'react'

type Route = {
  [key: string]: boolean
}

type Routes = Route[] | Route

type UseRouter = (
  initial: Routes,
) => {
  active: string | null
  setActive: (active: string) => void
  routes: Routes
  setRoutes: (routes: Routes) => void
}

const useRouter: UseRouter = initial => {
  const [routes, setRoutes] = useState(initial)

  const active: string | null = routes
    ? Object.entries(routes)
        .filter(([, active]: [string, boolean]) => active)
        .pop()[0]
    : null

  const setActive = (route: string) => {
    setRoutes(
      Object.entries(routes).reduce(
        (acc, [name]) => ({
          ...acc,
          [name]: route == name ? true : false,
        }),
        routes,
      ),
    )
  }

  return {active, setActive, routes, setRoutes}
}

export {useRouter as default}

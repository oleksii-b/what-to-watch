import {useRouter} from 'next/router'
import {FC, useEffect, ComponentProps} from 'react'
import {useSelector, RootStateOrAny} from 'react-redux'
import {Route} from '../../../config'

const isRoutePublicOnly = (path): boolean =>
  new RegExp(`^${Route.SignUp}`).test(path)

const isRoutePrivate = (path): boolean =>
  new RegExp(`^${Route.Account}`).test(path)

const withAuth = function (Component): typeof Component {
  const WithAuth: FC<ComponentProps<typeof Component>> = function (props) {
    const router = useRouter()
    const user = useSelector((state: RootStateOrAny) => state.user)
    const isUserAuthorized = !!user.data && user.isLoaded
    const isUserUnauthorized = !user.data && user.isLoaded

    useEffect(function () {
      if (isRoutePrivate(router.route) && isUserUnauthorized) {
        router.replace(Route.Home)
      }

      if (isRoutePublicOnly(router.route) && isUserAuthorized) {
        router.replace(Route.Home)
      }
    }, [
      router.route,
      user.data,
      user.isLoaded,
    ])

    return <Component {...props} />
  }

  WithAuth.displayName =
    `WithAuth(${Component.displayName || Component.name || `Component`})`

  return WithAuth
}

export default withAuth

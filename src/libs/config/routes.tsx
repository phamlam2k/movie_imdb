import CatalogScreen from '../../screens/Catalog/CatalogScreen'
import HomeScreen from '../../screens/Home/HomeScreen'
import { Season } from '../../screens/Home/components/season'
import { Films } from '../../screens/Home/components/film'
import { RouteObject } from 'react-router-dom'
import RootLayout from '../providers/RootLayout'

const ROUTERS: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <HomeScreen />
      },
      {
        path: '/movie',
        element: <CatalogScreen type='movie' />
      },
      {
        path: '/movie/:id',
        element: <Films mediaType='movie' />
      },
      {
        path: '/movie/:idseason/:seasonNumber',
        element: <Season />
      },
      {
        path: '/tv/',
        element: <CatalogScreen type='tv' />
      },
      {
        path: '/tv/:id',
        element: <Films mediaType='tv' />
      },
      {
        path: '/tv/:id/season/:seasonNumber',
        element: <Season />
      },

      {
        path: '/search',
        element: <CatalogScreen type='search' />
      }
    ]
  }
]

export default ROUTERS

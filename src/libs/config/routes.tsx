import CatalogScreen from '../../screens/Catalog/CatalogScreen'
import HomeScreen from '../../screens/Home/HomeScreen'
import { Season } from '../../screens/Home/components/season'
import { Films } from '../../screens/Home/components/film'
import { RouteObject } from 'react-router-dom'

const ROUTERS: RouteObject[] = [
  {
    path: '/',
    element: <HomeScreen />
  },
  {
    path: '/movies',
    element: <CatalogScreen type='movie' />
  },
  {
    path: '/tv',
    element: <CatalogScreen type='tv' />,
    children: [
      {
        path: '/:id',
        element: <Films mediaType='tv' />,
        children: [
          {
            path: '/season/:seasonNumber',
            element: <Season />
          }
        ]
      }
    ]
  },
  {
    path: '/search',
    element: <CatalogScreen type='search' />
  }
]

export default ROUTERS

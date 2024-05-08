import CatalogScreen from "../../screens/Catalog/CatalogScreen";
import HomeScreen from "../../screens/Home/HomeScreen";

const ROUTERS = [
  {
    path: "/",
    element: <HomeScreen />,
  },
  {
    path: "/movies",
    element: <CatalogScreen type="movie" />,
  },
  {
    path: "/tv",
    element: <CatalogScreen type="tv" />,
  },
  {
    path: "/search",
    element: <CatalogScreen type="search" />,
  },
];

export default ROUTERS;

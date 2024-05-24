import CatalogScreen from "../../screens/Catalog/CatalogScreen";
import HomeScreen from "../../screens/Home/HomeScreen";
import { Season } from "../../screens/Home/components/season";
import { Films } from "../../screens/Home/components/film";

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
    element: <CatalogScreen type="tv" /> ,
  },
   {
    path: "/tv/:id",
    element: <Films mediaType="tv" />,
  },
  {
    path: "/tv/:id/season/:seasonNumber",
    element: <Season/>,
  },
  {
    path: "/search",
    element: <CatalogScreen type="search" />,
  },
];

export default ROUTERS;

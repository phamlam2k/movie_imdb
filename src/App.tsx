import ROUTERS from "./libs/config/routes";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter(ROUTERS);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;

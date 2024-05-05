import ROUTERS from "./libs/config/routes";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootProvider from "./libs/providers/RootProvider";

const routes = createBrowserRouter(ROUTERS);

function App() {
  return (
    <RootProvider>
      <div>
        <RouterProvider router={routes} />
      </div>
    </RootProvider>
  );
}

export default App;

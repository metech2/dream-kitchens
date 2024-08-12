import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Recipes from '../pages/Recipes';
import Settings from '../pages/Profiles';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import PrivateRoute from '../components/PrivateRoute';
import ManageRecipes from '../components/ManageRecipes';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/signin',
        element: <SignIn />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/recipes',
        element: <Recipes />,
      },
      {
        path: '/profile',
        element: (
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        ),
      },
      {
        path: '/manage-recipes',
        element: (
          <PrivateRoute>
            <ManageRecipes />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;

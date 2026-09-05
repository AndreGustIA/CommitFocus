import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { MainLayout } from './layout/MainLayout/MainLayout'
import { LandingPage } from './pages/LandingPage/LandingPage'
import { Tarefas } from './pages/Tarefas/Tarefas'
import { Historico } from './pages/Daily/Historico/Historico'
import { Daily } from './pages/Daily/Daily'
import { Dashboard } from './pages/Dashboard/Dashboard'
import { Login } from './pages/Login/Login'
import { Cadastro } from './pages/Cadastro/Cadastro'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },

  {
    path: '/login',
    element: <Login />,
  },

  {
    path: '/cadastro',
    element: <Cadastro />
  },

  {
    element: <MainLayout />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/tarefas',
        element: <Tarefas />,
      },
      {
        path: '/daily',
        element: <Daily />,
      },
      {
        path: '/daily/historico',
        element: <Historico />
      }

    ]
  }
])


function App() {
  return <RouterProvider router={router} />
}

export default App

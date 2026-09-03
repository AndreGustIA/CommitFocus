import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { MainLayout } from './layout/MainLayout/MainLayout'
import { LandingPage } from './pages/LandingPage/LandingPage'
import { Tarefas } from './pages/Tarefas/Tarefas'
import { Historico } from './pages/Daily/Historico/Historico'
import { Daily } from './pages/Daily/Daily'
import { Dashboard } from './pages/Dashboard/Dashboard'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,

    // Colocar o LOGIN e CADASTRO aqui
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

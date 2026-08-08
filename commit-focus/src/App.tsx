import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { MainLayout } from './layout/MainLayout/MainLayout'
import { Tarefas } from './pages/Tarefas/Tarefas'
import { Historico } from './pages/Daily/Historico/Historico'
import { Daily } from './pages/Daily/Daily'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <div>Página Inicial</div>,
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

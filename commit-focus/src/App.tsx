import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { MainLayout } from './layout/MainLayout/MainLayout'
import { Tarefas } from './pages/Tarefas/Tarefas'

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
        element: <div>Daily (Em breve)</div>,
      }
    ]
  }
])


function App() {
  return <RouterProvider router={router} />
}

export default App

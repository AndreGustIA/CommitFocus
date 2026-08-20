import style from './MainLayout.module.css';
import { Header } from "../../components/Header/Header";
import { useTheme } from '../../hooks/useTheme';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from '../../components/Footer/Footer';

export function MainLayout() {
  const { tema, alternarTema } = useTheme();
  const location = useLocation()

  const isDashboard = location.pathname === '/dashboard' || location.pathname === '/';

  return (
    <>
      <div className={style.containerMain}>
        <div className={isDashboard ? style.containerLayoutDashboard : style.containerLayout}>
          <Header
            tema={tema}
            alternarTema={alternarTema}
          />
          <hr />
          <main className={style.containerMenorLayout}>
            <div className={style.containerPages}>
              <div className={isDashboard ? style.pagesDashboard : style.pages}>
                <Outlet></Outlet>
              </div>  
            </div>
          </main>

          <div>
            <Footer />
          </div>
        </div>  
      </div> 
    </>
  )
}

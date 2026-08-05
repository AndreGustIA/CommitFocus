import style from './MainLayout.module.css';
import { Header } from "../../components/Header/Header";
import { useTheme } from '../../hooks/useTheme';
import { Outlet } from 'react-router-dom';
import { Footer } from '../../components/Footer/Footer';

export function MainLayout() {
  const { tema, alternarTema } = useTheme();

  return (
    <>
      <div className={style.containerMain}>
        <div className={style.containerLayout}>
          <Header
            tema={tema}
            alternarTema={alternarTema}
          />
          <hr />
          <main className={style.containerMenorLayout}>
            <div className={style.containerPages}>
              <div className={style.pages}>
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

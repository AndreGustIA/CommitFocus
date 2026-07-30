import style from './MainLayout.module.css';
import { Header } from "../../components/Header/Header";
import { InputAddTarefa } from '../../components/InputAddTarefa/InputAddTarefa';
import { Footer } from '../../components/Footer/Footer';
import { CardTarefa } from '../../components/CardTarefa/CardTarefa';

export function MainLayout() {
  return (
    <>
      <div className={style.containerMain}>
        <div className={style.containerLayout}>
          <Header />
          <InputAddTarefa />
          <hr />
          <CardTarefa />
          <hr />
          <Footer />
        </div>  
      </div> 
    </>
  )
}

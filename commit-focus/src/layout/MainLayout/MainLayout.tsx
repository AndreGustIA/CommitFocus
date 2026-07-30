import style from './MainLayout.module.css';
import { Header } from "../../components/Header/Header";
import { InputAddTarefa } from '../../components/InputAddTarefa/InputAddTarefa';

export function MainLayout() {
  return (
    <>
      <div className={style.containerMain}>
        <div className={style.containerLayout}>
          <Header />
          <InputAddTarefa />
          <hr />
        </div>  
      </div> 
    </>
  )
}

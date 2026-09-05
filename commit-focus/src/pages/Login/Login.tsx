import { useState } from 'react';
import style from './Login.module.css';

export function Login() {
  const [mostraSenha, setMostraSenha] = useState(false);

  const alternarVisibilidadeSenha = () => {
    setMostraSenha(!mostraSenha);
  };

  return (
    <div className={style.loginContainer}>
      <div className={style.loginForm}>
        <div className={style.loginHeader}>
          <h3>Faça login no CommitFocus</h3>
          <p>Entre com seu e-mail e senha cadastrados ou cadastre-se caso ainda não tenha uma conta.</p>
        </div>

        <form className={style.loginFormContainer}>
          <div className={style.loginInputContainer}>
            <input className={style.loginInput} type="text" id='emailInput' placeholder='' />
            <label className={style.loginLabel} htmlFor="emailInput">Email</label>
          </div>
          
          <div className={style.loginInputContainer}>
            <input 
              className={style.loginInput} 
              type={mostraSenha ? "text" : "password"} 
              id='senhaInput' 
              placeholder='' 
            />
            <label className={style.loginLabel} htmlFor="senhaInput">Senha</label>
            <span 
            className={`material-symbols-outlined ${style.toggleOlhoPassword}`}
            onClick={alternarVisibilidadeSenha}
            >
              {mostraSenha ? "visibility" : "visibility_off"}
            </span>
          </div>

          <button type='button' className={style.loginBtn}>login in</button>

          <div className={style.divisorLogin}>
            ou autorizar com
          </div>

          <div className={style.socialLogin}>
            <button>
              <span className='material-symbols-outlined'>g_mobiledata</span>
              <span>Google</span>
            </button>

            <button>
              <span className='material-symbols-outlined'>ios</span>
              <span>Apple</span>
            </button>
          </div>

          <div className={style.loginFooter}>
            <span>Esqueceu a senha?</span>
            <p>Não tem uma conta? <a href="/cadastro">Cadastre-se</a></p>
          </div>

        </form>
      </div>

    </div>
  )
}

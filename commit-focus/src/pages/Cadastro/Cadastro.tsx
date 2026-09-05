import { useState } from 'react';
import style from './Cadastro.module.css';

export function Cadastro() {
  const [mostraSenha, setMostraSenha] = useState(false);

  const alternarVisibilidadeSenha = () => {
    setMostraSenha(!mostraSenha);
  };

  return (
    <div className={style.cadastroContainer}>
      <div className={style.cadastroForm}>
        <div className={style.cadastroHeader}>
          <h3>Cadastre-se no CommitFocus</h3>
          <p>Preencha seus dados para criar sua conta no CommitFocus ou faça login se já for cadastrado.</p>
        </div>

        <form className={style.formContainer}>
          <div className={style.inputGroup}>
            <div className={style.inputContainer}>
              <input className={style.inputCadastro} type="text" id='nameInput' placeholder='' />
              <label className={style.labelCadastro} htmlFor="nameInput">Nome</label>
            </div>

            <div className={style.inputContainer}>
              <input className={style.inputCadastro} type="text" id='sobrenomeInput' placeholder='' />
              <label className={style.labelCadastro} htmlFor="sobrenomeInput">SobreNome</label>
            </div>
          </div>

          <div className={style.inputContainer}>
            <input className={style.inputCadastro} type="email" id='emailInput' placeholder='' />
            <label className={style.labelCadastro} htmlFor="emailInput">Email</label>
          </div>

          <div className={style.inputContainer}>
            <input 
              className={style.inputCadastro} 
              type={mostraSenha ? "text" : "password"} 
              id='senhaInput' 
              placeholder='' 
            />
            <label className={style.labelCadastro} htmlFor="senhaInput">Senha</label>
            <span 
              className={`material-symbols-outlined ${style.toggleOlhoPassword}`}
              onClick={alternarVisibilidadeSenha}
            >
              {mostraSenha ? "visibility" : "visibility_off"}
            </span>
          </div>

          <button type="submit" className={style.btnCadastro} >sing up</button>

          <div className={style.divisorCadastro}>
            ou autorizar com
          </div>

          <div className={style.socialCadastro}>
            <button>
              <span className='material-symbols-outlined'>g_mobiledata</span>
              <span>Google</span>
            </button>
            <button>
              <span className='material-symbols-outlined'>ios</span>
              <span>Apple</span>
            </button>
          </div>

          <p className={style.finalCadastro}>Já tem uma conta no CommitFocus? <a href="/login">Faça login</a></p>
        </form>
      </div>

    </div>
  )
}
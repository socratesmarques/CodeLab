import { useState} from 'react'
import './login.css'
import Input from '../components/Input.jsx'
function Login({ onLogin }){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mensagem, setMensagem] = useState('')
    const [tipoMensagem, setTipoMensagem] = useState('')
    const [mostrarSenha, setMostrarSenha] = useState(false)
            function enviarFormulario(event){
                event.preventDefault()
                if(email.trim() === ''){
                    setMensagem('Digite seu email')
                    setTipoMensagem('erro')
                    return
                }
                if(password.length < 6){
                    setMensagem('A senha precisa ter pelo menos 6 caracteres')
                    setTipoMensagem('erro')
                    return
                }
                onLogin(email.trim())
        }
    return(
        <main className="login-page">
            <section className="login-card">
                <h1>Login</h1>
                <form onSubmit={enviarFormulario}>
                <Input
                    label="E-mail:"
                    type="email"
                    id="email"
                    placeholder="Digite seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    label="Senha:"
                    type={mostrarSenha ? 'text' : 'password'}
                    id="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className='toggle-password' 
                type='button' 
                onClick={() => setMostrarSenha(!mostrarSenha)}
                >
                {mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}</button>
                <button className='login-button' type="submit">Entrar</button>
            </form>
            {mensagem && (
                 <p className={`mensagem ${tipoMensagem}`}>
                    {mensagem}
                </p>
            )}
            </section>
        </main>
    )
}

export default Login
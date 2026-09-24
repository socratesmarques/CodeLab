import { Link } from 'react-router'

function Home({ email, onLogout}) {
    return(
        <main>
            <h1>Bem-vindo</h1>
            <p>Você entrou como {email}.</p>
        <button type="button" onClick={onLogout}>Sair</button>
        <Link to="/posts">Ver Publicações</Link>
        </main>
    )
}
export default Home
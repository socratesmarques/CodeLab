function Home({ email, onLogout}) {
    return(
        <main>
            <h1>Bem-vindo</h1>
            <p>voce entrou como {email}.</p>
        <button type="button" onClick={onLogout}>Sair</button>
        </main>
    )
}
export default Home
import { useEffect, useState } from "react"
import { Link } from "react-router"
function Posts() {
    const[posts, setPosts] = useState([])
    const[carregando, setCarregando] = useState(true)
    const[erro, setErro] = useState('')
    const[busca, setBusca] = useState('')
    useEffect(() => {
        const controller = new AbortController()
        async function buscarPosts(){
            try{
                const resposta = await fetch(
                    'https://jsonplaceholder.typicode.com/posts?_limit=10',
                    {signal: controller.signal},
                )
                if(!resposta.ok){
                    throw new Error('Não foi possível carregar os posts.')
                }
                const dados = await resposta.json()
                setPosts(dados)
            } catch(error){
                if(error.name !== 'AbortError'){
                    setErro(error.message)
                }
            } finally{
                if (!controller.signal.aborted){
                    setCarregando(false)
                }
            }
        }
        buscarPosts()
        return() => {
            controller.abort()
        }
    }, [])
    if(carregando){
        return <p>Carregando...</p>
    }
    if(erro){
        return <p>{erro}</p>
    }
    const postsFiltrados = posts.filter((post) =>{
        return post.title
        .toLowerCase()
        .includes(busca.toLowerCase())
    })
    return(
        <main>
            <h1>Publicações</h1>
            <Link to="/home">Voltar</Link>
            <label htmlFor="busca">Pesquisar: </label>
            <input
            id="busca"
            type="search"
            placeholder="Digite parte do título"
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
            />
            {postsFiltrados.length === 0 && (
                <p>Nenhuma publicação encontrada.</p>
            )}
            <ul>
                {postsFiltrados.map((post) => (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                    </li>
            ))}
            </ul>

        </main>
    )
}
export default Posts
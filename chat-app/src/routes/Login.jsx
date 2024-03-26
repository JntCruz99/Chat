import React, { useEffect , useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [nome, setNome] = useState('');
    const navigate = useNavigate();

    const createPost = async (e) => {
        e.preventDefault();
        localStorage.setItem('nome', nome);
        navigate('/home');
    }


    useEffect(() => {
        document.title = 'Login';
        if (localStorage.getItem('nome')) {
          navigate('/home');
        }
      }, [navigate]);

    return (
        <>
            <div className='container'>
                <h1>CADASTRO</h1>
                <div className='form-usuarios'>
                    <form onSubmit={(e) => createPost(e)}>
                        <fieldset className="fieldset">
                            <legend>Faça o cadastro do usuário</legend>
                            <div className="form-group">
                                <label for="nomeUsuario">Nome do Usuário:</label>
                                <input type="text" id="nomeUsuario" className="form-control" value={nome} placeholder="Digite o nome do Usuário" onChange={(e) => setNome(e.target.value)} required/>
                            </div>
                            <button type="submit" className="btn btn-primary">Salvar</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
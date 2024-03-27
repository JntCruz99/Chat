import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import blogFetch from "../axios/config";
import './Login.css';

const Login = () => {
    const [nome, setNome] = useState('');
    const [id, setId] = useState('');
    const navigate = useNavigate();

    const createPost = async (e) => {
        e.preventDefault();
        const post = {
            name: nome,
        };
        try {
            const response = await blogFetch.post('/chats', post);
            localStorage.setItem('nome', response.data.name);
            localStorage.setItem('id', response.data.id);
            navigate('/home');
        } catch (error) {
            console.log(error)
        }

    }
    const getUser = async (e) =>{
        e.preventDefault();
        try {
            const response = await blogFetch.get(`/chats/user/${id}`);
            localStorage.setItem('nome', response.data.name);
            localStorage.setItem('id', response.data.id);
            navigate('/home');
        } catch (error) {
            console.log(error)
        }
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
                                <input type="text" id="nomeUsuario" className="form-control" value={nome} placeholder="Digite o nome do Usuário" onChange={(e) => setNome(e.target.value)} required />
                            </div>
                            <button type="submit" className="btn btn-primary">Salvar</button>
                        </fieldset>
                    </form>
                </div>
                <h1>ENTRE COM SEU ID:</h1>
                <div className='form-usuarios'>
                    <form onSubmit={(e) => getUser(e)}>
                        <fieldset className="fieldset">
                            <legend>Entre com Id do usuario</legend>
                            <div className="form-group">
                                <label for="nomeUsuario">Seu ID:</label>
                                <input type="text" id="nomeUsuario" className="form-control" value={id} placeholder="Digite seu Id" onChange={(e) => setId(e.target.value)} required />
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
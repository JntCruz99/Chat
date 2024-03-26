import React, { useEffect, useState } from 'react'
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [nome] = useState(localStorage.getItem('nome'));
  const [id] = useState(1);
  const [chat] = useState([
    {
      id: 1,
      user: 'Jonatas',
      lastMensage: 'olá tudo bem?',
      mensagemView: false,
      time: '15:50'
    },
    {
      id: 2,
      user: 'Lucas',
      lastMensage: 'iae?',
      mensagemView: false,
      time: '16:50'
    }
  ])

  function logout() {
    localStorage.removeItem('nome');
    navigate('/');
  }

  useEffect(() => {
    document.title = 'Home';
    if (!localStorage.getItem('nome')) {
      navigate('/');
    }
  }, [navigate]);
  return (
    <div className='chat'>
      <div className='colum-1'>
        <div className='userMenu'>
          <span>{nome} - #{id}</span>
          <button onClick={logout}>logout</button>
        </div>
        <div className='searchUser'>
          <input type="text" />
          <button>5</button>
        </div>
        <div className='UserChats'>
          {chat.map(usuario => (
            <div key={usuario.id} className='internalBox'>
              <div className='fotoPerfil' style={{width:'15%'}} >
                <span  style={{
                  display: 'flex', 
                  alignItems: 'center' , 
                  height:'100%', 
                  textAlign:'center',
                  justifyContent:'center'
                  }}>logo</span>
              </div>
              <div className='lastMensage'>
                <span>{usuario.user}</span>
                <span>{usuario.lastMensage}</span>
              </div>
              <div>
                <span>{usuario.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='colum-2'>
        <div>
          <span>Bem-Vindo</span>
        </div>
      </div>
    </div>
  )
}

export default Home
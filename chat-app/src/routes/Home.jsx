import React, { useEffect, useState } from 'react';
import './Home.css';
import blogFetch from '../axios/config';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: localStorage.getItem('nome'),
    id: parseInt(localStorage.getItem('id'))
  });
  const [chat, setChat] = useState([]);
  const [hoveredUser, setHoveredUser] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [chatTexto, setChatTexto] = useState([]);
  const [mensagemTexto, setMensagemTexto] = useState('');
  const [idChat, setIdChat] = useState('');

  const getFeed = async () => {
    try {
      const response = await blogFetch.get(`/chats/userChats/${user.id}`);
      setChat(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getChat = async (chatId, userId, titulo) => {
    try {
      const response = await blogFetch.get(`/chats/chat/${chatId}/user/${userId}`);
      setTitulo(titulo.toUpperCase());
      setIdChat(chatId);
      setChatTexto(response.data.mensagems);
    } catch (error) {
      console.log(error);
    }
  };

  const enviarMensagem = async (e) => {
    e.preventDefault();
    const post = { texto: mensagemTexto };
    try {
      await blogFetch.post(`/chats/chat/${idChat}/user/${user.id}`, post);
      setMensagemTexto('');
      getChat(idChat, user.id, titulo);
      getFeed();
    } catch (error) {
      console.log(error);
    }
  };

  const handleMouseEnter = (userId) => {
    setHoveredUser(userId);
  };

  const handleMouseLeave = () => {
    setHoveredUser(null);
  };

  const logout = () => {
    localStorage.removeItem('nome');
    navigate('/');
  };

  useEffect(() => {
    getFeed();
    document.title = 'Home';
    if (!user.name && !user.id) {
      navigate('/');
    }
  }, [navigate, user]);

  return (
    <div className='chat'>
      <div className='colum-1'>
        <div className='userMenu'>
          <span>USER: {user.name} - #{user.id}</span>
          <a className='logout' onClick={logout}>
            <svg width='25px' height='25px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <g id='SVGRepo_bgCarrier' strokeWidth='0' />
              <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round' />
              <g id='SVGRepo_iconCarrier'>
                <path
                  d='M10 12H20M20 12L17 9M20 12L17 15'
                  stroke='#ffffff'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M4 12C4 7.58172 7.58172 4 12 4M12 20C9.47362 20 7.22075 18.8289 5.75463 17'
                  stroke='#ffffff'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                />
              </g>
            </svg>
          </a>
        </div>
        <div className='searchUser'>
          <input type='text' />
          <button>
            <svg width='20px' height='20px' fill='none' xmlns='http://www.w3.org/2000/svg' stroke='#ffffff' transform='rotate(0)'>
              <g id='SVGRepo_bgCarrier' strokeWidth='0' />
              <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round' stroke='#CCCCCC' strokeWidth='0.048' />
              <g id='SVGRepo_iconCarrier'>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M15 10.5C15 12.9853 12.9853 15 10.5 15C8.01472 15 6 12.9853 6 10.5C6 8.01472 8.01472 6 10.5 6C12.9853 6 15 8.01472 15 10.5ZM14.1793 15.2399C13.1632 16.0297 11.8865 16.5 10.5 16.5C7.18629 16.5 4.5 13.8137 4.5 10.5C4.5 7.18629 7.18629 4.5 10.5 4.5C13.8137 4.5 16.5 7.18629 16.5 10.5C16.5 11.8865 16.0297 13.1632 15.2399 14.1792L20.0304 18.9697L18.9697 20.0303L14.1793 15.2399Z'
                  fill='#ffffff'
                />
              </g>
            </svg>
          </button>
        </div>
        <div className='UserChats'>
          {chat.map((usuario) => (
            <div
              key={usuario.id}
              className='internalBox'
              onClick={() => getChat(usuario.chatId, usuario.mensagem.usuario.id, usuario.mensagem.usuario.name)}
              onMouseEnter={() => handleMouseEnter(usuario.mensagem.id)}
              onMouseLeave={handleMouseLeave}
              style={{ backgroundColor: hoveredUser === usuario.mensagem.id ? '#888' : '#555' }}
            >
              <div className='fotoPerfil' style={{ width: '15%' }}>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                    textAlign: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    color: 'red',
                    marginRight: '10px',
                    marginLeft: '5px',
                    fontWeight: 'bolder'
                  }}
                >
                  L
                </span>
              </div>
              <div className='lastMensage'>
                <span className='nameMensage'>{usuario.mensagem.usuario.name}</span>
                <span className={usuario.mensagem.lida ? 'lastMensagem' : 'lastMensagem active'}>{usuario.mensagem.texto}</span>
              </div>
              <div className='time'>
                <span className={usuario.mensagem.lida ? 'timeSpan' : 'timeSpan active'}>12:30</span>
                {!usuario.mensagem.lida && <span style={{ color: 'rgb(76, 241, 71)', fontSize: '20px' }}>•</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='colum-2'>
        <div className='inv'>
          <span>Bem-Vindo</span>
        </div>
        <div className='chatBox'>
          <div className='titleChat'>
            <span>{titulo}</span>
          </div>
          <div className='feedChat'>
            {chatTexto.map((chat) => (
              <div key={chat.id} className={chat.usuario.id === user.id ? 'minha' : 'dele'}>
                <span>{chat.texto}</span>
              </div>
            ))}
          </div>
          <div className='inputChat'>
            <form onSubmit={(e) => enviarMensagem(e)}>
              <input type='text' value={mensagemTexto} onChange={(e) => setMensagemTexto(e.target.value)} required />
              <button type='submit' className='buttonInputChat'>
                enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

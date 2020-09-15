import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './styles.css'

import api from '../../service/api';

import logo from '../../assets/baner.png';
import mochila from '../../assets/mochila.png';
import indicador from '../../assets/indicador.png';
import camera from '../../assets/camera.png';

interface Imagem {
    _id: string;
    name: string;
    size: number;
    key: string;
    url: string;
    createAt: string;
    __v: number;
}

const Home = () => {
    const [imagens, setImagens] = useState<Imagem[]>([]);
    const [baner, setBaner] = useState(logo);
    const [contador, setContador] = useState(0);

    //Carrega imagens assim que a tela for chamada.
    useEffect(() => {
        buscaImagensSalvas();
    }, [])

    //Timer para controle do slide.
    setTimeout(() => {
        controlaSlide();
    }, 5000)

    //Método responsável por buscar imagens.
    function buscaImagensSalvas() {
        api.get('/posts').then(response => {
            setImagens(response.data);
        })
    }

    //Método responsável por controlar exição do Slide.
    function controlaSlide() {
        if (imagens.length > 0) {
            if (imagens.length > contador) {
                var imagem = imagens[contador];
                setBaner(imagem.url);
                setContador(contador + 1);
            } else {
                setBaner(logo);
                setContador(0);
            }
        }
    }

    return (
        <div>

            <div className="container-baner">
                <img src={baner} className="baner" />
            </div>

            <div>
                <p className="titulo">Galeria Plathanus</p>


                <div className="camera">
                    <Link to="/imagem">
                        <img src={camera} className="icone-camera" />
                    </Link>
                    <p className="descricao-icone">Adicionar imagem</p>
                </div>

                <div className="mochila">
                    <img src={mochila} className="icone-mochila" />
                    <p className="descricao-icone">Imagens salvas</p>
                </div>

                <div className="indicador">
                    <img src={indicador} className="icone-indicador" />
                    <p className="descricao-indicador">Alcance de suas imagens</p>
                </div>

            </div>

        </div>
    );
}

export default Home;
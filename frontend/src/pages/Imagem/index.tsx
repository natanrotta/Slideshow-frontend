import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Dropzone from '../../components/Dropzone/index';

import './styles.css'

import api from '../../service/api';

interface Imagem {
    _id: string;
    name: string;
    size: number;
    key: string;
    url: string;
    createAt: string;
    __v: number;
}

const Imagem = () => {
    const [arquivoSelecionado, setArquivoSelecionado] = useState<File>();
    const [imagens, setImagens] = useState<Imagem[]>([]);

    useEffect(() => {
        buscaImagensSalvas();
    }, [imagens])

    //Método responsável por buscar imagens.
    function buscaImagensSalvas() {
        api.get('/posts').then(response => {
            setImagens(response.data);
        })
    }

    //Método responsável por salvar uma imagem.
    function salvarimagem(file: any) {
        const imagem = new FormData();
        imagem.append("file", file)

        api.post('/posts', imagem);

        alert('Imagem salva com sucesso!')
    }

    //Método responsável por remover uma imagem pelo ID.
    function removerImagem(idImagem: any) {
        api.delete(`/posts/${idImagem}`)
        alert('Imagem deletada com sucesso!')
    }

    return (
        <div className="container">
            
            <Dropzone arquivoEnviado={setArquivoSelecionado} />

            <div className="container-botao">

                <Link to="/">
                    <button className="botao-voltar">
                        Voltar para Home
                </button>
                </Link>

                <button className="botao-salvar" onClick={() => salvarimagem(arquivoSelecionado)}>
                    Salvar Imagem
                </button>
            </div>

            <div className="container-imagens">

                <div>
                    <h1 className="titulo-imagens">
                        Imagens salvas
                    </h1>

                    {
                        imagens.map(imagem => (
                            <div className="imagens">
                                <img src={imagem.url} className="imagem" />
                                <button className="botao-remover" onClick={() => removerImagem(imagem._id)}>
                                    Deletar Imagem
                                </button>
                            </div>
                        ))
                    }

                </div>

            </div>


        </div>
    );
}

export default Imagem;
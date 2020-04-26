import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import logoimg from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => (
    <Container>
        <Content>
            <img src={logoimg} alt="GoBarber" />
            <form>
                <h1>Faça seu logon</h1>

                <input placeholder="Digite seu email" type="text" />

                <input placeholder="Senha" type="password" />

                <button type="submit">Entrar</button>
                <a href="forgot">Esqueci minha senha</a>
            </form>
            <a href="login">
                <FiLogIn />
                Criar conta
            </a>
        </Content>
        <Background />
    </Container>
);
export default SignIn;

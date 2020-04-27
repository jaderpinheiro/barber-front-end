import React from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import logoimg from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => (
    <Container>
        <Content>
            <img src={logoimg} alt="GoBarber" />
            <form>
                <h1>Faça seu cadastro</h1>

                <Input name="name" icon={FiUser} placeholder="Nome" />
                <Input
                    name="email"
                    icon={FiMail}
                    placeholder="Digite seu email"
                    type="E-mail"
                />
                <Input
                    name="password"
                    icon={FiLock}
                    placeholder="Senha"
                    type="password"
                />

                <Button type="submit">Cadastrar</Button>
            </form>
            <a href="login">
                <FiArrowLeft />
                Voltar para login
            </a>
        </Content>
        <Background />
    </Container>
);
export default SignUp;

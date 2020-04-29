import React, { useRef, useCallback } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';
import logoimg from '../../assets/logo.png';
import { Container, Content, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

interface SignInFormData {
    email: string;
    password: string;
}
const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { signIn } = useAuth();
    const { addToast } = useToast();
    const handleSubmit = useCallback(
        async (data: SignInFormData) => {
            try {
                formRef.current?.setErrors({});
                const schema = Yup.object().shape({
                    email: Yup.string()
                        .required('E-mail obrigatório')
                        .email('Digite um email válido'),
                    password: Yup.string().required('Senha obrigatória'),
                });
                await schema.validate(data, {
                    abortEarly: false,
                });
                await signIn({
                    email: data.email,
                    password: data.password,
                });
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);
                }
                addToast({
                    type: 'error',
                    title: 'Erro na autenticação',
                    description:
                        'Ocorreu erro ao fazer login, cheque as credenciais.',
                });
            }
        },
        [signIn, addToast],
    );

    return (
        <Container>
            <Content>
                <img src={logoimg} alt="GoBarber" width="450" />
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Faça seu logon</h1>

                    <Input
                        name="email"
                        icon={FiMail}
                        placeholder="Digite seu email"
                    />

                    <Input
                        name="password"
                        icon={FiLock}
                        placeholder="Senha"
                        type="password"
                    />

                    <Button type="submit">Entrar</Button>
                    <a href="forgot">Esqueci minha senha</a>

                    <a href="login">
                        <FiLogIn />
                        Criar conta
                    </a>
                </Form>
            </Content>
            <Background />
        </Container>
    );
};
export default SignIn;

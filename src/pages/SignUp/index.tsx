import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';
import logoimg from '../../assets/logo.png';
import { Container, Content, AnimationContainer, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}
const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();
    const handleSubmit = useCallback(
        async (data: SignUpFormData) => {
            try {
                formRef.current?.setErrors({});
                const schema = Yup.object().shape({
                    name: Yup.string().required('Nome obrigatório'),
                    email: Yup.string()
                        .required('E-mail obrigatório')
                        .email('Digite um email válido'),
                    password: Yup.string().min(6, 'No mínimo 6 dígitos'),
                });
                await schema.validate(data, {
                    abortEarly: false,
                });
                await api.post('/users', data);
                history.push('/');
                addToast({
                    type: 'success',
                    title: 'Cadastro realizado com sucesso!',
                    description: ' já pode fazer seu logon no GoBarber!',
                });
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);
                }
                addToast({
                    type: 'error',
                    title: 'Erro no cadastro',
                    description:
                        'Ocorreu erro ao fazer o cadastro, tente novamente.',
                });
            }
        },
        [addToast, history],
    );
    return (
        <Container>
            <Background />
            <Content>
                <AnimationContainer>
                    <img src={logoimg} alt="GoBarber" width="380" />
                    <Form ref={formRef} onSubmit={handleSubmit}>
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
                        <Link to="/">
                            <FiArrowLeft />
                            Voltar para login
                        </Link>
                    </Form>
                </AnimationContainer>
            </Content>
        </Container>
    );
};
export default SignUp;

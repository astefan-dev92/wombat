import React, { useState } from 'react';

import fetchJson, { FetchError } from 'lib/fetchJson';
import useUser from 'lib/useUser';

import Layout from 'components/Layout';
import Form from 'components/LoginForm';

const Login = () => {
    const { mutateUser } = useUser({
        redirectTo: '/',
        redirectIfFound: true,
    });

    const [errorMsg, setErrorMsg] = useState('');

    const submitUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const body = {
            username: event.currentTarget.username.value,
            password: event.currentTarget.password.value,
        };

        try {
            mutateUser(
                await fetchJson('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                })
            );
        } catch (error) {
            if (error instanceof FetchError) {
                setErrorMsg(error.data.message);
            } else {
                console.error('An unexpected error happened:', error);
            }
        }
    };

    return (
        <Layout title="Login">
            <div className="login">
                <Form errorMessage={errorMsg} onSubmit={submitUser} />
            </div>
            <style jsx>{`
                .login {
                    max-width: 21rem;
                    margin: 0 auto;
                    padding: 1rem;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }
            `}</style>
        </Layout>
    );
};

export default Login;

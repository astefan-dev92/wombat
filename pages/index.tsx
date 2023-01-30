import Layout from 'components/Layout';

import useUser from 'lib/useUser';

export default function Home() {
    const { user } = useUser({
        redirectTo: '/login',
    });

    return (
        <Layout title="Index">
            {user && <h1>Welcome, {user.name}!</h1>}
            {!user && <h1>Hello, please log in!</h1>}
        </Layout>
    );
}

import { useRouter } from 'next/router';

import { useForm } from 'react-hook-form';

import Layout from 'components/Layout';

const Register = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    const handleSignUp = async (formData: any) => {
        await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify(formData),
        });

        reset();

        router.push('/login');
    };

    return (
        <Layout title="Register">
            <div className="flex flex-col w-full max-w-sm space-y-3">
                <h1 className="font-bold text-xl">Sign Up</h1>
                <form
                    className="flex flex-col w-full space-y-3"
                    onSubmit={handleSubmit(handleSignUp)}
                >
                    <div className="flex flex-col w-full space-y-1">
                        <input
                            {...register('name', { required: true })}
                            className="px-5 py-3 border border-yellow-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            disabled={isSubmitting}
                        />
                        {errors.name && (
                            <span className="text-xs text-gray-700">
                                Full Name is required
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col w-full space-y-1">
                        <input
                            {...register('username', { required: true })}
                            className="px-5 py-3 border border-yellow-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                            type="text"
                            name="username"
                            placeholder="Username"
                            disabled={isSubmitting}
                        />
                        {errors.username && (
                            <span className="text-xs text-gray-700">
                                Username is required
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col w-full space-y-1">
                        <input
                            {...register('password', { required: true })}
                            className="px-5 py-3 border border-yellow-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                            type="password"
                            name="password"
                            placeholder="Password"
                            disabled={isSubmitting}
                        />
                        {errors.password && (
                            <span className="text-xs text-gray-700">
                                Password is required
                            </span>
                        )}
                    </div>
                    <button
                        className="px-5 py-3 border border-yellow-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        Register
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default Register;

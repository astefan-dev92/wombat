import { FormEvent } from 'react';

export default function Form({
    errorMessage,
    onSubmit,
}: {
    errorMessage: string;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}) {
    return (
        <form onSubmit={onSubmit}>
            <div className="wrapper wrapper--padding-20">
                <label
                    className="form-label form-label--left-align"
                    htmlFor="username-input"
                >
                    Username/email
                </label>
                <input type="text" name="username-input" id="username" />
            </div>
            <div className="wrapper wrapper--padding-20">
                <label
                    className="form-label form-label--left-align"
                    htmlFor="password"
                >
                    Password
                </label>
                <input
                    className="tsl-form-field tsl-form-field--center tsl-form-field--medium-width"
                    type="password"
                    name="password"
                    id="password"
                />
            </div>
            <div className="wrapper wrapper--padding-20">
                <button type="submit">Login</button>
            </div>

            {errorMessage && <p className="error">{errorMessage}</p>}

            <style jsx>{`
                form,
                label {
                    display: flex;
                    flex-flow: column;
                }
                label > span {
                    font-weight: 600;
                }
                input {
                    padding: 8px;
                    margin: 0.3rem 0 1rem;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }
                .error {
                    color: brown;
                    margin: 1rem 0 0;
                }
            `}</style>
        </form>
    );
}

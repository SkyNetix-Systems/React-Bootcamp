const LoginForm = ({
    handleSubmit,
    email,
    setEmail,
    password,
    setPassword,
}) => (
    <form onSubmit={handleSubmit} className="mt-3">
        <div className="form-group mb-3">
            <label className="form-label">Email Address</label>
            <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
                autoComplete="email"
            />
        </div>

        <div className="form-group mb-3">
            <label className="form-label">Password</label>
            <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
            />
        </div>

        <div className="text-center">
            <button
                disabled={!email || !password}
                type="submit"
                className="btn btn-primary"
            >
                Login
            </button>
        </div>
    </form>
);

export default LoginForm;

const HeaderComponent = () => {
    return (
        <header>
            <nav className="w-full flex flex-wrap items-center justify-between">
                <ul className="flex flex-row w-full gap-2">
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/dashboard">Dashboard</a>
                    </li>
                    <li>
                        <a href="/api/auth/signin">Login</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default HeaderComponent;
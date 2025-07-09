const HomeLayout = ({ children }) => {
    return (
        <div>
            <header>Home Layout</header>
            <main>{children}</main>
            <footer>Home Footer</footer>
        </div>
    );
};

export default HomeLayout;
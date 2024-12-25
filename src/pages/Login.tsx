const Login = () => {
    return (
        <div>
            <form action="">
                <div className="formGroup">
                    <label htmlFor="">Usuario: </label>
                    <input id="username" name="username" type="text" />
                </div>
                <div className="formGroup">
                    <label htmlFor="">Contraseña: </label>
                    <input id="password" name="password" type="password" />
                </div>
                <button type="submit">Ingresar</button>
            </form>
            </div>
    )
}

export default Login
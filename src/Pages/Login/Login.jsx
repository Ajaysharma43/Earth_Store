const Login = () => {
    return(
        <>
        <div>
            <form action="" onSubmit={(e) => e.preventDefault()}>

                <label htmlFor="">Name
                <input type="text" />
                </label>

                <label htmlFor="">Password
                    <input type="text" />
                </label>

                <label htmlFor="">Phone Number
                    <input type="number" />
                </label>

                <button type="submit">Submit</button>
            </form>
        </div>
        </>
    )
}

export default Login
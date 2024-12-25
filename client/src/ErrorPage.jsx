import Footer from "./components/Footer";

const ErrorPage = () =>{
    return(
        <div>
            <div style={{ width: '500px', height: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <h1>Oops.</h1>
                <h3>Sorry, Page does not exist!</h3>
            </div>
            <Footer />
        </div>

    )
}

export default ErrorPage;
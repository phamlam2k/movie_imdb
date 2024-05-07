import { BrowserRouter } from "react-router-dom"
import Footer from "../layout/Footer"
import Header from "../layout/Header"
import Body from "../layout/Body"
import MovieList from "../api/api"

export const AppContainer = () => {
    return (
        <BrowserRouter>
            <Header/>
            <Footer/>
            <Body/>
            <MovieList/>
        </BrowserRouter>

    )
}


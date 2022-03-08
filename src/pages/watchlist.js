import Layout from "../components/Layout";
import {Container,} from "@chakra-ui/react";
import MovieList from "../components/MovieList";

export default function History() {

    return (
        <Layout title="Watchlist">
            <Container>
                <MovieList listName='watchlist' apiRoute='watchlist' />
            </Container>
        </Layout>
    );

}

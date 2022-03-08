import Layout from "../components/Layout";
import { Container } from "@chakra-ui/react";
import MovieList from "../components/MovieList";

export default function History() {

    return (
        <Layout title="History">
            <Container>
                <MovieList listName='history' apiRoute='history'/>
            </Container>
        </Layout>
    );

}
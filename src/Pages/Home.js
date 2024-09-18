import React, {useState} from "react";
import {Container, CssBaseline} from "@mui/material";
import Typography from "@mui/material/Typography";
import '../styles/App.css';
import {Image, Col, Row, Button} from "react-bootstrap";
import Box from "@mui/material/Box";
import general from '../components/photo/general.jpg'
import dumpling from "../components/photo/dumpling.png"
// import Button from "@mui/material/Button";

const Home = () => {

    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);


    return (
        <>
            <CssBaseline />
            <div className="App">
                <main>
                    <div style={{
                        backgroundImage: `url(${dumpling})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        width: "100%",
                        height: "100vh",
                        opacity: "80%",
                    }}>
                        {/*<Image id="cashew" src={dumpling} width='100%' rounded/>*/}

                        <Container maxWidth='sm' id={"container"}>

                            <Typography variant='h6' align='left' color='#3c342c' >Welcome to</Typography>
                            <Typography variant='h2' align='left' color='#3c342c' gutterBottom fontWeight={"bold"} word-wrap={"break-word"}>
                                Ming
                                House
                            </Typography>


                            <Typography variant='h8' align='left' color='#3c342c' paragraph>
                                Located at 217A Chandler St, Worcester MA 01609,
                                We offer a wide range of delicious Chinese Cuisine.
                            </Typography>

                            <Row>
                                <Col xs={3}><Button href="#" className="rounded-pill button">Link</Button></Col>
                                <Col xs={3}><Button type="submit" className="rounded-pill button">Button</Button></Col>
                                <Col xs={3}><Button href="#" className="rounded-pill button">Link</Button></Col>
                                <Col xs={3}></Col>
                            </Row>


                            {/*<Row id={"title"}>*/}
                            {/*    <Col xs={6}>*/}

                            {/*        /!*<Image id="general" src={general} width='85%' roundedCircle/>*!/*/}
                            {/*        <div id={"icon"}>*/}
                            {/*            /!*<Box component="section" id={"icon"} >*!/*/}
                            {/*            /!*</Box>*!/*/}

                            {/*            <Image id="general" src={general} width='100%' roundedCircle/>*/}

                            {/*        </div>*/}

                            {/*    </Col>*/}

                            {/*    <Col xs={4}>*/}
                            {/*        <Typography variant='h6' align='left' color='textPrimary' >Welcome to</Typography>*/}
                            {/*        <Typography variant='h2' align='left' color='textPrimary' gutterBottom fontWeight={"bold"} word-wrap={"break-word"}>*/}
                            {/*            Ming*/}
                            {/*            House*/}
                            {/*        </Typography>*/}


                            {/*        <Typography variant='h8' align='left' color='textSecondary' paragraph>*/}
                            {/*            Located at 217A Chandler St, Worcester MA 01609,*/}
                            {/*            We offer a wide range of delicious Chinese Cuisine.*/}
                            {/*        </Typography>*/}

                            {/*        <Row>*/}
                            {/*            <Col xs={3}><Button href="#" className="rounded-pill button">Link</Button></Col>*/}
                            {/*            <Col xs={3}><Button type="submit" className="rounded-pill button">Button</Button></Col>*/}
                            {/*            <Col xs={3}><Button href="#" className="rounded-pill button">Link</Button></Col>*/}
                            {/*            <Col xs={3}></Col>*/}
                            {/*        </Row>*/}
                            {/*    </Col>*/}
                            {/*</Row>*/}


                        </Container>
                    </div>
                </main>


            </div>
        </>
    );
}

export default Home;

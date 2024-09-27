import MenuCard from "./MenuCard";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {useState} from "react";
import Image from 'react-bootstrap/Image';
import "../styles/menuPopup.css"
import '../styles/fonts.css';

// import dumpling from "/"

const MenuPopup = (props) => {

    const [show, setShow] = useState(false)
    const [count, setCount] = useState(1)


    let sizes = props.size.split(",")
    let prices = props.price.split(",")
    let items = []

    for (let i = 0; i < sizes.length; i++){
        items.push(i);
    }
    const [total, setTotal] = useState(prices[0])
    

    return (
        <>

            <Modal show={props.show}
                   onHide={props.onClose}
                // cancel={props.onClose}
                   backdrop="static"
                   keyboard={false}
                   size="lg"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered
                   className={"popup teko"}
                   onClick={e => e.stopPropagation()}
            >

                <Modal.Header closeButton={true}>
                    <Modal.Title>{props.name}</Modal.Title>
                </Modal.Header>

                <Modal.Body style={{margin: "auto"}}>
                    <Image src={"/images/" + props.number + ".png"} className={"menuImg"}
                           style={{width: "100%",
                               margin: "auto"}}
                           rounded />
                </Modal.Body>

                <Modal.Body>
                    <Form style={{width: "80%",
                        margin: "auto"
                    }}>

                        {

                            items.map(current => {

                            if (current === 0){
                                return <Form.Check
                                    id={current}
                                    name={"options"}
                                    type={"radio"}
                                    label={sizes[current] + ": $" + prices[current]}
                                    value={prices[current]}
                                    checked={total === prices[current]}
                                    onChange={() => setTotal(prices[current])}
                                    defaultChecked
                                />
                            }
                            else{
                                return <Form.Check
                                    id={current}
                                    name={"options"}
                                    type={"radio"}
                                    value={prices[current]}
                                    label={sizes[current] + ": $" + prices[current]}
                                    checked={total === prices[current]}
                                    onChange={() => setTotal(prices[current])}
                                />
                            }

                        })}

                        {/*<Form.Check*/}
                        {/*    id={first}*/}
                        {/*    name={"options"}*/}
                        {/*    type={"radio"}*/}
                        {/*    label={first}*/}
                        {/*    defaultChecked*/}
                        {/*/>*/}
                        {/*{sizes.map(current => {*/}

                            {/*return <Form.Check*/}
                            {/*    id={current}*/}
                            {/*    name={"options"}*/}
                            {/*    type={"radio"}*/}
                            {/*    label={current}*/}
                            {/*/>*/}

                        {/*})}*/}



                    </Form>
                </Modal.Body>
                <Modal.Footer style={{width: "100%"}} justify-content-between>
                    {/*<Row style={{width: "100%"}}>*/}
                        <Button className={"mr-auto"} variant="secondary" onClick={() => {
                            if (count >= 1){
                                setCount(count - 1)
                            }
                            console.log(total)
                        }}>
                            -
                        </Button>
                        <h2>{count}</h2>
                        <Button variant="secondary" onClick={() => {
                            setCount(count + 1)
                            console.log(count)
                        }}>
                            +
                        </Button>
                        <Button variant="primary">Add ${total * count}</Button>

                    {/*</Row>*/}






                </Modal.Footer>


            </Modal>

        </>
    )
}


export default MenuPopup;
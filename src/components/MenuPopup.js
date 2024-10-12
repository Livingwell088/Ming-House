import MenuCard from "./MenuCard";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {useState} from "react";
import Image from 'react-bootstrap/Image';
import "../styles/menuPopup.css"
import '../styles/fonts.css';
import API from "../api";

// import dumpling from "/"

const MenuPopup = (props) => {

    const [show, setShow] = useState(false)
    const [count, setCount] = useState(1)


    // String orderName, Double orderPrice, Integer quantity, Menu item, String specialInstruction
    const addToCart = (name, total, quantity, item, instructions) => {
        console.log(name.toString(), total, quantity, item, instructions)



        API.orderAPI.create(
            name.toString(), total, quantity, item, instructions
        )
            .then(r => console.log(r))
            .catch((error) => console.log(error.message))


        props.onClose()
    }

    const [total, setTotal] = useState(props.price[0])
    const [sizeChosen, setSizeChosen] = useState(0)
    const [instructions, setInstructions] = useState("")

    const onChange = (event) => setInstructions(event.target.value);


    let sizes = []
    for (let i = 0; i < props.size.length; i++){
        sizes.push(i)
    }
    

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

                            sizes.map(current => {

                                if (sizes.length === 1){
                                    if (props.size[current] === ""){
                                        return <Form.Check
                                            id={current}
                                            name={"options"}
                                            type={"radio"}
                                            label={"$" + props.price[current]}
                                            value={props.price[current]}
                                            checked={total === props.price[current]}
                                            onChange={() => {
                                                setTotal(props.price[current])
                                                setSizeChosen(0)
                                            }}
                                            defaultChecked
                                        />
                                    }
                                    else if (props.size[current][0] !== "("){
                                        return <Form.Check
                                            id={current}
                                            name={"options"}
                                            type={"radio"}
                                            label={"(" + props.size[current] + ") : $" + props.price[current]}
                                            value={props.price[current]}
                                            checked={total === props.price[current]}
                                            onChange={() => {
                                                setTotal(props.price[current])
                                                setSizeChosen(0)
                                            }}
                                            defaultChecked
                                        />
                                    }
                                    else{
                                        return <Form.Check
                                            id={current}
                                            name={"options"}
                                            type={"radio"}
                                            label={props.size[current] + ": $" + props.price[current]}
                                            value={props.price[current]}
                                            checked={total === props.price[current]}
                                            onChange={() => {
                                                setTotal(props.price[current])
                                                setSizeChosen(0)
                                            }}
                                            defaultChecked
                                        />
                                    }
                                }
                                else{
                                    return <Form.Check
                                        id={current}
                                        name={"options"}
                                        type={"radio"}
                                        value={props.price[current]}
                                        label={props.size[current] + ": $" + props.price[current]}
                                        checked={total === props.price[current]}
                                        onChange={() => {
                                            setTotal(props.price[current])
                                            setSizeChosen(current)
                                        }}
                                    />
                                }
                        })}



                    </Form>
                </Modal.Body>

                <Modal.Body>
                    <Form.Control as="textarea" rows={3} className={"specialText"} placeholder="Special Instructions" defaultValue={""} onChange={onChange}/>
                </Modal.Body>
                <Modal.Footer style={{width: "100%"}} justify-content-between>
                    {/*<Row style={{width: "100%"}}>*/}
                        <Button className={"mr-auto"} variant="secondary" onClick={() => {
                            if (count >= 1){
                                setCount(count - 1)
                            }
                        }}>
                            -
                        </Button>
                        <h2>{count}</h2>
                        <Button variant="secondary" onClick={() => {
                            setCount(count + 1)
                        }}>
                            +
                        </Button>
                        <Button variant="primary" onClick={() => {
                            addToCart(props.name, total * count, count, props.item[sizeChosen], instructions)
                            // console.log(instructions)
                        }}>Add ${API.priceAPI.price(total * count)}</Button>

                {/*onClick={() => {
                            addToCart(props.name, total * count, sizeChosen, count, props.item)
                        }}*/}

                </Modal.Footer>


            </Modal>

        </>
    )
}


export default MenuPopup;
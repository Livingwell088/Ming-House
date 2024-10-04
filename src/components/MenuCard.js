import Card from 'react-bootstrap/Card';
import "../styles/menuCard.css"
import Typography from "@mui/material/Typography";
import {Button, Col, Row} from "react-bootstrap";
import MenuPopup from "./MenuPopup";
import {useState} from "react";


const MenuCard = (props) => {

    const [showPopup, setShowPopup] = useState(false)
    const handleShow = () => setShowPopup(true);
    const handleClose = () => setShowPopup(false);

    // console.log(props)

    const toggleModal = () => {
        setShowPopup(!showPopup)
    };

    let sizes = props.size.split(",")
    let prices = props.price.split(",")
    for (let i = 0; i < sizes.length; i++){
        if (sizes[i] === ""){
            sizes[i] += "$" + prices[i]
        }
        else if (sizes[i][0] !== "("){
            sizes[i] = ("(" + sizes[i] + "): $" + prices[i])
        }
        else{
            sizes[i] += ": $" + prices[i]
        }
    }


    if (sizes.length < 2){
        sizes.push("blank");
    }

    else if (sizes.length === 2) {
        // console.log(sizes);
        // console.log(prices)
    }

    // console.log(sizes)

    return (
        <Card className={"menuCard"}  onClick={handleShow} >

            <Card.Title>{props.number + ". " + props.name}</Card.Title>
            <Card.Body className={"cardBody1"}>
                <Row>
                    <Col>
            {sizes.map(current => {
                // console.log(current)
                return <div className={current}>{current}</div>;

            })}
                    </Col>
                    <Button className={"addButton square-md"} onClick={handleShow} rounded>+</Button>
                    <MenuPopup show={showPopup} onClose={handleClose} name={props.name} number={props.number} size={props.size} price={props.price}/>

                </Row>
            </Card.Body>



        </Card>
    );

    // if (props.price){
    //     return(
    //
    //     );
    // }
};

export default MenuCard;

import {Col, Row} from "react-bootstrap";
import CartTotal from "./CartTotal";


const CheckoutPage = (props) => {

    return <div className={"App teko"}>
        <main>
            <h1>Checkout</h1>

            <Row>
                <Col xs={8}>

                </Col>
                <Col xs={4}>
                    <CartTotal id={"cartTotal"} ></CartTotal>
                </Col>
            </Row>
        </main>



    </div>

}


export default CheckoutPage

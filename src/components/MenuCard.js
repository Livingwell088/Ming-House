import Card from 'react-bootstrap/Card';
import "../styles/menuCard.css"


const MenuCard = (props) => {

    // console.log(props)


    return (
        // <h1>Hello, {props.name}</h1>
        <Card className={"menuCard"} onClick={() => console.log(props.menu)}>

            <Card.Title>{props.number + ". " + props.name}</Card.Title>
        </Card>
    );
};

export default MenuCard;

interface propsInterface {
    name: string;
}

function Produkt(props: propsInterface) {
    return (
        <div>{props.name}</div>
    )
}

export default Produkt;
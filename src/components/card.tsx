
interface CardProps {
    title: string;
    children?: React.ReactNode;
}

function Card(props: CardProps) {
    return (
        <div className="card mb-3">
            <h3 className="card-header">{props.title}</h3>
            <div className="card-body">
                {props.children}
                

            </div>
        </div>
    )
}

export default Card;
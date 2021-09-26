import './Button.css'

const Button = props => (
    <button onClick={props.action} className="m-btn">
        {props.title}
    </button>
)

export default Button
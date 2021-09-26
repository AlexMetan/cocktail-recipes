import "./Banner.css"

const Banner = props => {
    return(
        <div className="banner" style={{backgroundImage:`url(${props.imgSrc})`}}/>
    )
}

export default Banner
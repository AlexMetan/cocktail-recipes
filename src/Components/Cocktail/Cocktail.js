import { Link } from 'react-router-dom'
import alcoholicIcon from './../../img/alcoholic-icon.svg'
import nonAlcoholicIcon from './../../img/non-alcoholic-icon.svg'

import './Cocktail.css'

const Cocktail = props => {
    return(
        <div className={props.columnClass}>
            <div className="cocktail-box">
                <Link to={`/cocktail/${props.cocktailObj.id}`}/>
                <div className="cocktail-img-box" >
                    <div className="cocktail-img" style={{backgroundImage:`url(${props.cocktailObj.thumb})`}}/>
                </div>
                <div className="cocktail-desc">
                    <h6>{props.cocktailObj.name}</h6>
                    <div className="cocktail-flex-box">
                        <ul>
                            {
                                props.cocktailObj.ingredients.map((ingr,index)=>{
                                    return (
                                        <li key={index}>{ingr}</li>
                                    )
                                })
                            }
                        </ul>
                        <div className="alco-icon">
                            <img src=
                            {
                                props.cocktailObj.alcoholic.toLowerCase()==="alcoholic"
                                ? alcoholicIcon
                                : nonAlcoholicIcon
                            }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cocktail
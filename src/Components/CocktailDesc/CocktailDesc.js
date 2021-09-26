import React, { Component } from 'react'

import axios from 'axios'
import Loader from '../Loader/Loader'

import './CocktailDesc.css'

export default class CocktailDesc extends Component {

    state={
        cocktail:null,
        loading:true
    }
    _isMounted = false
    getCocktailById= async() => {
        try{
            const cocktailId = this.props.match.params.id
            const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`)
            const cocktailRes = response.data.drinks[0]
            const cocktail = {
                id:cocktailRes.idDrink,
                name:cocktailRes.strDrink,
                alcoholic:cocktailRes.strAlcoholic,
                category:cocktailRes.strCategory,
                instruction:cocktailRes.strInstructions,
                thumb:cocktailRes.strDrinkThumb,
                ingredients:this.getIngredients(cocktailRes)
            }
            if(this._isMounted){
                this.setState({
                    cocktail,
                    loading:false
                })
            }
            
        }catch(e){
            console.log(e);
        }
    }
    getIngredients(cocktail){
        const ingredients = []
        for(let i=1;i<16;i++){
            if(cocktail[`strIngredient${i}`]!=null){
                ingredients.push(cocktail[`strIngredient${i}`])
            }
        }
        return ingredients
    }
    componentDidMount(){
        this._isMounted = true
        this.getCocktailById()
    }

    componentWillUnmount(){
        this._isMounted = false
    }
    getCurrentCocktailIngredients = () => {
        return (
            this.state.cocktail.ingredients.map((ingr,index)=>{
                return (
                    <li key={index}>{ingr}</li>
                )
            })
        )
    }
    render() {
        return (
            <section>
                <div className="container cocktail-desc-container">
                {
                    this.state.loading
                    ?<Loader/>
                    :
                    <div className="row">
                        <div className="col-lg-4">
                            <img src={this.state.cocktail.thumb} />
                        </div>
                        <div className="col-lg-8">
                            <h2>{this.state.cocktail.name}</h2>
                            <div className="desc">
                                <p>Category: <b>{this.state.cocktail.category}</b></p>
                                <p>Alcohol: <b>{this.state.cocktail.alcoholic}</b></p>
                                <h4>
                                    Ingredients:
                                </h4>
                                <ul>
                                    {this.getCurrentCocktailIngredients()}
                                </ul>
                                <h4>
                                    Instruction
                                </h4>
                                <p>
                                    {this.state.cocktail.instruction}
                                </p>
                            </div>
                        </div>
                    </div>
                }
            </div>
            </section>
           
        )
    }
}

import axios from 'axios'
import React, { Component } from 'react'
import Banner from '../Banner/Banner'
import Cocktail from '../Cocktail/Cocktail'

import './SearcherPage.css'
import bannerImg from './../../img/banner.jpg'

export default class SearcherPage extends Component {

    state = {
        cocktailsList: [],
        nullList:false
    }
    _isMounted = false
    maxCocktails = 8

    componentDidMount(){
        this._isMounted = true
        this.getCocktailsByName()
    }
    componentWillUnmount(){
        this._isMounted=false
    }

    getCocktailsByName = async (name="") => {
        try{
            const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
            const cocktailsList = []
          
            response.data.drinks.slice(0,this.maxCocktails).map((drink) => {

                cocktailsList.push({
                    id:drink.idDrink,
                    name:drink.strDrink,
                    alcoholic:drink.strAlcoholic,
                    thumb:drink.strDrinkThumb,
                    ingredients:this.getIngredients(drink)
                })
            })
            if(this._isMounted){
                this.setState({
                    cocktailsList,
                    nullList:false
                })
            }
        } catch(e){
            
            this.setState({
                cocktailsList:[],
                nullList:true
            })
        }
    }

    getIngredients(cocktail){
        const ingredients = []
        for(let i=1;i<16;i++){
            if(cocktail[`strIngredient${i}`]!=null&&cocktail[`strIngredient${i}`]!=""){
                ingredients.push(cocktail[`strIngredient${i}`])
            }
        }
        return ingredients
    }

    onInputHandler = (e) => {
        this.getCocktailsByName(e.target.value)
    }


    getCocktailDatalist = () => {
        return this.state.cocktailsList.map((cocktail,index)=>{
            return (
                <option key={index} value={cocktail.name} />
            )
        })
    }
    showCocktail(){
        return (
            this.state.cocktailsList.map((cocktail,index)=>{
                return (
                <Cocktail
                    key = {index}
                    cocktailObj={cocktail}
                    columnClass ="col-xl-3 col-lg-4 col-md-6 col-10"
                />
                )
            })
            
        )
    }
    render() {
        return (
            <main>
                <Banner imgSrc={bannerImg}/>
                <section className="searcher">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 text-center">
                                <h2>
                                    Searcher
                                </h2>
                            </div>
                            <div className="col-xl-6 col-lg-8 col-md-10 col-12">
                                <div className="searcher-box">
                                    <input type="search" list="cocktails-list" onInput={this.onInputHandler} placeholder="Cocktail name"/>
                                    <datalist id="cocktails-list">
                                    {
                                        this.getCocktailDatalist()
                                    }
                                    </datalist>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            {
                                this.state.nullList
                                ?<h6 className="error">
                                    No results
                                </h6>
                                :this.showCocktail()
                            }
                        </div>
                    </div>
                </section>
            </main> 
        )
    }
}

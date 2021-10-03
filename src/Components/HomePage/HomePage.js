import React, { Component } from 'react'
import bannerImg from './../../img/banner.jpg'
import Banner from '../Banner/Banner'
import Loader from '../Loader/Loader'
import Cocktail from '../Cocktail/Cocktail'
import axios from 'axios'
import Button from './../UI/Button/Button'
export default class HomePage extends Component {

    state={
        cocktail:null,
        loading:true
    }
    _isMounted = false
    getRandomCocktail = async() => {
        try{
            const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
            const cocktailRes = response.data.drinks[0]
            const cocktail = {
                id:cocktailRes.idDrink,
                name:cocktailRes.strDrink,
                alcoholic:cocktailRes.strAlcoholic,
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
            if(cocktail[`strIngredient${i}`]!=null&&cocktail[`strIngredient${i}`]!=""){
                ingredients.push(cocktail[`strIngredient${i}`])
            }
        }
        return ingredients
    }
    componentDidMount(){
        this._isMounted = true
        this.getRandomCocktail()
    }

    componentWillUnmount(){
        this._isMounted = false
    }
    showCocktail(){
        return (
            <Cocktail
                cocktailObj={this.state.cocktail}
                columnClass ="col-xl-3 col-lg-4 col-md-6 col-10"
            />
        )
    }
    buttonHandler = () =>{
        this.setState({
            loading:true
        })
        this.getRandomCocktail()
    }
    render() {
        return (
            <React.Fragment>
                <Banner imgSrc={bannerImg}/>
                <section className="container">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <h2 className="text-center">
                                Random cocktail
                            </h2>
                        </div>
                        {
                            this.state.loading
                            ?<Loader/>
                            :this.showCocktail()
                        }
                        <div className="col-12 text-center">
                            <Button
                                action={this.buttonHandler}
                                title="Get random cocktail"
                            />
                        </div>
                    </div>
                </section>
            </React.Fragment>
        )
    }
}

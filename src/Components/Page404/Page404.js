
import { Link } from 'react-router-dom'
import img from './../../img/banner.jpg'
import './Page404.css'

const Page404 = () => (
    <section className="not-found-404-error" style={{backgroundImage:`url(${img})`}}>
        <Link to="/" />
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="not-found-404-box">
                        <div className="error-box">
                            <h2>
                                404
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
)

export default Page404
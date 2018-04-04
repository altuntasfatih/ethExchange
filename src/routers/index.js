import React from 'react';
import { BrowserRouter, Route,Switch,Link } from 'react-router-dom';

import Home from "./Home";


export default () =>
    (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact render={props => <Home{...props}/>}/>
                <Route path="/nav" exact component={Nav}/>
                <Route path='/' component={Container}/>

                <Route path="/home/2" exact component={Home}/>
                <Route path='/address' component={Address} />
                <Route path='*' component={NotFound} />
            </Switch>
        </BrowserRouter>
    )

const Nav = () => (
    <div>
        <Link to='/'>Home</Link>&nbsp;
        <Link to='/address'>Address</Link>
    </div>
)
const Container = (props) => <div>
    <Nav />
    {props.children}
</div>

const Address = () => <h1>We are located at 555 Jackson St.</h1>
const NotFound = () => (
    <h1>404.. This page is not found!</h1>)

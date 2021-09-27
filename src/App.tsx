import React, {Suspense} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import {routerConfig, CustomizeRouteProps} from './router';

function App() {
    return (
        <Suspense fallback={null}>
            <BrowserRouter>
                <Switch>
                    <Redirect exact={true} from="/" to='/three' />
                    {
                        routerConfig.map(
                            (item: CustomizeRouteProps) => {
                                return (
                                    <Route {...item} key={item.key}></Route>
                                );
                            }
                        )
                    }
                </Switch>
            </BrowserRouter>
        </Suspense>
    );
}

export default App;

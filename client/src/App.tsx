import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  RouteComponentProps,
  Switch,
} from 'react-router-dom'
import { withRouter } from 'react-router'
import NavigationBar from './components/NavigationBar'
import routes from './config/routes'
import Footer from './components/Footer'

const App = () => {
  const NavBarWithRouter = withRouter(NavigationBar)

  // TODO Set routes as children in NavigationBar

  return (
    <Router>
      <NavBarWithRouter />
      {/* <Jumbotron /> */}
      <Switch>
        {routes.map((route) => (
          <Route
            key={route.name}
            path={route.path}
            exact={route.exact}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            render={(props: RouteComponentProps<any>) => (
              <route.component
                name={route.name}
                Footer
                        // eslint-disable-next-line react/jsx-props-no-spreading
                {...props}
                        // eslint-disable-next-line react/jsx-props-no-spreading
                {...route.props}
              />
            )}
          />
        ))}
      </Switch>
      <Footer />
    </Router>
  )
}

export default App

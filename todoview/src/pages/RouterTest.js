import React from 'react';
import { Route, Link, Switch, useHistory } from 'react-router-dom';
import { Menu, Button } from 'antd'
import Favorites from 'pages/Favorites'
import FavoriteGroup from 'pages/FavoirteGroup'
import FavoriteDetail from 'pages/FavoriteDetail'
import Todos from 'pages/Todos'
import TodoGroup from 'pages/TodoGroup'
import TodoDetail from 'pages/TodoDetail'
import Login from'account/Login'
import SignUp from 'account/SignUp'
import LoginContext from 'account/Util'
import Empty from 'Empty'
import "./RouterTest.css"

export default function RouterTest() {

    const history = useHistory();
    const { SubMenu } = Menu;

    const [isLogin, setIsLogin] = React.useState(false)

    const [state, setState] = React.useState('fav_group')
    const mystate = {
        current: state,
    };

    const handleClick = (e) => {
        setState(e.key)
    };

    const logout = () => {
        window.localStorage.removeItem("token");
        setIsLogin(false)
        history.push("/login")
    }

    const { current } = mystate;

    return (
        <LoginContext.Provider value={{isLogin, setIsLogin}}>
                <div id="menu">    
                <Menu
                    onClick={handleClick}
                    style={{ width: 256, margin: 0, height: "100vh" }}
                    defaultSelectedKeys={[current]}
                    defaultOpenKeys={['favorite']}
                    mode="inline"
                    className="menubox"
                >
                    <Link exact to="/" >
                        <div className="project_title">Todo Project</div>
                    </Link>

                    <SubMenu key="favorite" title="즐겨찾기">       
                        <Menu.Item key="fav_group">
                            <Link to="/fav_group" >그룹관리</Link>
                        </Menu.Item>
                        
                        <Menu.Item key="favorites">
                            <Link to="/favorites" >즐겨찾기</Link>  
                        </Menu.Item>           
                    </SubMenu>
                    <SubMenu key="todo" title="할 일">
                        <Menu.Item key="todo_group">
                            <Link to="/todo_group" >그룹관리</Link>
                        </Menu.Item>
                        
                        <Menu.Item key="todos">
                            <Link to="/todos" >할 일</Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>       
                </div>
                <div id="content">
                { isLogin ? <div id="login_success"><Button id="logout" onClick={logout}>로그아웃</Button></div> : 
                            <div id="login_fail"><Link to="/login"><Button id="login">로그인</Button></Link><Link to="/signup"><Button id="signup" type="primary">회원가입</Button></Link></div> }
                    <Switch>
                        <Route exact={true} path="/" component={Home} />
                        <Route path="/fav_group" component={FavoriteGroup} />
                        <Route exact path="/favorites" component={Favorites} />
                        <Route exact path="/favorites/:id" component={FavoriteDetail}/>
                        <Route path="/todo_group" component={TodoGroup} />
                        <Route exact path="/todos" component={Todos} />
                        <Route exact path="/todos/:id" component={TodoDetail}/>
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={SignUp} />
                        <Route component={Nopage} />
                    </Switch>
                    <Route path="/" component={Empty} />
                </div>
        </LoginContext.Provider>
    )
}


function Home() {

    // console.dir(location)
    // console.dir(match)

    return (
        <div>
            @@@홈@@@
        </div>
    )
}

function Nopage() {

    // console.dir(location)
    // console.dir(match)

    return (
        <div>
            NOPAGE
        </div>
    )
}



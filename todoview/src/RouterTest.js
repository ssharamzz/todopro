import React from 'react';
import { BrowserRouter, Route, Link, NavLink, Switch } from 'react-router-dom';
import { Menu, List, Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons';
import API from 'pages/Api';
import "./RouterTest.css"


const reducer = (prev, action) => {
    const {type, value} = action;

    if (type==="FAV_DELETE") {
        return {
            ...prev,
            number: parseInt(value) + 1
        }
    }
}

export default function RouterTest() {
    const { SubMenu } = Menu;

    const [state, setState] = React.useState('home')
    const mystate = {
        current: state,
    };

    const handleClick = (e) => {
        setState(e.key)
    };

    const { current } = mystate;

    return (
        <BrowserRouter>
            <div id="menu">    
            <Menu
                onClick={handleClick}
                style={{ width: 256, margin: 0, height: "100vh" }}
                defaultSelectedKeys={['fav_group']}
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
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/fav_group" component={FavoriteGroup} />
                    <Route path="/favorites" component={Favorites} />
                    <Route path="/todos" component={Todos} />
                    <Route component={Nopage} />
                </Switch>   
            </div>
        </BrowserRouter>
    )
}

function Layout() {
    return (
        <>
        </>
    )
}

function Home({history, location, match}) {

    // console.dir(location)
    // console.dir(match)

    return (
        <div>
            @@@홈@@@
        </div>
    )
}

function Nopage({history, location, match}) {

    // console.dir(location)
    // console.dir(match)

    return (
        <div>
            NOPAGE
        </div>
    )
}

function FavoriteGroup() {

    const [fav_group, setFavGroup] = React.useState([])

    React.useEffect(()=> {
        API.get("todopro/fav_group/")
        .then(response=>{
            const {data} = response
            setFavGroup(data)
            // console.log(response);
        })
        .catch(error=>{
            console.error(error)
        })
    },[])

    return (
        <div>
           <List
                // itemLayout="horizontal"
                dataSource={fav_group}
                renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                    title={item.name}
                    description={item.seq + " / " + item.name + " / " + item.reg_date }
                    />
                </List.Item>
                )}
            />
        </div>
    )
}

function Favorites() {

    const [favorites, setFavorites] = React.useState([])

    React.useEffect(()=> {
        API.get("todopro/favorites/")
        .then(response=>{
            const {data} = response
            setFavorites(data)
            // console.log(response);
        })
        .catch(error=>{
            console.error(error)
        })
    },[])

    const FavDel = (seq) => {
        console.log('삭제버튼 클릭')
        console.log(seq)
    
        API.delete("todopro/favorites/"+seq+"/")
        .then(response=>{
            console.log('삭제완료')

        })
        .catch(error=>{
            console.error(error)
        })
    }

    const FavAdd = () => {
        API.post("todopro/favorites/")
        .then(response=>{
            console.log('추가완료')
            console.log(response)
        })
        .catch(error=>{
            console.error(error)
        })
    }

    const clickDel = (e) => {
        console.log(e.target.getAttribute('value'))
        FavDel(e.target.getAttribute('value'))

    }

    const clickAdd = () => {
        console.log('여기는 폼 띄워서 입력받아야함')
    }

    return (
        <>
            <Button id="fav_add" onClick={clickAdd}>+ 추가</Button>
            <div>
            <List
                    // itemLayout="horizontal"
                    dataSource={favorites}
                    renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                        title={item.name}
                        description= {<> {item.seq} / {item.memo} / {item.url }</>}
                        // <DeleteOutlined />
                        />
                        <Button id="del_btn" icon={<DeleteOutlined />} onClick={clickDel} value={item.seq} />
                    </List.Item>
                    )}
                />
            </div>
        </>
    )
}


function FavDel({seq}) {
    const [favorite, setFavorite] = React.useState([])
    console.log('삭제버튼 클릭')
    
    React.useEffect(()=> {
        API.delete("todopro/favorites/"+{seq}+"/")
        .then(response=>{
            console.log('삭제완료')
            console.log(response)
        })
        .catch(error=>{
            console.error(error)
        })
    },[])

    return (
        <>

        </>
    )
}

function FavPut({seq}) {
    const [favorite, setFavorite] = React.useState([])
    
    React.useEffect(()=> {
        API.put("todopro/favorites/"+{seq}+"/")
        .then(response=>{
            // const {data} = response
            // setFavorites(data)
            // console.log(response);
        })
        .catch(error=>{
            console.error(error)
        })
    },[])

    return (
        <>
        </>
    )
}

function Todos() {

    const [todos, setTodos] = React.useState([])

    React.useEffect(()=> {
        API.get("todopro/todos/")
        .then(response=>{
            const {data} = response
            setTodos(data)
            // console.log(response);
        })
        .catch(error=>{
            console.error(error)
        })
    },[])

    return (
        <div>
           <List
                itemLayout="horizontal"
                dataSource={todos}
                renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                    title={item.name}
                    description={"수학 : "+item.math+" / 과학 : "+item.science+" / 영어 : "+item.english}
                    />
                </List.Item>
                )}
            />
        </div>
    )
}
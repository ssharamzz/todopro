import React from 'react';
import { BrowserRouter, Route, Link, NavLink, Switch } from 'react-router-dom';
import { Menu, List } from 'antd'
import API from 'pages/Api';

export default function RouterTest1() {

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
                <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
                    <Menu.Item key="home">
                        <Link exact to="/" >
                            홈
                        </Link> 
                    </Menu.Item>

                    <Menu.Item key="students">
                        <Link to="/students" >
                            학생
                        </Link>          
                    </Menu.Item>

                    <Menu.Item key="scores">
                        <Link to="/scores">
                            점수
                        </Link>                      
                    </Menu.Item>
                </Menu>
                {/* <NavLink exact to="/" activeStyle={active}>Home</NavLink>
                <NavLink to="/students" activeStyle={active}>Students</NavLink> */}
            </div>
            <div id="content">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/students" component={Students} />
                    <Route path="/scores" component={Scores} />
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
            HOME
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

function Students() {

    const [students, setStudents] = React.useState([])

    React.useEffect(()=> {
        API.get("study/students/")
        .then(response=>{
            const {data} = response
            setStudents(data)
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
                dataSource={students}
                renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                    title={item.name}
                    description={item.address + " / " + item.email}
                    />
                </List.Item>
                )}
            />
        </div>
    )
}

function Scores() {

    const [scores, setScores] = React.useState([])

    React.useEffect(()=> {
        API.get("study/scores/")
        .then(response=>{
            const {data} = response
            setScores(data)
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
                dataSource={scores}
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
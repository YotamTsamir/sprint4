import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useLocation } from "react-router-dom"
import { HeaderNav } from "./header-nav.jsx"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSearch } from '@fortawesome/free-solid-svg-icons'
import { faTrello } from '@fortawesome/free-brands-svg-icons'
import { boardService } from '../services/board.service'


export const AppHeader = () => {
    const { board } = useSelector((storeState) => storeState.boardModule)
    const [isLoginBarOpen, setIsLoginBarOpen] = useState(false)
    const [headerTheme, setHeaderTheme] = useState({
        style: {
            backgroundColor: '#026aa7'
        },
        isDark: false,
    })
    const location = useLocation()


    useEffect(() => {
        getIsDarkTheme()
    }, [board])

    useEffect(() => {
        resetHeaderTheme()
    }, [location.pathname])

    const onToggleLoginBar = () => {
        setIsLoginBarOpen(!isLoginBarOpen)
    }

    const getIsDarkTheme = async () => {
        if (!board || !board.style) return
        if (board.style.backgroundColor) {
            setHeaderTheme(() => ({
                style: {
                    backgroundColor: board.style.backgroundColor,
                    filter: "brightness(90%)"
                },
                isDark: true
            }))
            return
        }
        const colorTheme = await boardService.getBoardColorTheme(board.style.backgroundImage)
        const { r, g, b } = colorTheme.rgb
        setHeaderTheme(() => ({
            style: { backgroundColor: `rgb(${r}, ${g}, ${b})` },
            isDark: colorTheme.isDark
        }))
    }

    const resetHeaderTheme = () => {
        if (location.pathname === '/boards') {
            setHeaderTheme({
                style: {
                    backgroundColor: '#026aa7'
                },
                isDark: true,
            })
        } else if (location.pathname === '/') {
            setHeaderTheme({
                style: {
                    background: 'none'
                },
                isDark: false,
            })
        }
    }




    return <div className={`app-header 
    ${headerTheme.isDark ? 'is-dark' : 'is-light'
        } 
        ${(location.pathname !== '/') ? '' : 'home-page-header'
        }`}
        style={headerTheme.style}>
        <div className="logo-and-nav">
            <NavLink to="/" className="logo-container">
                <div className="header-logo fa-trello">
                    <FontAwesomeIcon icon={faTrello} />
                </div>
                <h1>Tredux</h1>
            </NavLink>
            {(location.pathname !== '/') &&
                <div className="main-nav-container">
                    <HeaderNav />
                </div>
            }
        </div>

        <div className='header-right-side'>
            <div className="user-nav-links">
                <button className='toggle-login-bar'
                    onClick={onToggleLoginBar}>
                    <h1>
                        <FontAwesomeIcon icon={faUser} />
                    </h1>
                </button>
                {isLoginBarOpen &&
                    <div className="signin-signup-links">
                        <h2>Account<hr /></h2>
                        <NavLink className="nav-link nav-login" to='/login'>Login</NavLink>
                        <NavLink className="nav-link nav-signup" to='/signup'>Sign up</NavLink>
                    </div>
                }
            </div>
            {(location.pathname !== '/') &&
                <div className='main-search-container'>
                    <span>
                        <FontAwesomeIcon icon={faSearch} />
                    </span>
                    <input type="text"
                        className='main-search'
                        placeholder="Search" />
                </div>
            }
        </div>
    </div>
}   
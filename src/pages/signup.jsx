import { useState } from "react"
// import { signup } from "../store/action/user-action"
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrello } from "@fortawesome/free-brands-svg-icons"
import { useFormRegister } from "../hooks/useFormRegister"
import { isSunday } from "date-fns"
import { signup } from "../store/action/user-action"
import { useNavigate } from "react-router-dom"

export const SignUp = () => {
    const { user } = useSelector((storeState) => storeState.userModule)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [signUp, editSignUp] = useState(false)
    const [registerSignUp, newSignUp, setSignUp] = useFormRegister({
        username: '',
        password: '',
        repassword: '',
        fullname: '',
        email : '',
        isSignUp : false, 
    })

    const { isSignUp,username, password, repassword, fullname, email } = newSignUp

    const isDisabled = () => {
        if (email && username && password && fullname) return false
        return true
    }
    const onSignUp = (ev) => {
        ev.preventDefault()
        if(!email || !username || !password || !fullname) return 
        dispatch(signup({email,username,fullname,password}))
        navigate('/boards')
    }

    return <div className="signup">
        <div className="signup-name-logo">
        <div className="signup-logo fa-trello">
                <FontAwesomeIcon icon={faTrello}/>
            </div>
        <div className="name">Tredux</div>
        </div>
                {/* {!isSignUp && <form className="login-form" onSubmit={this.onLogin}>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        placeholder="Username"
                        onChange={this.handleChange}
                        required
                        autoFocus
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={this.handleChange}
                        required
                    />
                    <button>Login!</button>
                </form>} */}
                <div className="signup-section">
                    <form className="signup-form" onSubmit={(ev) => (onSignUp(ev))}> 
                    <div className="signup-title">Sign up for your account </div>
                    <div className="signup-input-container">
                        <input
                            className="signup-input"
                            placeholder="Enter email"
                            required
                            {...registerSignUp('email')}/>
                        <input
                            className="signup-input"
                            placeholder="Fullname"
                            required
                            {...registerSignUp('fullname')}/>
                        <input
                            className="signup-input"
                            placeholder="Username"
                            required
                            {...registerSignUp('username')}
                        />
                        <input
                            {...registerSignUp('password')}
                            className="signup-input"
                            type="password"
                            placeholder="Password"
                            required
                        />
                        {isDisabled() ? <button   
                        className="signup-btn"
                        disabled
                         >Signup!</button> :  <button   
                         className="signup-btn"
                          >Signup!</button>}
                        </div>
                    </form>
                </div>

                {/* <footer className="signup-footer">hello</footer> */}

    </div>
}
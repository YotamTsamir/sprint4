import { useState } from 'react'
import { ActionMenu } from './action-menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowUpRightFromSquare, faTag, faFillDrip, faCopy, faInbox } from '@fortawesome/free-solid-svg-icons'
import { faClock, faUser, faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons'
import { useDispatch } from 'react-redux'
import { editTask } from '../store/action/board-action'

export const EditTaskNav = ({ board, task, box, onEditTaskTitle, setIsEdit, isEdit }) => {

    const [dateMenu, setDateMenu] = useState(false)
    const [menuState, setMenuState] = useState({
        'Edit labels': false,
        'Edit dates': false,
        'Change members': false,
        "Change cover": false
    })
    const dispatch = useDispatch()

    const toggleMenu = (ev, menuName) => {
        console.log('set modal')
        setModal(ev)
        const newMenuState = {}
        for (const key in menuState) {
            newMenuState[key] = key === menuName ? !menuState[menuName] : false
        }
        setMenuState(newMenuState)
    }


    const openDateMenu = () => {
        setDateMenu(!dateMenu)
    }

    const archivedTask = () => {
        const newTask = { ...task, archivedAt: Date.now() }
        dispatch(editTask(board._id, box.id, newTask))
    }

    const setModal = (ev) => {
        const x = window.innerWidth;
        const y = window.innerHeight;
        const DOMelement = ev.currentTarget
        const values = DOMelement.getBoundingClientRect()
        console.log(values, x, y)
        if(x-values.right < (values.right-values.left) ){
            return "right side"
        } else return "all good"
        
    }
    // && ())

    const menuBtns = [
        { txt: 'Open card', func: openDateMenu, fa: <FontAwesomeIcon style={{ color: '#fefefe' }} className="icon-task-menu fa-solid fa-arrow-up-right-from-square" icon={faArrowUpRightFromSquare} inverse /> },
        { txt: 'Edit labels', fa: <FontAwesomeIcon className="icon-task-menu fa-solid fa-tag" icon={faTag} /> },
        { txt: 'Change cover', fa: <FontAwesomeIcon className="icon-task-menu fa-solid fa-fill-drip" icon={faFillDrip} /> },
        { txt: 'Change members', fa: <FontAwesomeIcon className="icon-task-menu fa font-clock" icon={faUser} /> },
        { txt: 'Move', fa: <FontAwesomeIcon className="icon-task-menu fa font-clock" icon={faArrowRight} /> },
        { txt: 'Copy', fa: <FontAwesomeIcon className="icon-task-menu fa-solid fa-copy" icon={faCopy} /> },
        { txt: 'Edit dates', fa: <FontAwesomeIcon className="icon-task-menu fa font-clock" icon={faClock} /> },
        { txt: 'Archive', func: archivedTask, fa: <FontAwesomeIcon className="icon-task-menu fa-solid fa-inbox" icon={faInbox} /> },
    ]
    const colors = ['#7BC86C', '#F5DD29', '#EF7564', '#CD8DE5', '#5BA4CF', '#29CCE5', '#6DECA9', 'orange', '#FF8ED4', '#8675A9']


    return <section>
        {/* <div className='add-to-card'>Add to card</div> */}
        <div className="edit-task-nav white-icons">
            {menuBtns.map((btn, idx) => {
                return (
                    <div key={idx}>

                        {(btn.txt !== 'Archive' && btn.txt !== 'Open card') && <button key={btn.txt} className="edit-task-nav-btn" onClick={(ev) => { toggleMenu(ev, btn.txt) }}>
                            {btn.fa} {btn.txt}
                        </button>}
                        {(btn.txt === 'Archive' || btn.txt === 'Open card') && <button key={btn.txt} className="edit-task-nav-btn" onClick={() => { btn.func() }}>
                            {btn.fa} {btn.txt}
                        </button>}
                    </div>
                )
            })}

            {(menuState['Edit labels']) && <ActionMenu className="label-choice" topic={'Labels'} setIsEdit={setIsEdit} onEditTaskTitle={onEditTaskTitle} task={task} box={box} board={board} />}
            {(menuState['Change cover']) && <ActionMenu className="cover-choice" topic={'Cover'} colors={colors} task={task} box={box} board={board} />}
            {(menuState['Edit dates']) && <ActionMenu topic={'Date'} task={task} box={box} board={board} />}
            {(menuState['Change members']) && <ActionMenu topic={'Members'} task={task} box={box} board={board} />}
        </div>
    </section>
}

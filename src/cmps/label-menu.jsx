import { useState } from "react";
import { boardService } from "../services/board.service"
import { useDispatch } from 'react-redux'
import { BgImgList } from "./bg-image-list";
import { setNewBoard, editTask } from "../store/action/board-action"
import DatePicker from 'react-date-picker';
import Calendar from 'react-calendar'
import { utilService } from "../services/util.service";

// dispatch(setNewBoard(newBoard))

export const LabelMenu = ({ topic, board, task, box, colors, emitDateValue }) => {
    const [images, onSetImages] = useState(boardService.getDefaultBgs())
    const [value, onChange] = useState(new Date());
    const dispatch = useDispatch()

    const onAddLabel = async (ev, labelId) => {
        let newTask;
        if (task.labelIds.includes(labelId)) {
            const labelIdx = task.labelIds.findIndex(label => label === labelId)
            task.labelIds.splice(labelIdx, 1)
            newTask = { ...task, labelIds: task.labelIds }
        } else {
            newTask = { ...task, labelIds: [...task.labelIds, labelId] }
        }
        dispatch(editTask(board._id, box.id, newTask))
    }

    const onAddMember = (member) => {
        // const newTask = { ...task, members: [...task.members, member]}
        let newTask;
        console.log(member.userName)
        console.log(task.members)
        if (task.members.find(currMember => currMember.userName === member.userName)) {
            const memberIdx = task.members.findIndex(currMember => currMember.userName === member.userName)
            task.members.splice(memberIdx, 1)
            newTask = { ...task, members: task.members }
        } else {
            newTask = { ...task, members: [...task.members, member] }
        }

        dispatch(editTask(board._id, box.id, newTask))
    }

    const onChangeDate = (value) => {
        onChange(value)

        const newTask = {
            ...task, date: {
                timeStamp: value,
                month: utilService.getMonthName(value.getMonth()),
                day: value.getDate(), isComplete: ''
            }
        }
        dispatch(editTask(board._id, box.id, newTask))
    }


    const onChangeBgImg = async ({ target }) => {
        let newTask;
        console.log(target.value)
        newTask = { ...task, bg: target.value }
        dispatch(editTask(board._id, box.id, newTask))
    }
    const onChangeBgColor = async (color) => {
        let newTask;
        newTask = { ...task, bg: color }
        dispatch(editTask(board._id, box.id, newTask))
    }

    return <div className={`label-choice ${topic}`}>
        <h1 >{topic}</h1>
        <hr />
        {(topic === 'Members' && topic === 'Labels') && <input type="text" />}
        {(topic === 'Members') && <p>Board members</p>}
        {(topic === 'Labels') && (board.labels.map(label => {
            return (
                <div className="label-choice" key={label.id} onClick={(ev) => onAddLabel(ev, label.id)} style={{ backgroundColor: label.color }}>{label.title}</div>
            )
        }))}
        <div >
            {(topic === 'Cover') && <div>
                <div className="color-grid">
                    {(colors.map(color => {
                        return (
                            <div key={color} className="cover-menu-color" value={color} onClick={() => onChangeBgColor(color)} style={{ backgroundColor: color }}></div>
                        )
                    }))}
                </div>
                <div className="bg-container cover-menu">
                    <h4 className="cover-menu-h4">Photos from Unsplash</h4>
                    < BgImgList dfBgs={images} onChange={onChangeBgImg} />
                </div>
            </div>}
        </div>

        {/* // (images.image.map(image=>{ */}
        {/* //     <div ></div> */}
        {/* // }))                 */}
        {(topic === 'Date') && <div>
            <Calendar onChange={onChangeDate} value={value} />
            {/* <DatePicker
               wrapperClassName="datePicker"  isOpen={true} closeCalendar={true} onChange={onChangeDate} value={value} onClick={(ev) => {ev.stopPropagation()}}
            /> */}
        </div>}
        {(topic === 'Members') && <div>
            {board.members.map((member, idx) => {
                return (
                    <div key={idx} onClick={() => onAddMember(member)} className="members-div">{member.userName}</div>
                )
            })}
        </div>}
    </div>
}
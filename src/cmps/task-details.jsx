import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleDetails } from "../store/action/board-action";

export const TaskDetails = () => {
  const { task } = useSelector((storeState) => storeState.boardModule);
  const { board } = useSelector((storeState) => storeState.boardModule);
  const [box, setBox] = useState(null);
  const dispatch = useDispatch();
  const { boxes } = board;
  useEffect(() => {
    console.log("task", task);
    console.log("bocxes", boxes);
    const currBox = boxes.find((b) => {
      b.tasks.find((currTask) => {
        // currTask.id === task.id;
      });
    });
    setBox(currBox);
    console.log("yotamikos box", box);
  }, []);
  const onToggleDetails = () => {
    dispatch(toggleDetails(""));
  };

  if (!task) return;
  return (
    <div className={`task-details ${task ? "" : "hidden"}`}>
      <button onClick={onToggleDetails}>X</button>
      <h1>{task.title}</h1>

      <div className="task-status">in list {box}</div>
      {/* <pre>{JSON.stringify(task)}</pre> */}
    </div>
  );
};

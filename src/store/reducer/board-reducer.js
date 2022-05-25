const initialState = {
    board: {},
    task:{},
    box: {}
}
export function boardReducer(state = initialState, action) {
    var newState = state;
    switch (action.type) {
        case 'SET_BOARDS':
            return {
                ...state,
                boards: action.boards
            }
        case 'SET_BOARD':
            newState = { ...state, board: action.board }
            break;
        case 'ADD_TASK':
            // newState = { ...board, }
            break;
        case 'SET_TASK':
            newState = {...state, task: action.task, box: action.box}
        default:
    }

    return newState;

}

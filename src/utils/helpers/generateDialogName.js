const generateDialogName = (dialogParticipants, userId) => {
    let resultDialogName = '';
    if (dialogParticipants.length === 2){
        for(let i = 0; i < dialogParticipants.length; i++){
            if (dialogParticipants[i].user._id !== userId) 
                return dialogParticipants[i];
        }
    }
    for(let i = 0; i < dialogParticipants.length; i++) {
        let isFirst = true;
        if (dialogParticipants[i].user._id !== userId){
            if (!isFirst) 
                resultDialogName += ', '
            resultDialogName += dialogParticipants[i].user.fullname
            isFirst = false;
        }
    }
    return resultDialogName;
}

export default generateDialogName;
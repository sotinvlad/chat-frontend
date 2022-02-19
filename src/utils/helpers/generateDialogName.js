const generateDialogName = (dialogParticipants, userId) => {
    let resultDialogName = '';
    if (dialogParticipants.length === 2){
        for(let i = 0; i < dialogParticipants.length; i++){
            if (dialogParticipants[i]._id !== userId) 
                return dialogParticipants[i];
        }
    }
    for(let i = 0; i < dialogParticipants.length; i++) {
        let isFirst = true;
        if (dialogParticipants[i]._id !== userId){
            if (!isFirst) 
                resultDialogName += ', '
            resultDialogName += dialogParticipants[i].fullname
            isFirst = false;
        }
    }
    return resultDialogName;
}

export default generateDialogName;
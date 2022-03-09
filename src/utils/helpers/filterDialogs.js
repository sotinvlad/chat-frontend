const filterDialogs = (items, value, userData) => {
    return items.filter(item => { 
        for(let i = 0; i < item.dialogParticipants.length; i++) {
            if(item.dialogParticipants[i]._id !== userData._id)
                return item.dialogParticipants[i].fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0
            else
            return false;
        }
        return false;
    })
}

export default filterDialogs;
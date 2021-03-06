const filterDialogs = (items, value, userData) => {
    return items.filter(item => { 
        for(let i = 0; i < item.dialogParticipants.length; i++) {
            if(item.dialogParticipants[i].user !== userData){
                return item.dialogParticipants[i].user.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0
            }
        }
        return false;
    })
}

export default filterDialogs;
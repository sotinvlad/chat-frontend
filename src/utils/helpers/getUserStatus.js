import { differenceInMinutes } from "date-fns";
import generateDialogName from "./generateDialogName";

const getUserStatus = (dialog, userData) => {
    let dialogParticipants = dialog.dialogParticipants.filter(item => item._id != userData._id);
    let status = dialogParticipants.length === 1 ? differenceInMinutes(new Date(), new Date(dialogParticipants[0].last_seen)) < 5 : null;
    return [status, generateDialogName(dialogParticipants, userData)];
}

export default getUserStatus;
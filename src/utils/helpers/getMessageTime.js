import { ru } from 'date-fns/locale';
import { format, isToday } from 'date-fns';

const getMessageTime = createdAt => {
    const date = new Date(createdAt);
    if (!isToday(date)) {
        return format(date, 'dd MMM', { locale: ru } )
    } else {
        return format(date, 'HH:mm')
    }
}

export default getMessageTime;
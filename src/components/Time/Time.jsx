import { formatDistanceToNow } from 'date-fns/esm';
import { ru } from 'date-fns/locale';

const Time = (props) => 
    formatDistanceToNow(props.date, { addSuffix: true, locale: ru })

export default Time;

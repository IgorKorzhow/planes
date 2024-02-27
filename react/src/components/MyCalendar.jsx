import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css'
import "./MyCalendar.css"

function MyCalendar({setDate, date, type = "default"}) {
    {if (type === "default") {
        return (
            <div className='calendar-container'>
                <Calendar  onChange={setDate} value={date} />
            </div>
        )
    } else {
        return (
            <div>
                <div className='calendar-container'>
                    <Calendar
                        onChange={setDate}
                        value={date}
                        selectRange={true}
                    />
                </div>
            </div>
        )
    }}
}

export default MyCalendar;

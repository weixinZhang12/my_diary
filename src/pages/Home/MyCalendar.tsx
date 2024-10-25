import Calendar from 'react-calendar';

interface MyCalendarInter {
    isShow: boolean
}
function MyCalendar(props: MyCalendarInter) {
    return (

        <>
        {
            props.isShow && (<div className="home-calendar" >
                <Calendar />
            </div >)
        }
        </>

    )
}
export default MyCalendar
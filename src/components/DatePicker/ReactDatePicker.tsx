import React, { forwardRef } from 'react'
import { Controller } from 'react-hook-form'
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import './ReactDatePicker.scss'
import InputMask from 'react-input-mask';
import { ru } from 'date-fns/locale/ru';


type Props = {
    name: string
    control: any
    defaultValue:string
}

export const ReactDatePicker: React.FC<Props> = ({ control, name,defaultValue }) => {

    const [startDate, setStartDate] = React.useState(defaultValue?moment(defaultValue, "DD.MM.YYYY").toDate():new Date());
    const [endDate, setEndDate] = React.useState();
    const [isOpen, setIsOpen] = React.useState(false)


    const CustomInput = forwardRef((props: any, ref) => (
        <InputMask {...props} mask="99.99.9999" ref={ref} />
    ));

    React.useEffect(() => {
        registerLocale('ru', ru);
    }, []);

    return (
        <>
            <div className='calendar'>
                <Controller
                    control={control}
                    name={name}
                    rules={{ required: true }}
                    render={({ field: { onChange} }) =>
                        <DatePicker
                            locale={"ru"}
                            onChange={(date: any) => {setIsOpen(false); setStartDate(date); onChange(moment(date).format("DD-MM-YYYY")) }}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            dateFormat="dd.MM.yyyy"
                            placeholderText={"введите дату"}
                            minDate={new Date()}
                            maxDate={new Date(2029, 12, 12)}
                            selected={startDate}
                            onInputClick={() => setIsOpen(true)}
                            onSelect={() => setIsOpen(false)}
                            onClickOutside={() => setIsOpen(false)}
                            // showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            customInput={<CustomInput />}
                            open={isOpen}
                        />}
                />
                <span onClick={() => setIsOpen(!isOpen)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="#1287F3" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M15.6949 13.7H15.7039M15.6949 16.7H15.7039M11.9949 13.7H12.0049M11.9949 16.7H12.0049M8.29395 13.7H8.30395M8.29395 16.7H8.30395" stroke="#1287F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        </path>
                    </svg></span>
            </div>
        </>
    )
}

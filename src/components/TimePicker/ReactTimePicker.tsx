import React, { forwardRef } from 'react'
import { Controller } from 'react-hook-form'
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';



type Props = {
    name: string
    control: any
    defaultValue:string
}

export const ReactTimePicker: React.FC<Props> = ({ control, name, defaultValue }) => {

    const [startDate, setStartDate] = React.useState(defaultValue?moment(defaultValue, "HH.mm").toDate():new Date());

    return (
        <>
            <div className='calendar time'>
                <Controller
                    control={control}
                    name={name}
                    rules={{ required: true }}
                    render={({ field: { onChange} }) =>
                        <DatePicker
                            onChange={(date: any) => {console.log(date);setStartDate(date); onChange(moment(date).format("HH.MM")) }}
                            selectsStart
                            startDate={startDate}
                            placeholderText={"введите время"}
                            selected={startDate}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Время"
                            dateFormat="HH:mm"
                        />}
                />
            </div>
        </>
    )
}

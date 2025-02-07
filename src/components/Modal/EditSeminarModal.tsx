import React from 'react'
import { Portal } from '.'
import { useForm } from 'react-hook-form';
import { ISeminar } from '../../models/ISeminar';
import { seminarAPI } from '../../sevices/SeminarService';
import './EditSeminarModal.scss'
import { ReactDatePicker } from '../DatePicker/ReactDatePicker';
import { ReactTimePicker } from '../TimePicker/ReactTimePicker';

type Props = {
    onClose: () => void;
    open: boolean;
    seminar: ISeminar
}

const EditSeminarModal: React.FC<Props> = ({ onClose, open, seminar }) => {

    const { register, handleSubmit, control, formState: { errors } } = useForm<ISeminar>({
        mode: 'onBlur',
        defaultValues: {
            date: seminar.date, // Преобразуем строку в Date
            time: seminar.time, // Преобразуем строку в Date
            photo:seminar.photo
        },
    })

    const [updateSeminar, { isSuccess }] = seminarAPI.useUpdateSeminarMutation()

   
    const onSubmit = (data: ISeminar) => {
        updateSeminar({ id: seminar.id, ...data });
        onClose()
    };

    return (
        <>
            <Portal open={open}>
                <form className='modal__content' onSubmit={handleSubmit(onSubmit)}>
                    <div className='modal__form'>
                        <label>Наименование</label>
                        <textarea {...register("title", { required: true })} defaultValue={seminar.title} />
                    </div>
                    <div className='modal__form'>
                        <label>Описание</label>
                        <textarea {...register("description", { required: true })} defaultValue={seminar.description} />
                    </div>
                    <div className='modal__date'>
                        <ReactDatePicker name='date' control={control} defaultValue={seminar.date} />
                        <ReactTimePicker name='time' control={control} defaultValue={seminar.time}/>
                    </div>
                    <div className='modal__buttons'>
                        <button className='c-btn c-btn-secondary'>Сохранить</button>
                        <button className='c-btn c-btn-primary' type='button' onClick={onClose}>Закрыть</button>
                    </div>
                </form>
            </Portal>
        </>
    )
}

export default EditSeminarModal
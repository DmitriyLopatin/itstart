import React from 'react'
import { ISeminar } from '../../models/ISeminar';
import './SeminarCard.scss'

type Props = {
    seminar:ISeminar
    openEditModal:(seminar:ISeminar)=>void
    deleteseminar:(seminar:ISeminar)=>void
}

export const SeminarCard: React.FC<Props> = ({ seminar, openEditModal,deleteseminar }) => {
    return (
        <div className='seminar-card'>
            <h3 className='seminar-card__title'>{seminar.id}. {seminar.title}</h3>
            <p className='seminar-card__description'>{seminar.description}</p>
           <div className='seminar-card__time-info'>
                <p className='seminar-card__date'>{seminar.date ??"Дата не указана"}</p>
                <p className='seminar-card__time'>{seminar.time ??"Время не указано"}</p>
           </div>
            <img className='seminar-card__img' src={seminar.photo} alt="seminar image" loading="lazy"/>
            <div className='seminar-card__buttons'>
                <button onClick={() => deleteseminar(seminar)}>Delete</button>
                <button onClick={() => openEditModal(seminar)}>Update</button>
            </div>
        </div>
    );
}
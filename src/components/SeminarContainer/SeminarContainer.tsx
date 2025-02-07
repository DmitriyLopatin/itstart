import React from 'react'
import { seminarAPI } from '../../sevices/SeminarService'
import './seminarContainer.scss'
import { ISeminar } from '../../models/ISeminar'
import EditSeminarModal from '../Modal/EditSeminarModal'
import { SeminarCard } from '../SeminarCard/SeminarCard'


const SeminarContainer = () => {

    const [showModal, setShowModal] = React.useState(false)
    const { data: seminars, error, isLoading } = seminarAPI.useFetchAllSeminarsQuery("100")
    const [deleteSeminar, { }] = seminarAPI.useDeleteSeminarMutation()

    const handleDeleteseminar = (seminar: ISeminar) => {
        deleteSeminar(seminar)
    }
    const [selecteSeminar, setSelecteSeminar] = React.useState<ISeminar | null>(null);

    const openEditModal = (seminar: ISeminar) => {
        setShowModal(true)
        setSelecteSeminar(seminar);
    };

    const closeEditModal = () => {
        setShowModal(false)
        setSelecteSeminar(null);
    };

    return (
        <div className='seminars-container'>
            <h2>{error ? JSON.stringify(error) : "Список доступных семинаров"}</h2>
            {isLoading && <h2>Загружаемся</h2>}
            <div className='seminar-cards'>
                {seminars?.map(el =>
                    <SeminarCard
                        key={el.id}
                        seminar={el}
                        deleteseminar={handleDeleteseminar}
                        openEditModal={openEditModal}
                    />
                )}

            </div>

            {selecteSeminar && (
                <EditSeminarModal
                    seminar={selecteSeminar}
                    open={showModal}
                    onClose={closeEditModal}
                />
            )}
        </div>
    )
}

export default SeminarContainer
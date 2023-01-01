import React, { useEffect, useState } from "react";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { useParams } from "react-router-dom";
import Spinner from "../components/spinner/Spinner";

const User = () => {

    const { id } = useParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1000);
    }, [])

    return (
        <>
            {localStorage.getItem("username") === id
                ? <>
                    <h1>Welcome {id}</h1>
                    <Modal closeOnEsc={false} closeOnOverlayClick={false} showCloseIcon={false} open={loading} center>
                        <h2>Veriler yükleniyor</h2>
                        <Spinner />
                    </Modal>
                </> : <h1>Buna yetkiniz bulunmamaktadır !</h1>}
        </>
    )
}

export default User;
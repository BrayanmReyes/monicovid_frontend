import React from 'react'
import styles from './Recommendations.module.css'

const Recommendations = () => {
    return (
        <>
            <p className={styles.titulos}>Te damos algunos consejos:</p>
            <p className={styles.parrafos}>Te recomendamos monitorearte cada 8 horas para mantener un control adecuado de sus parámetros.</p>
            <p className={styles.parrafos}>Por ejemplo, puedes monitorearte a las 7 am., luego a las 3 pm. y finalmente a las 11pm.</p>
            <div className={styles.space}>&nbsp;</div>
            <p className={styles.titulos}>¿Dónde acudir?</p>
            <p className={styles.parrafos}>Llama al 113 o dirígete a un establecimiento que cuente con punto COVID.</p>
            <p className={styles.parrafos}>Actualmente también hay Centros de Aislamiento Temporal y Seguimiento (CATS) en todas las regiones del país.</p>
            <div className={styles.space}>&nbsp;</div>
            <p className={styles.parrafos}>
                Si deseas conocer más información haz clic
                <a href="https://www.gob.pe/8733-cuidar-a-un-paciente-sospechoso-de-haber-contraido-coronavirus-covid-19"> aquí</a>
            </p>
        </>
    )
}

export default Recommendations

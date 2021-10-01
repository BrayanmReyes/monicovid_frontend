import React from 'react'

const MedicalCenters = () => {
    return (
        <>
            <div style={{ margin: '1.5rem 3.5rem', display: 'flex', flexDirection: 'column' }}>
                <iframe
                    height="500px"
                    frameBorder="0"
                    src="https://www.google.com/maps/embed/v1/search?key=AIzaSyA-TqzjlJOMJSpC6HSVI_h-gCVDZPRZxZc&q=health+center+near+me&zoom=8"
                    allowFullScreen>
                </iframe>
            </div>
        </>
    )
}

export default MedicalCenters

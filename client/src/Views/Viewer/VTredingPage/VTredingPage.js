import React from 'react'
import {ObosorBest} from '../../../Components/Viewer/ObosorBest'
import {Nav1} from '../../../Components/Viewer/Navbar'
import {Footer} from '../../../Components/Viewer/Footer'

const VTredingPage = () => {
    return (
        <div>
            <Nav1/>
            
            <ObosorBest title="Trending" />
            <Footer/>
        </div>
    )
}

export default VTredingPage

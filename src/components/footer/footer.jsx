import React from 'react'
import "./footer.scss"
import Google from '../../assets/google.png'

export default function footer() {
  return (
    <div className='footer'>
        <div className='sb__footer_section__padding'>
            <div className='sb__footer-links'>
                <div className='sb__footer-links_div'>
                    <h2>All Exams</h2>
                    <a href='/Grade6th'>
                        <p>Grade 6th</p>
                    </a>
                    <a href='/Grade6th'>
                        <p>Grade 8th</p>
                    </a>
                    <a href='/Grade6th'>
                        <p>Grade 12th</p>
                    </a>
                    <a href='/Grade6th'>
                        <p>Exit Exam</p>
                    </a>
                    <a href='/Grade6th'>
                        <p>TOEFL and more</p>
                    </a>
                </div>
                <div className='sb__footer-links_div'>
                    <h2>Blogs Topics</h2>
                    <a href='/Grade6th'>
                        <p>Exam Tips</p>
                    </a>
                    <a href='/Grade6th'>
                        <p>Study Techinques</p>
                    </a>
                    <a href='/Grade6th'>
                        <p>Resource recomendations</p>
                    </a>
                </div>
                <div className='sb__footer-links_div'>
                    <h2>Our partners</h2>
                    <a href='/Grade6th'>
                        <p>ASTU</p>
                    </a>
                    <a href='/Grade6th'>
                        <p>MWU</p>
                    </a>
                    <a href='/Grade6th'>
                        <p>MoE</p>
                    </a>
                </div>
                <div className='sb__footer-links_div'>
                    <h2>Contuct Us</h2>
                    <a href='/Grade6th'>
                        <p>www.ofijan.com</p>
                    </a>
                    <a href='/Grade6th'>
                        <p>Bale, Robe, Ethiopia</p>
                    </a>
                </div>
                <div className='sb__footer-links_div'>
                    <h2>Cooming soon on</h2>
                    <div className='socialmedia'>
                        <p><img src={Google} width={100} height={100}/></p>
                        
                    </div>
                </div>
            </div>
            <hr></hr>
            <div className='sb__footer-below'>
                <div className='sb__footer-copyright'>
                    <p>
                        @{new Date().getFullYear()} Ofijan. All Rights Reserved. 
                    </p>
                </div>
                <div className='sb__footer-below-links'>
                   <a href='/terms'>
                    <div>
                        <p>Terms & Conditions</p>
                    </div>
                    </a>
                    <a href='/terms'>
                    <div>
                        <p>Privacy</p>
                    </div>
                    </a>
                </div>
            </div>
        </div>
      
    </div>
  )
}

import Wrapper from '../wrapper/Wrapper'
import './Grade12.scss';
const Grade12 = () => {
  return <section className="grade12">
    <Wrapper grade12-holder>
       <ul className='g12_subjects'>
        <li>Mathematics(N)</li>
        <li>Mathematics(S)</li>
        <li>Economics</li>
        <li>Biology</li>
        <li>Geography</li>
        <li>Chemistry</li>
        <li>History</li>
        <li>Aptitude</li>
        <li>English</li>
        <li>Phyiscs</li>
       </ul>
    </Wrapper>
  </section>
}

export default Grade12
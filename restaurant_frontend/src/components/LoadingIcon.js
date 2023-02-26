import LoadingIcon from './Images/LoadingIcon.mp4'

export function Loading(){
    return (
        <video className='loading-icon' autoPlay loop>
        <source src={LoadingIcon} type="video/mp4"/>
      </video>
    )
}
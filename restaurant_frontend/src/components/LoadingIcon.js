import LoadingIcon from './Images/LoadingIcon.mp4'

//Component for the loading icon
export function Loading(){
    return (
        <video className='loading-icon' autoPlay loop muted playsInline controls={false}>
          <source src={LoadingIcon} type="video/mp4"/>  
        </video>
    )
}
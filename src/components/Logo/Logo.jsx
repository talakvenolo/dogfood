import './index.css';
import logoSrc from './logo.svg'

function Logo({className, href, ...restProps}) {
  return (
    <a href={href ? href : '#'} className={className ? className : 'logo'} {...restProps}>
        <img src={logoSrc} alt="Логотип компании" className='logo__pic' />
    </a>
  )
}

export default Logo;

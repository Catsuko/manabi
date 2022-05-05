import cn from 'classnames'

function Button({ icon, description, onClick, disabled }) {
  return (
    <button
      type='button'
      className={cn('input-reset bn bg-transparent outline-0', { 'dim pointer': !disabled })}
      onClick={onClick}
      disabled={disabled}
    >
      <img alt={description} src={icon} className={cn('h2', { 'o-20': disabled})} />
    </button>
  )
}

export default Button;

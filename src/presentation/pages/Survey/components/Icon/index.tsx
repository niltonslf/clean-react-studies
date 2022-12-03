type IconProps = {
  iconName: IconName
}

export enum IconName {
  'thumbUp' = 'UP',
  'thumbDown' = 'Down',
}

export const Icon: React.FC<IconProps> = ({ iconName }) => {
  const className = iconName === IconName.thumbUp ? 'green' : 'red'

  return (
    <div className={`icon-wrap ${className}`} data-testid='icon'>
      {iconName === IconName.thumbUp && <img src='/assets/thumb-up.png' alt='up' />}
      {iconName === IconName.thumbDown && <img src='/assets/thumb-down.png' alt='down' />}
    </div>
  )
}

Icon.displayName = 'Icon'

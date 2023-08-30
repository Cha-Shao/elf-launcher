import { Waypoint } from 'react-waypoint'
import { useState } from 'react'
import classNames from 'classnames'

interface VersionCardProps {
  id: string
  image: string
  content: string
  desc: string
}

const VersionCard = (version: VersionCardProps) => {
  const [visible, setVisible] = useState(false)

  return (
    <Waypoint
      key={version.id}
      onEnter={() => setVisible(true)}
      onLeave={() => setVisible(false)}
    >
      <div className={classNames(
        'flex items-center gap-2',
        'p-2 rounded-md',
        'hover:bg-lightBackground dark:bg-darkBackground',
        'duration-200',
        visible ? 'opacity-100' : 'opacity-0',
      )}>
        <img
          src={version.image}
          alt=""
          className='w-8'
        />
        <div>
          <p>{version.content}</p>
          <p className='opacity-50 text-xs'>{version.desc}</p>
        </div>
      </div>
    </Waypoint>
  )
}

export default VersionCard

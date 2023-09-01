import { Waypoint } from 'react-waypoint'
import {
  HTMLAttributes,
  useState,
} from 'react'
import classNames from 'classnames'

interface VersionCardProps {
  id: string
  image: string
  content: string
  desc: string
}

const VersionCard = (version: VersionCardProps & HTMLAttributes<HTMLDivElement>) => {
  const {
    id,
    image,
    content,
    desc,
    ...attrs
  } = version

  const [visible, setVisible] = useState(false)

  return (
    <Waypoint
      key={id}
      onEnter={() => setVisible(true)}
      onLeave={() => setVisible(false)}
    >
      <div
        {...attrs}
        className={classNames(
          'flex items-center gap-2',
          'p-2 rounded-md',
          'hover:bg-lightBackground dark:bg-darkBackground',
          'duration-200',
          visible ? 'opacity-100' : 'opacity-0',
        )}
      >
        <img
          src={image}
          alt=""
          className='w-8'
        />
        <div>
          <p>{content}</p>
          <p className='opacity-50 text-xs'>{desc}</p>
        </div>
      </div>
    </Waypoint>
  )
}

export default VersionCard

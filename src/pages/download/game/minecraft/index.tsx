import {
  useCallback,
  useEffect,
  useState,
} from 'react'
import Title from '../../../../components/Base/Title'
import { t } from 'i18next'
import Card from '../../../../components/Base/Card'
import {
  AnimatePresence,
  motion,
} from 'framer-motion'

interface VersionManifest {
  latest: {
    release: string
    snapshot: string
  }
  versions: {
    id: string
    type: 'release' | 'snapshot' | 'old_beta' | 'old_alpha'
    url: string
    time: string
    releaseTime: string
  }[]
}
import dayjs from 'dayjs'
import VersionCard from '../../../../components/Download/VersionCard'

const Page = () => {
  const versionTypes = ['release', 'snapshot', 'old']
  const [versionManifest, setVersionManifest] = useState<VersionManifest | null>(null)
  const [selectedType, setSelectedType] = useState('release')

  const getVersions = useCallback(async () => {
    const versions: VersionManifest = await fetch('https://piston-meta.mojang.com/mc/game/version_manifest.json')
      .then(res => res.json())
    setVersionManifest(versions)
  }, [])

  useEffect(() => {
    getVersions()
  }, [])

  return (
    <>
      <Title size='lg' className='mb-4'>
        {t('download.game.minecraft.label')}
      </Title>
      <Card>
        <div className='p-1 rounded-lg bg-lightBackground dark:bg-darkBackground grid grid-cols-3 gap-1 mb-2'>
          {versionTypes.map((versionType, i) => (
            <button
              key={i}
              className='h-8 relative'
              onClick={() => setSelectedType(versionType)}
            >
              <span className='relative z-10'>{t(`download.game.minecraft.${versionType}`)}</span>
              <AnimatePresence>
                {selectedType === versionType && (
                  <motion.div
                    layoutId='version-type'
                    className='w-full h-full rounded-md absolute left-0 top-0 bg-light dark:bg-dark'
                  />
                )}
              </AnimatePresence>
            </button>
          ))}
        </div>
        <div className='h-[calc(100vh-11rem)] overflow-y-scroll divide-y divide-border'>
          {versionManifest?.versions
            .filter(version => version.type.startsWith(selectedType))
            .map((version, i) => {
              const image = (() => {
                switch (version.type) {
                  case 'release': return '/grass_block.png'
                  case 'snapshot': return '/command_block.png'
                  default: return '/cobblestone.png'
                }
              })()
              return (
                <VersionCard
                  key={i}
                  id={version.id}
                  image={image}
                  content={version.id}
                  desc={dayjs(version.releaseTime).format('YYYY-MM-DD hh:mm')}
                />
              )
            })}
        </div>
      </Card>
    </>
  )
}

export default Page

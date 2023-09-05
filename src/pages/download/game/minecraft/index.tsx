import Title from '../../../../components/Base/Title'
import RouteAnimate from '../../../../components/RouteAnimate'
import {
  useCallback,
  useEffect,
  useState,
} from 'react'
import { t } from 'i18next'
import {
  AnimatePresence,
  motion,
} from 'framer-motion'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router'
import Card from '~/components/Base/Card'
import Skeleton from '~/components/Base/Skeleton'
import VersionCard from '~/components/Download/VersionCard'

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

const Page = () => {
  const versionTypes = ['release', 'snapshot', 'old']
  const [versionManifest, setVersionManifest] = useState<VersionManifest | null>(null)
  const [selectedType, setSelectedType] = useState('release')
  const navigator = useNavigate()

  const getVersionManifest = useCallback(async () => {
    const versions: VersionManifest = await fetch('https://piston-meta.mojang.com/mc/game/version_manifest.json')
      .then(res => res.json())
    setVersionManifest(versions)
  }, [])

  useEffect(() => {
    getVersionManifest()
  }, [])

  return (
    <RouteAnimate className='h-full flex flex-col'>
      <Title size='lg' className='mb-4'>
        {t('download.game.minecraft.label')}
      </Title>
      <Card className='grow overflow-hidden'>
        <div className='h-full flex flex-col overflow-hidden'>
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
          <div className='grow overflow-y-scroll'>
            {versionManifest
              ? versionManifest.versions
                .filter(version => version.type.startsWith(selectedType))
                .map(version => {
                  const image = (() => {
                    switch (version.type) {
                      case 'release': return '/img/icon/grass_block.png'
                      case 'snapshot': return '/img/icon/command_block.png'
                      default: return '/img/icon/cobblestone.png'
                    }
                  })()
                  return (
                    <VersionCard
                      key={version.id}
                      id={version.id}
                      image={image}
                      content={version.id}
                      desc={dayjs(version.releaseTime).format('YYYY-MM-DD hh:mm')}
                      onClick={() => navigator('/download/game/minecraft/install?' + new URLSearchParams({
                        url: version.url,
                      }))}
                    />
                  )
                }) : Array(6).fill(null).map((_, i) => (
                  <Skeleton key={i} className='h-16 mb-1 bg-lightBackground ark:bg-darkBackground' />
                ))
            }
          </div>
        </div>
      </Card>
    </RouteAnimate>
  )
}

export default Page

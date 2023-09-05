import { t } from 'i18next'
import {
  useCallback,
  useEffect,
  useState,
} from 'react'
import { useLocation } from 'react-router'
import Button from '~/components/Base/Button'
import Card from '~/components/Base/Card'
import Input from '~/components/Base/Input'
import Title from '~/components/Base/Title'
import RouteAnimate from '~/components/RouteAnimate'
import { VersionData } from '~/types/version'
import useQuery from '~/utils/useQuery'

const Page = () => {
  const [versionData, setVersionData] = useState<VersionData | null>(null)
  const [installData, setInstallData] = useState({
    versionName: '',
  })

  const { search } = useLocation()
  const query = useQuery(search)
  const url = query.get('url')!

  const getVersionData = useCallback(async () => {
    const versionData = await fetch(url)
      .then(res => res.json())
    setVersionData(versionData)
    setInstallData(prevData => ({
      ...prevData,
      versionName: versionData.id,
    }))
  }, [])

  useEffect(() => {
    getVersionData()
  }, [])

  return (
    <RouteAnimate>
      <Title size='lg' className='mb-4'>
        安装
      </Title>
      {versionData ? (
        <div>
          <Card className='mb-2'>
            <div className='flex items-center'>
              <p className='mr-6'>版本名称</p>
              <Input
                defaultValue={versionData.id}
                className='grow'
                onChange={val => setInstallData(prevData => ({
                  ...prevData,
                  versionName: val,
                }))}
              />
            </div>
          </Card>
          <div className='grid grid-cols-2 gap-2'>
            <Button>
              <div className='py-4 flex flex-col items-center'>
                <img src="/img/icon/forge.png" alt="" className='w-32 dark:hidden' />
                <img src="/img/icon/forge_dark.png" alt="" className='w-32 hidden dark:block' />
                <p className='text-lg'>Forge</p>
                <p className='opacity-50'>未选择</p>
              </div>
            </Button>
            <Button>
              <div className='flex flex-col items-center'>
                <img src="/img/icon/fabric.png" alt="" className='w-32' />
                <p className='text-lg'>Fabric</p>
                <p className='opacity-50'>未选择</p>
              </div>
            </Button>
          </div>
        </div>
      ) : (
        'loading'
      )}
      <div className='my-4 text-center'>
        <Button
          size='lg'
          variant='primary'
          className='px-8'
        >
          {t('download.install.label')}
        </Button>
      </div>
      {JSON.stringify(installData)}
    </RouteAnimate>
  )
}

export default Page

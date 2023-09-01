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
  const { search } = useLocation()
  const query = useQuery(search)
  const [installData, setInstallData] = useState({
    versionName: '',
  })

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
                className='flex-grow'
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
                <p>Forge</p>
              </div>
            </Button>
            <Button>
              <div className='flex flex-col items-center'>
                <img src="/img/icon/fabric.png" alt="" className='w-32' />
                <p>Fabric</p>
              </div>
            </Button>
          </div>
        </div>
      ) : (
        'loading'
      )}
      {JSON.stringify(installData)}
    </RouteAnimate>
  )
}

export default Page

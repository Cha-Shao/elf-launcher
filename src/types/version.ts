interface GameRule {
  rules: {
    action: 'allow',
    features: { [key: string]: boolean }
  }[]
  value: string | string[]
}
interface JVMRule {
  rules: {
    action: 'allow',
    os: { name: 'windows' | 'linux' | 'osx' } | { arch: 'x86' }
  }[]
  value: string | string[]
}
interface Download {
  sha1: string
  size: number
  url: string
}
interface Library {
  downloads: {
    artifact: {
      path: string
      sha1: string
      size: number
      url: string
    }
  }
  name: string
  rules?: {
    action: 'allow',
    os: { name: 'windows' | 'linux' | 'osx' }
  }[]
}

export interface VersionData {
  arguments: {
    game: (string | GameRule)[]
    jvm: (string | JVMRule)[]
  }
  assetIndex: {
    id: string
    sha1: string
    size: number
    totalSize: number
    url: string
  }
  assets: string
  complianceLevel: number
  downloads: {
    client: Download
    client_mappings: Download
    server: Download
    server_mappings: Download
  }
  id: string
  javaVersion: {
    component: string
    majorVersion: number
  }
  libraries: Library[]
  logging: {
    client: {
      argument: string
      file: {
        id: string
        sha1: string
        size: number
        url: string
      }
      type: string
    }
  }
  mainClass: string
  minimumLauncherVersion: number
  releaseTime: string
  time: string
  type: string
}

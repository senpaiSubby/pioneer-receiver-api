declare enum VolumeParam {
  up = 'VU',
  down = 'VD',
  status = '?V'
}

declare type INPUT =
  | 'dvd'
  | 'bd'
  | 'tv/sat'
  | 'dvd/bdr'
  | 'video-1'
  | 'video-2'
  | 'hdmi-1'
  | 'hdmi-2'
  | 'hdmi-3'
  | 'hdmi-4'
  | 'hdmi-5'
  | 'ipod-usb'
  | 'xm-radio'
  | 'cd'
  | 'cd-tape'
  | 'tuner'
  | 'phono'
  | 'multi-channel-in'
  | 'adapter-port'
  | 'sirius'

interface PioneerStatus {
  S: number
  B: number
  Z: Z[]
  L: number
  A: number
  IL: string[]
  LC: string
  MA: number
  MS: string
  MC: number
  HP: number
  HM: number
  DM: any[]
  H: number
}

interface Z {
  P: number
  V: number
  M: number
  I: number[]
  C: number
}

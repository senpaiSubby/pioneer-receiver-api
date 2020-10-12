export const volumeToDB = (level: number) => {
  const minLevel = 1
  const maxLevel = 185
  const minDb = -80.0
  const maxDb = 12.0

  const volumePerLevel = (maxDb - minDb) / (maxLevel - minLevel)
  return minDb + (level - minLevel) * volumePerLevel
}

export const formatVolume = (db: number) => {
  if (db == 0) return '0.0 dB'
  else if (db > 0) return `+${db.toFixed(1)} dB`
  else return `${db.toFixed(1)} dB`
}

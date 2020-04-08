/*-------------------------------------------------------
- Coded by CallMeKory - https://github.com/callmekory   -
- It’s not a bug – it’s an undocumented feature.        -
-------------------------------------------------------*/
import fetch from 'node-fetch'
import teletype from 'teletype'

import { INPUT_NUMS } from './constants'

/**
 * Pioneer AVR coontroler
 * Controls Pioneer AVR's over wifi
 * @param host Host IP of receiver
 */
export default class Pioneer {
  private host: string
  private statusEndpoint: string
  private commandEndpoint: string

  constructor(host: string) {
    this.host = host
    this.statusEndpoint = `http://${this.host}/StatusHandler.asp`
    this.commandEndpoint = `http://${this.host}/EventHandler.asp?WebToHostItem=`
  }

  async getStatus() {
    const response = await fetch(this.statusEndpoint)
    const json = await response.json()
    return json as PioneerStatus
  }

  async sendCommand(command: string) {
    try {
      await fetch(`${this.commandEndpoint}${command}`)
    } catch {
      throw new Error('Failed to connect to reciever')
    }
  }

  // * -------------------- Power Options --------------------

  /**
   * Powers receiver on
   */
  async powerOn() {
    return this.sendCommand('PO')
  }

  /**
   * Powers receiver off
   */
  async powerOff() {
    return this.sendCommand('PF')
  }

  // * -------------------- Volume Options --------------------

  /**
   * Sets the volume
   * @param newVol volume between 0 and 100
   */
  async setVolume(newVol: number) {
    if (newVol > 100 || newVol < 0) {
      return new Error('Volume must be a number between 0 and 100')
    }

    // Convert 0-100 to 0-185
    let newVolume = String(Math.floor((newVol * 185) / 100))

    if (newVolume.length === 1) newVolume = `00${newVolume}`
    if (newVolume.length === 2) newVolume = `0${newVolume}`

    return this.sendCommand(`${newVolume}VL`)
  }

  async getVol() {
    const status = await this.getStatus()

    const vol = status.Z[0].V
    return Math.floor((vol! * 100) / 185)
  }

  /**
   * Increases volume by 1dB's
   */
  async volumeUp() {
    await this.sendCommand('VU')

    return this.sendCommand('VU')
  }

  /**
   * Reduces volume by 1dB's
   */
  async volumeDown() {
    await this.sendCommand('VD')
    return this.sendCommand('VD')
  }

  /**
   * Mutes receiver
   */
  async mute() {
    return this.sendCommand('MO')
  }

  /**
   * Unmutes receiver
   */
  async unMute() {
    return this.sendCommand('MF')
  }

  // * -------------------- Input Options --------------------

  /**
   * Sets input to specified input
   * @param newInput One of the INPUT types
   */
  async setInput(newInput: INPUT) {
    const input = INPUT_NUMS[newInput]

    return this.sendCommand(`${input}FN`)
  }

  /**
   * Switches to next input source
   */
  async inputNext() {
    return this.sendCommand('FU')
  }

  /**
   * Switches to previous input source
   */
  async inputPrev() {
    return this.sendCommand('FD')
  }

  // * -------------------- Tone Control Options --------------------

  /**
   * Increases base level by 1dB
   */
  async baseUp() {
    return this.sendCommand('BI')
  }

  /**
   * Decreases base level by 1dB
   */
  async baseDown() {
    return this.sendCommand('BD')
  }

  /**
   * Increases treble level by 1dB
   */
  async trebleUp() {
    return this.sendCommand('TI')
  }

  /**
   * Decreases treble level by 1dB
   */
  async trebleDown() {
    return this.sendCommand('TD')
  }
}

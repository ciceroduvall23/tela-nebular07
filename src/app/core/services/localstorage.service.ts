import { Injectable } from '@angular/core'
import { dec, enc } from '@core/helpers'
import { LocalStorageKeys, User } from '@core/models'

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  getUser() {
    return this.get(LocalStorageKeys.USER)
  }
  setUser(user: User) {
    this.set(LocalStorageKeys.USER, user)
  }
  removeUser() {
    this.remove(LocalStorageKeys.USER)
  }

  getRemmemberMe(): { remmember: boolean; timestamp: number } {
    return this.get(LocalStorageKeys.REMMEMBER_ME)
  }
  setRemmemberMe(remmember: boolean) {
    this.set(LocalStorageKeys.REMMEMBER_ME, {
      remmember,
      timestamp: new Date().toISOString(),
    })
  }

  getUserPassword() {
    return this.get(LocalStorageKeys.USER_PASSWORD)
  }
  setUserPassword(password: string) {
    this.set(LocalStorageKeys.USER_PASSWORD, { password })
  }

  clear() {
    localStorage.clear()
  }

  private get(key: LocalStorageKeys, required?: boolean) {
    const json = localStorage.getItem(key) as string
    const jsonIsInvalid = !json || !json.length || json.length <= 0
    if (jsonIsInvalid) {
      if (required) throw new Error(`Could not retrieve localStorage data for key ${key}`)
      return null
    }
    return JSON.parse(dec(json))
  }

  private set(key: LocalStorageKeys, value: { [key: string]: any }) {
    return localStorage.setItem(key, enc(JSON.stringify(value)))
  }

  private remove(key: LocalStorageKeys) {
    return localStorage.removeItem(key)
  }
}

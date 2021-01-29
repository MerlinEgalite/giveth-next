
import { ProjectNameInput } from '../components/create-project-form/inputs/ProjectNameInput';
import { isAddressENS } from '../services/wallet';

export default class User {
  id: number
  token: string
  walletAddresses: string[]
  email?: string
  firstName?: string
  lastName?: string
  name?: string
  walletAddress?: string
  password?: string
  avatar?: string
  url?: string
  location?: string
  loginType: string
  confirmed: boolean
  walletType: string
  
  constructor(walletType, initUser) {
    this.walletType = walletType
    console.log('User constructor')
    this.walletAddresses = []

    if(initUser) {
      this.parseInitUser(initUser)
    }
  }

  parseInitUser(initUser) {
    if(this.walletType === 'torus') {
      this.parseTorusUser(initUser) 
    } else {
      console.log(`JJJ initUser : ${JSON.stringify(initUser, null, 2)}`)
      this.walletType = initUser.walletType
      console.log(`this.walletAddresses ---> : ${this.walletAddresses}`)
      this.walletAddresses = initUser.walletAddresses
      this.id = initUser.id
      this.token = initUser.token
    }
  }

  setUserId(userId) {
    this.id = userId
  }

  setToken(token) {
    this.token = token
    localStorage.setItem('token', token)
  }

  addWalletAddress(address) {
    this.walletAddresses.push(address)
  }

  getAuthObject() {
    return {
        addresses: this.walletAddresses
    }
  }

  getName() {
    console.log(`this.name ---> : ${this.name}`)
    console.log(`this.walletAddress : ${JSON.stringify(this.walletAddress, null, 2)}`)
    function truncAddress (address) {
      return `${address.substring(0, 5)}...${address.substring(
        address.length - 4,
        address.length
      )}`
    }
    
    return this.name ? this.name.toUpperCase() : truncAddress(this.getWalletAddress())
    // return /(.+)@(.+){2,}\.(.+){2,}/.test(this.name)
    //         ? this.name?.toUpperCase()
    //         : this.name
  }
  getWalletAddress() {
    console.log(`debug: this.walletAddresses : ${JSON.stringify(this.walletAddresses, null, 2)}`)
    
    return this.walletAddresses && this.walletAddresses.length > 0 ? this.walletAddresses[0] : ''
  }  
  // organisations: Organisation[]
  
  parseTorusUser(torusUser) {
    if(this.walletType !== 'torus') throw Error ('Only valid for Torus wallets')
    this.avatar = torusUser.profileImage
    this.name = torusUser.name
    this.email = torusUser.email
    this.walletAddresses = torusUser.addresses
    this.id = torusUser.id
  }
}
import { AxiosResponse } from "axios"
import { MouseEventHandler } from "react"

export default interface Component {
  id: number
  name: string
}

export interface componentData {
  id: number
  title: string
  category: string
  description: string
  features: string[]
  available: boolean
  price: number
  image: string
}

export type cardInfoProps = {
  // children: React.ReactNode; //!!!!!!!!!!!!
  id: number
  title: string
  category: string
  description: string
  features: string[]
  available: boolean
  price: number
  image: string
  onAddClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export type cartItemProps = {
  id: number
  title: string
  category: string
  description: string
  features: string[]
  available: boolean
  price: number
  image: string
  amount: number
  updateAllow: boolean
  onDelete: (id: number) => void
  onAmountUpdate: (id: number, action: number) => void
}

export type Response = Promise<AxiosResponse> | any
interface Customer {
  email: string
}

export type applicationData = {
  id: number
  status: number
  delivery_token: number
  created_at: string
  formed_at: string
  completed_at: string
  moderator: string
  customer: Customer

}

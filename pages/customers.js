import { useRouter } from "next/router"


export default function customers  ()  {
    let router = useRouter()
    const { query,params } = useRouter();

  return (
    <div>customers  new change {params}</div>
  )
}

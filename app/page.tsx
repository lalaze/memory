import { auth } from "../auth";
import View from '../components/view'
import { Session } from "next-auth";


export default async function Home() {

  const session = (await auth()) as Session;

  return (
   <div>
    <View session={session}></View>
   </div>
  );
}

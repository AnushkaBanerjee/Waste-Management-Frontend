
import AddItem from "./components/CreatePickUp/AddItemComp";
import GetLocation from "./components/CreatePickUp/GetLocationComp";
import PreviewItem from "./components/CreatePickUp/PreviewItemComp";

export default function App() {
  return (
    <>
      <GetLocation />
      <AddItem />
      <PreviewItem />
    </>
  )
}
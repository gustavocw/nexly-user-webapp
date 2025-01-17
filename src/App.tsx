import PageMetadata from "routes/meta/pageMetaData"
import AppRoutes from "routes/routes"

function App() {

  return (
    <>
      <PageMetadata title={"Nome da área"} faviconUrl={"/vite.svg"} />
      <AppRoutes />
    </>
  )
}

export default App

import ProductPage from "@/components/ProductPage";

const Page = async({ params }: { params: { title: string } }) =>{
  const resolvedParams = params;
  return <ProductPage title={resolvedParams.title}/>
    
}

export default Page;
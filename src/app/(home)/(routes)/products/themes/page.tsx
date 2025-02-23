import React from 'react'

const Themes = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 p-16'>
      <div className='flex flex-col gap-y-2 pb-16 items-center justify-center w-full md:col-span-3'>
        <h1 className='font-bold text-[42px]'>Find your theme</h1>
        <h2 className='text-neutral-400 text-[18px]'>Jumpstart your store development process with pre-built solutions from Zero and our community.</h2>
      </div>
      {/* <div className=''>
        checkbox
      </div>
      <div className='md:col-span-2 w-full grid grid-cols-1 md:grid-cols-3 gap-4'>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div> */}
    </div>
  )
}

export default Themes
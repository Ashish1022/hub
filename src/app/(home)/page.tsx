import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
      <Link href='/store'>
        <Button>
          Get started.
        </Button>
      </Link>
    </div>
  )
}

export default page


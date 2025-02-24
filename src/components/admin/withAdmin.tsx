import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

const withAdmin = <P extends object>(WrappedComponent: React.ComponentType<P>): React.FC<P> => {
  const ComponentWithAdmin = (props: P) => {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
      if (status === 'loading') return 
      if (!session || session.user.role !== 'admin') {
        router.push('/login')
      }
    }, [session, status, router])

    if (status === 'loading' || !session || session.user.role !== 'admin') {
      return <div>Loading...</div>
    }

    return <WrappedComponent {...props} />
  }

  return ComponentWithAdmin
}

export default withAdmin
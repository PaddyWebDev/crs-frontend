import React from 'react'
import RenderUpdateProfileComponent from './_components/edit-profile'
import { fetchUserDetails } from '@/hooks/user-hooks'
import { redirect } from 'next/navigation'

interface UpdateProfileProps {
  params: {
    Id: string
  }
}

export default async function UpdateProfilePage({ params }: UpdateProfileProps) {

  const user = await fetchUserDetails(params.Id)

  if (!user) {
    redirect("/guest/Login")
  }
  return (
    <React.Suspense>
      <RenderUpdateProfileComponent userDetails={user} userId={params.Id} />
    </React.Suspense>
  )
}


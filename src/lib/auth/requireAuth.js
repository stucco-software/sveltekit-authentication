import { redirect } from '@sveltejs/kit'

const requireAuth = async ({url, cookies}) => {
  let route = url.pathname
  let knock = url.searchParams.get('knock')
  let session = cookies.get('session')
  if (!session && !knock) {
    throw redirect(307, `/auth?redirect=${route}`)
  }
}

export default requireAuth

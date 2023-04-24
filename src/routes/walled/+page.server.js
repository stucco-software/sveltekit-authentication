import auth from '$lib/auth/requireAuth'

export const load = async ({url, cookies}) => {
  await auth({url, cookies})
  return {}
}

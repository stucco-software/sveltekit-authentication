import { redirect } from '@sveltejs/kit'

export async function POST({ request, cookies }) {
  let formData = await request.formData()
  let id = formData.get('id')
  // this is cookie delete I guess
  cookies.set("session", "", {
    httpOnly: true,
    path: '/',
    maxAge: 0
  })
  // weird but whatever
  throw redirect(307, `/`)
}
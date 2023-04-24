// import queryValidAgent from '$lib/queryValidAgent'
// import { send } from '$lib/mail/send'
// import { insertJSON } from '$lib/ld/query'
// import template from './email.html?raw'
// import interpolate from '$lib/interpolate'
// import { redirect } from '@sveltejs/kit'

export async function load({url}) {
  let redirect = url.searchParams.get('redirect')
  return {
    redirect
  }
}

// const generateKnockToken = async (email) => {
//   let expiryMin = 10
//   let now = Date.now()
//   let expires = now + (expiryMin * 60000)
//   let knock = crypto.randomUUID()
//   let data = {
//     id: `urn:uuid:${knock}`,
//     attachedTo: `email:${email}`,
//     expires: expires
//   }
//   await insertJSON(data)
//   console.log(knock)
//   console.log(data)
//   return knock
// }
//
// export const actions = {
//   default: async ({url, request, cookies}) => {
//     let formData = await request.formData()
//     let email = formData.get('email')
//     let route = formData.get('redirect')
//
//     let agentExists = await queryValidAgent(email)
//     if (!agentExists) {
//       throw redirect(307, '/auth/no-user')
//     }
//
//     let token = await generateKnockToken(email)
//     let data = {
//       url: `${url.origin}${route ? route : '/app'}?knock=${token}`
//     }
//     let html = interpolate(template, data)
//
//     console.log(`try sending email: ${email}`)
//     try {
//       let sendResult = await send({
//         to: email,
//         subject: 'Sign in to Pushbroom',
//         html
//       })
//       console.log(sendResult)
//     } catch (e) {
//       console.log(`err?`)
//       console.log(e)
//       throw redirect(307, '/auth/email-failed')
//     }
//
//     throw redirect(307, '/auth/email-sent')
//   }
// };
export const actions = {
  default: async ({url, request}) => {
    let formData = await request.formData()
    let email = formData.get('email')
    return {
      email
    }
  }
};
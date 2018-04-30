import Prismic from "prismic-javascript"

function buildAPIMethod(method) {
  return async (domain, ...args) => {
    const api = await Prismic.getApi(
      {
        gatonafoto: process.env.GATONAFOTO_PRISMIC_REPOSITORY,
        lalis: process.env.LALIS_PRISMIC_REPOSITORY
      }[domain]
    )

    return api[method](...args)
  }
}

export default {
  ...Prismic,
  query: buildAPIMethod("query"),
  getByUID: buildAPIMethod("getByUID"),
  getByID: buildAPIMethod("getByID"),
  getByIDs: buildAPIMethod("getByIDs"),
  parseItem: item => ({
    id: item.id,
    uid: item.uid,
    ...item.data
  })
}

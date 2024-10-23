const store = defineStore("ApiStore", {
  state: (): StateApiStore => ({
    CurrentUrl: "",
    BaseUrl: "",
    LocalBaseUrl: "http://localhost:8080/",
    ApiUrlUserSignUp: "auth/registrieren",
    ApiUrlUserLogin: "auth/login",
    ApiUrlUserTables: "",
    ApiUrlDeleteTable: "",
    RequestOptions: {
      withCredentials: false,
      baseURL: "",
    },
  }),
  getters: {},
  actions: {
    async SetCurrentURL(Api: string) {
      this.CurrentUrl = Api

      this.ApiUrlUserLogin = Api + this.ApiUrlUserLogin

      this.ApiUrlUserSignUp = Api + this.ApiUrlUserSignUp

      this.RequestOptions.baseURL = Api
    },
    async SetApiUrlUserTables() {
      const { _id } = MainStore.UserData
      const UserUrl = this.CurrentUrl + "user/"
      this.ApiUrlUserTables = `${UserUrl}${_id}/tables`
      this.ApiUrlDeleteTable = `${UserUrl}${_id}/tables/`
    },
    async GetTables() {
      try {
        const { data } = await axios.get(
          this.ApiUrlUserTables,
          this.RequestOptions
        )

        await MainStore.PrepareTableToStore(data)

        await MainStore.GetSelectTable(1)
      } catch (er) {
        console.log(er)
      }
    },
    async SaveTables() {
      try {
        const sendTables = MainStore.PrepareTableToSend(MainStore.CurrentTables)

        const res = await axios.patch(
          this.ApiUrlUserTables,
          {
            CurrentTables: sendTables,
          },
          this.RequestOptions
        )
      } catch (error) {
        console.error(error.message)
      }
    },
    async DeleteTable(TableId: string) {
      try {
        const res = await axios.delete(
          `${this.ApiUrlDeleteTable}${TableId}`,
          this.RequestOptions
        )

        if (res.status === 200) {
          await this.GetTables()
        }
      } catch (error) {
        console.error(error.message)
      }
    },
  },
})
InitStore()
export const ApiStore = store()

import { useStorage } from "@vueuse/core"

const Store = defineStore("AuthStore", {
  state: (): StateAuthStore => ({
    StorageData: undefined,

    SingleUpData: {
      Username: "Lorenzo",
      Email: "Lorenzo12696@gmail.com",
      Password: "123",
      PasswordRepeat: "123",
    },
    SingleUpCheck: undefined,

    LoginData: {
      Email: "Lorenzo12696@gmail.com",
      Password: "123",
    },
    LoginStatus: undefined,
    LoginCheck: undefined,

    StayConnected: false,
  }),

  actions: {
    async CheckLogin() {
      if ((sessionStorage || localStorage).length > 0) {
        this.LoginData = this.StorageData
        this.StayConnected = sessionStorage.length > 0 ? false : true
        await MainStore.SetCurrentURL(MainStore.ApiURLs.LocalBaseUrl)
        await this.Login()
      }
    },

    async Login() {
      try {
        const { data, status } = await axios.post(
          MainStore.ApiURLs.ApiUrlUserLogin,
          this.LoginData,
          MainStore.ApiURLs.requestOptions
        )

        if (status === 202) {
          this.LoginCheck = data
          return 202
        }

        if (status === 201) {
          await MainStore.SetUserdata(data)
          this.SetStorage(this.StayConnected ? localStorage : sessionStorage)
          return 201
        }
      } catch (error) {
        console.error(error.message)
      }
    },

    SetStorage(Storage: Storage) {
      this.StorageData = useStorage("Csv", this.LoginData, Storage).value
    },

    async Singelup() {
      try {
        if (this.SingleUpData.Password !== this.SingleUpData.PasswordRepeat) {
          this.SingleUpCheck = "Passwörter sind nicht identisch"
          return 202
        } else {
          const res = await axios.post(
            MainStore.ApiURLs.ApiUrlUsersSingleUp,
            this.SingleUpData
          )
          console.log("ok")
          if (res.status === 202) {
            this.SingleUpCheck = res.data
            return 202
          } else if (res.status === 201) {
            const { Email, Password } = this.SingleUpData
            this.LoginData = { Email, Password }

            return 201
          }
        }
      } catch (error) {
        console.error(error.message)
      }
    },
  },
})
InitStore()

export const AuthStore = Store()

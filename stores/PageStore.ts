const store = defineStore("PageStore", {
  state: (): StatePageStore => ({
    CurrentPages: [],
    MaxPageLength: 21,
    MinPageLength: 1,
    CellWidth: 77,
    NumberOfPages: 0,
    WindowHeight: 0,

    CurrentPage: {
      Number: 0,
      Start: 0,
      End: 0,
    },
  }),
  getters: {
    CurrentPageStart: (state) => state.CurrentPage.Start,
    CurrentPageEnd: (state) => state.CurrentPage.End,
    NavKeys: (state) => ({
      GoBack: state.CurrentPage.Number - 2,
      GoForward: state.CurrentPage.Number,
      GoFirst: 0,
      GoLast: state.CurrentPage.Number - 1,
    }),
  },
  actions: {
    InitPageCalculate() {
      MainStore.SetTableSize()
      this.ResizeWindow()
    },

    SetCurrentPageFirst() {
      this.CurrentPage = this.CurrentPages[0]
    },

    CalculateMax() {
      this.MaxPageLength = Math.round(
        (this.WindowHeight - 200) / this.CellWidth
      )
    },
    ResizeWindow() {
      this.WindowHeight = useNuxtApp().vueApp._container?.clientWidth || 0
      this.CalculateMax()
      this.CalculatePages()

      this.CurrentPage = this.CurrentPages[this.CurrentPage.Number - 1]
    },
    CalculatePages() {
      this.CurrentPages = []
      const MaxPageLength = this.MaxPageLength - 1
      this.CurrentPages.push(new Page(MaxPageLength))
      this.CalculatePageCount()

      for (let i = 0; i < this.NumberOfPages; i++) {
        const currentSeite = this.CurrentPages[i],
          seite = new Page(
            currentSeite.End + MaxPageLength,
            currentSeite.Number + 1,
            currentSeite.End + 1
          )

        this.CurrentPages.push(seite)
      }
    },
    CalculatePageCount() {
      let tableWidth = MainStore.TableSize.Width
      let pageCount = 1

      while (tableWidth >= this.MaxPageLength) {
        pageCount++
        let remainingWidth = tableWidth - this.MaxPageLength
        tableWidth = remainingWidth
      }

      this.NumberOfPages = pageCount - 1
    },

    PageNav(NavKey: string) {
      this.CurrentPage = this.CurrentPages[this.NavKeys[NavKey] || 0]
    },
  },
})
InitStore()

export const PageStore = store()

export const UseMainStore = defineStore("MainStore", {
  state: (): StateMainStore => ({
    UserData: {
      Username: "",
      _id: "",
    },

    CurrentTable: undefined,

    CurrentTables: new Map(),

    CurrentTableId: 1,

    TableSize: {
      Height: 0,
      Width: 0,
    },

    ConfirmationWindow: {
      IsOpen: false,
      Text: "",
    },

    DownloadFileHref: "",

    NewTable: {
      IsOpen: false,
      Error: "",
      TableName: "",
      NumberOfRows: 0,
      NumberOfColumns: 0,
    },

    PageSettings: {
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
    },

    ApiURLs: {
      CurrentUrl: "",
      BaseUrl: "",
      LocalBaseUrl: "http://localhost:8080",
      ApiUrlUserSignUp: "auth/registrieren",
      ApiUrlUserLogin: "auth/login",
      ApiUrlUserTables: "",
      ApiUrlDeleteTable: "",
      requestOptions: {
        withCredentials: false,
        baseURL: "",
      },
    },
  }),
  getters: {
    CurrentPage: (state) => state.PageSettings.CurrentPage,
    CurrentPageStart: (state) => state.PageSettings.CurrentPage.Start,
    CurrentPageEnd: (state) => state.PageSettings.CurrentPage.End,
    FirstRowLength: (state) => state.CurrentTable.TableData.get(1)?.size,
    FirstCellActive: (state) =>
      state.CurrentTable?.TableData.get(1)?.get(1)?.Active,
    FirstCellCellContent: (state) =>
      state.CurrentTable?.TableData.get(1)?.get(1)?.CellContent,
    FirstRow: (state) => state.CurrentTable?.TableData.get(1),
    CurrentTableLength: (state) => state.CurrentTable?.TableData.size,
    CurrentTableTableData: (state) => state.CurrentTable?.TableData,
    CurrentTablesSize: (state) => state.CurrentTables?.size,
  },
  actions: {
    InitPageCalculate() {
      this.SetTableSize()
      this.ResizeWindow()
    },

    SetCurrentPageFirst() {
      this.PageSettings.CurrentPage = this.PageSettings.CurrentPages[0]
    },

    CalculateMax() {
      const { WindowHeight, CellWidth } = this.PageSettings
      this.PageSettings.MaxPageLength = Math.round(
        (WindowHeight - 200) / CellWidth
      )
    },
    ResizeWindow() {
      this.PageSettings.WindowHeight =
        useNuxtApp().vueApp._container?.clientWidth || 0
      this.CalculateMax()
      this.CalculatePages()

      this.PageSettings.CurrentPage =
        this.PageSettings.CurrentPages[this.PageSettings.CurrentPage.Number - 1]
    },
    CalculatePages() {
      this.PageSettings.CurrentPages = []
      const MaxPageLength = this.PageSettings.MaxPageLength - 1
      this.PageSettings.CurrentPages.push(new Page(MaxPageLength))
      this.calculatePageCount()

      for (let i = 0; i < this.PageSettings.NumberOfPages; i++) {
        const currentSeite = this.PageSettings.CurrentPages[i],
          seite = new Page(
            currentSeite.End + MaxPageLength,
            currentSeite.Number + 1,
            currentSeite.End + 1
          )

        this.PageSettings.CurrentPages.push(seite)
      }
    },
    calculatePageCount() {
      let tableWidth = this.TableSize.Width
      let pageCount = 1

      while (tableWidth >= this.PageSettings.MaxPageLength) {
        pageCount++
        let remainingWidth = tableWidth - this.PageSettings.MaxPageLength
        tableWidth = remainingWidth
      }

      this.PageSettings.NumberOfPages = pageCount - 1
    },
    //Seiten wechseln
    PageNav(NavKey: string) {
      const NavKeys = {
        GoBack: this.CurrentPage.Number - 2,
        GoForward: this.CurrentPage.Number,
        GoFirst: 0,
        GoLast: this.CurrentPage.Number - 1,
      }

      this.PageSettings.CurrentPage =
        this.PageSettings.CurrentPages[NavKeys[NavKey] || 0]
    },

    //Create new Table

    CreateNewTable() {
      const { NumberOfColumns, NumberOfRows, TableName } = this.NewTable

      if (this.CheckNewTable()) {
        this.CurrenTablesPuhs(
          new Table({
            TableName,
            TableData: GenerateTableData(NumberOfColumns, NumberOfRows),
          })
        )
        this.GetSelectTabel(this.CurrentTablesSize)
        this.SetAllSectonsFalse()
      }
    },
    CheckNewTable() {
      const { NumberOfColumns, NumberOfRows, TableName } = this.NewTable
      let CheckOk = false

      this.CurrentTables.values().some((Table) => Table.TableName === TableName)
        ? (this.NewTable.Error = "This name is already taken")
        : NumberOfColumns <= 0
        ? (this.NewTable.Error = "The number of columns is too small")
        : NumberOfRows <= 0
        ? (this.NewTable.Error = "The number of rows is too small")
        : (CheckOk = true)

      return CheckOk
    },
    // Tabelle bearbeiten

    // Zellen tauschen

    // Download File

    async DownlodFile(TableIndex: number) {
      this.DownloadFileHref = `data:text/csv;charset=utf-8,${this.FormatData(
        this.CurrentTables.get(TableIndex)!.TableData
      )}`
    },
    FormatData(data: TableDataMap) {
      const formattedData = []

      data.forEach((row) => {
        const rowData = []
        formattedData.push(rowData)

        row.forEach((cell) => {
          rowData.push(cell.cellContent)
        })
      })

      return papa.unparse(formattedData)
    },
    //Tabelle Löschen

    DeleteColum(Index: number) {
      let temp = this.CurrentTable.TableData,
        temp2 = new Map(),
        NewKey = 0

      for (let key = 1; key <= temp.size; key++) {
        temp.get(key).delete(Index)
      }

      temp.forEach((Colum, ColumIndex) => {
        temp2.set(ColumIndex, new Map())

        Colum.forEach(({ CellContent }) => {
          NewKey++
          temp2.get(ColumIndex).set(NewKey, new Cell(CellContent))
        })

        NewKey = 0
      })

      this.CurrentTable.TableData = temp2
    },
    DeleteRow(key: number) {
      let temp = this.CurrentTable.TableData
      temp.delete(key)

      this.CurrentTable.TableData = new Map()

      let NewKey = 0
      temp.forEach((Row) => {
        NewKey++
        this.CurrentTable.TableData.set(NewKey, new Map(Row))
      })
    },
    // Uploade File

    CreateTable(FileName: "", FileData: CsvData) {
      this.CurrenTablesPuhs(
        new Table({
          TableName: FileName,
          TableData: TableDataToMap(CsvDataToTableDataArray(FileData)),
        })
      )
      this.GetSelectTabel(this.CurrentTablesSize)
    },

    async GetFileData(e) {
      const [File] = await e.target.files

      this.CreateTable(File.name.slice(0, -4), papa.parse(File.text()).data)
    },

    // Zellen bearbeiten

    UpdateCell(
      Row: number,
      Column: number,
      CellContent: string,
      Active: boolean
    ) {
      const { Row: lastRow, Column: lastColumn } = this.CurrentTable.CurrentCell
      this.CurrentTable.LastCell = this.CurrentTable.CurrentCell

      this.CurrentTable.CurrentCell = { Row, Column, CellContent, Active }

      this.CurrentTable.TableData.get(row).get(column).Active = true
      this.CurrentTable.TableData.get(lastRow).get(lastColumn).Active = false

      this.CurrentTable.TableData.get(row).get(column).CellContent = CellContent
    },
    // selcet get set values



    SetCurrentTableName() {
      this.CurrentTables.get(this.CurrentTableId).TableName =
        this.CurrentTable.TableName
    },
    SetTableSize() {
      this.TabelenGröße.höhe = this.CurrentTable.TableData.size
      this.TabelenGröße.breite = this.CurrentTable.TableData?.get(1)?.size || 0
    },
    async GetSelectTable(TableIndex: number) {
      this.CurrentTableId = TableIndex

      this.CurrentTable = this.CurrentTables?.get(TableIndex)
    },
    async SetCurrentURL(Api: string) {
      this.ApiURLs.CurrentUrl = Api

      this.ApiURLs.ApiUrlUserLogin = Api + this.ApiURLs.ApiUrlUserLogin

      this.ApiURLs.ApiUrlUserSignUp = Api + this.ApiURLs.ApiUrlUserSignUp

      this.ApiURLs.requestOptions.baseURL = Api
    },
    async SetApiUrlUserTables() {
      const { _id } = this.UserData
      const UserUrl = this.ApiURLs.CurrentUrl + "user/"
      this.ApiURLs.ApiUrlUserTables = `${UserUrl}${_id}/tables`
      this.ApiURLs.ApiUrlDeleteTable = `${UserUrl}${_id}/tables/`
    },

    async SetUserdata(data: { Username: string; _id: string }) {
      this.UserData = data
    },
    async LogOut() {
      localStorage.clear()
    },

    async PrepareTableToStore(SendTables: SendTables) {
      SendTables.forEach(
        ({
          CurrentCell,
          LastCell,
          TableName,
          TableData,
        }: TableType<TableDataArray>) => {
          this.CurrenTablesPuhs(
            new Table({
              CurrentCell,
              LastCell,
              TableName,
              TableData: TableDataToMap(TableData),
            })
          )
        }
      )
    },

    PrepareTableToSend(CurrentTables: CurrentTables): SendTables {
      return CurrentTables.map(
        ({
          CurrentCell,
          LastCell,
          TableName,
          TableData,
        }: TableType<TableDataMap>) =>
          new Table({
            CurrentCell,
            LastCell,
            TableName,
            TableData: TableDataToArray(TableData),
          })
      )
    },
    async CurrenTablesPuhs(Table: TableType<TableDataMap>) {
      this.CurrentTables.set(this.CurrentTablesSize + 1, Table)
    },
    // Requests

    async GetTables() {
      try {
        const { data } = await axios.get(
          this.ApiURLs.ApiUrlUserTables,
          this.ApiURLs.requestOptions
        )

        await this.PrepareTableToStore(data)

        await this.GetSelectTable(1)
      } catch (er) {
        console.log(er)
      }
    },
    async SaveTables() {
      try {
        const sendTables = this.PrepareTableToSend(this.CurrentTables)

        const res = await axios.patch(
          this.ApiURLs.ApiUrlUserTables,
          {
            CurrentTables: sendTables,
          },
          this.ApiURLs.requestOptions
        )

        return res.statusText
      } catch (error) {
        console.error(error.message)
      }
    },
    async DeleteTable(TableId: string) {
      try {
        const res = await axios.delete(
          `${this.ApiURLs.ApiUrlDeleteTable}${TableId}`,
          this.ApiURLs.requestOptions
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
export const MainStore = UseMainStore()

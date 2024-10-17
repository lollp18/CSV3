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
  }),
  getters: {
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

    DeleteTableColum(Index: number) {
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
    DeleteTableRow(key: number) {
      let temp = this.CurrentTable.TableData
      temp.delete(key)

      this.CurrentTable.TableData = new Map()

      let NewKey = 0
      temp.forEach((Row) => {
        NewKey++
        this.CurrentTable.TableData.set(NewKey, new Map(Row))
      })
    },

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

    CloseAllWindos() {
      TableEditStore.IsOpen = false
      NewTableStore.IsOpen = false
    },
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
  },
})
InitStore()
export const MainStore = UseMainStore()

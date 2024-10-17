const store = defineStore("NewTableStore", {
  state: (): StateNewTableStore => ({
    IsOpen: false,
    Error: "",
    TableName: "",
    NumberOfRows: 0,
    NumberOfColumns: 0,
  }),
  getters: {},
  actions: {
    CreateNewTable() {
      const { NumberOfColumns, NumberOfRows, TableName } = this

      if (this.CheckNewTable()) {
        MainStore.CurrenTablesPuhs(
          new Table({
            TableName,
            TableData: GenerateTableData(NumberOfColumns, NumberOfRows),
          })
        )
        MainStore.GetSelectTable(MainStore.CurrentTablesSize)
        MainStore.CloseAllWindos()
      }
    },
    CheckNewTable() {
      const { NumberOfColumns, NumberOfRows, TableName } = this
      let CheckOk = false

      MainStore.CurrentTables.values().some(
        (Table) => Table.TableName === TableName
      )
        ? (this.Error = "This name is already taken")
        : NumberOfColumns <= 0
        ? (this.Error = "The number of columns is too small")
        : NumberOfRows <= 0
        ? (this.Error = "The number of rows is too small")
        : (CheckOk = true)

      return CheckOk
    },
  },
})
InitStore()
export const NewTableStore = store()

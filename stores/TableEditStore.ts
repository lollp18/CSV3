const UseTableEditStore = defineStore("StoreTableEdit", {
  state: (): StateTableEditStore => ({
    IsOpen: false,
    Error: "",

    CurrentSection: "TableEditInsertColumn",
    Sections: {
      InsertColumn: "TableEditInsertColumn",
      SwapColumns: "TableEditSwapColumns",
      InsertRow: "TableEditInsertRow",
      SwapRows: "TableEditSwapRows",
      SwapCells: "TableEditSwapCells",
    },
    Navigation: false,

    Insert: {
      Rows: {
        Row: 0,
        Position: "Above",
        Amount: 0,
      },
      Columns: {
        Column: 0,
        Position: "R",
        Amount: 0,
      },
    },

    Swap: {
      Rows: {
        First: 0,
        Second: 0,
      },
      Columns: {
        First: 0,
        Second: 0,
      },
    },

    SwapCells: {
      FirstCell: {
        Row: 0,
        Column: 0,
      },
      SecondCell: {
        Row: 0,
        Column: 0,
      },
    },
    TempRow: {
      row: [],
      InsertPosition: 0,
    },

    TempColumn: {
      columns: [],
      InsertPosition: 0,
    },
  }),

  getters: {},

  actions: {
    SetCurrentSection(SectionName: string) {
      this.ResetAllSectons()
      this.CurrentSection = SectionName
    },
    ResetAllSectons() {
      this.SetCurrentSection(this.Sections.InsertColumn)
      this.Navigation = false
      this.Error = ""
    },
    ToggelNavigation() {
      this.Navigation = !this.Navigation
    },
    GetOptionValue(value: string, type: "Rows" | "Columns") {
      this.Insert[type].Position = value
    },
    GetInsertIndex(type: "Rows" | "Columns") {
      const { Position } = this.Insert[type]

      if (type === "Rows") {
        const { Row } = this.Insert.Rows
        this.TempRow.InsertPosition = Position === "Above" ? Row - 1 : Row
      } else if (type === "Columns") {
        const { Column } = this.Insert.Columns
        this.TempColumn.InsertPosition = Position === "L" ? Column - 1 : Column
      }
    },
    //------CELLS------//
    CheckCellsSwap() {
      const { FirstCell, SecondCell } = this.SwapCells
      const { Height, Width } = MainStore.TableSize

      if (
        FirstCell.Column < 1 ||
        FirstCell.Row < 1 ||
        SecondCell.Column < 1 ||
        SecondCell.Row < 1
      ) {
        this.Error = "One or both cells do not exist"
        return false
      }

      if (
        FirstCell.Column > Width ||
        FirstCell.Row > Height ||
        SecondCell.Column > Width ||
        SecondCell.Row > Height
      ) {
        this.Error = "One or both cells are outside the table bounds"
        return false
      }

      if (
        FirstCell.Column === SecondCell.Column &&
        FirstCell.Row === SecondCell.Row
      ) {
        this.Error = "The cells are identical"
        return false
      }

      this.Error = ""
      return true
    },

    InitCellsSwap() {
      if (this.CheckCellsSwap()) {
        const { FirstCell, SecondCell } = this.SwapCells
        const table = this.CurrentTable.TableData

        const temp = table
          ?.get(FirstCell.Row)
          ?.get(FirstCell.Column)?.CellContent
        table.get(FirstCell.Row).get(FirstCell.Column).CellContent = table
          ?.get(SecondCell.Row)
          ?.get(SecondCell.Column)?.CellContent
        table.get(SecondCell.Row).get(SecondCell.Column).CellContent = temp
      }
    },

    //------Rows------//

    InitInsertRow() {
      const temp = new Map(this.CurrentTableTableData)
      const temp2 = new Map()
      const insertPos = this.TempRow.InsertPosition
      if (this.CheckInsertRow()) {
        this.CreateRow()

        this.GetInsertIndex("Rows")

        MainStore.InitPageCalculate()

        temp.forEach((cells, rowKey) => {
          if (rowKey <= insertPos) temp2.set(rowKey, cells)
        })

        this.TempRow.row.forEach((cells) => temp2.set(temp2.size + 1, cells))

        temp.forEach((cells) => temp2.set(temp2.size + 1, cells))

        MainStore.CurrentTable.TableData = temp2
      }
    },
    CreateRow() {
      const tempRow = new Map()
      this.TempRow.row = []

      for (let key = 1; key <= MainStore.FirstRowLength; key++) {
        tempRow.set(key, new Cell())
      }

      for (let i = 1; i <= this.Insert.Rows.Amount; i++) {
        this.TempRow.row.push(tempRow)
      }
    },
    CheckInsertRow() {
      const { Row, Amount } = this.Insert.Rows
      const { Height } = MainStore.TableSize

      if (Row <= 0 || Row > Height) return (this.Error = "Invalid row"), false
      if (Amount <= 0) return (this.Error = "Invalid count"), false

      return true
    },

    CheckRowsSwap() {
      const { First, Second } = this.Swap.Rows
      const { Height } = MainStore.TableSize

      if (First <= 0 || Second <= 0 || First > Height || Second > Height) {
        this.Error = "This row does not exist"
        return false
      }

      if (First === Second) {
        this.Error = "These rows cannot be swapped"
        return false
      }

      return true
    },

    InitRowsSwap() {
      let temp
      const { First, Second } = this.Swap.Rows
      const secondRow = MainStore.CurrentTable.TableData.get(Second)

      if (this.CheckRowsSwap()) {
        temp = MainStore.CurrentTable.TableData.get(First)

        MainStore.CurrentTable.TableData.set(First, secondRow)
        MainStore.CurrentTable.TableData.set(Second, temp)
      }
    },

    //------Colums------//

    CheckInsertColumns() {
      const { Column, Amount } = this.Insert.Columns

      if (Column <= 0 || Column > MainStore.TableSize.Width) {
        this.Error = "This column does not exist"
        return false
      }

      if (Amount <= 0) {
        this.Error = "The count is not valid"
        return false
      }

      return true
    },

    InitInsertColumns() {
      let temp
      const temp2 = new Map(),
        { Amount } = this.Insert.Columns

      if (this.CheckInsertColumns()) {
        this.GetInsertIndex("Columns")

        temp = MainStore.CurrentTable.TableData

        for (let key of range(1, MainStore.TableSize.Height)) {
          temp2.set(key, new Map())
        }

        temp.forEach((cells, rowKey) => {
          cells.forEach((cell, cellKey) => {
            if (cellKey <= this.ColumnTemp.InsertPosition) {
              temp2.get(rowKey).set(cellKey, cell)
              temp.get(rowKey).delete(cellKey)
            }
          })
        })

        for (let i of range(1, Amount)) {
          temp2.forEach((cells) => {
            cells.set(cells.size + 1, new Cell())
          })
        }

        temp.forEach((cells, rowKey) => {
          cells.forEach((cell, cellKey) => {
            const size = temp2.get(rowKey).size
            temp2.get(rowKey).set(size + 1, cell)
          })
        })

        MainStore.CurrentTable.TableData = temp2
      }
    },

    CheckSwapColumns() {
      const { First, Second } = this.Swap.Columns
      const { Width } = MainStore.TableSize

      if (First <= 0 || Second <= 0 || First > Width || Second > Width) {
        this.Error = "Column does not exist"
        return false
      }

      if (First === Second) {
        this.Error = "Columns cannot be swapped"
        return false
      }

      return true
    },

    InitSwapColumns() {
      const { First, Second } = this.Swap.Columns
      const temp = new Map()
      if (this.CheckSwapColumns()) {
        for (let key of Range(1, MainStore.TableSize.Height)) {
          temp.set(key, new Map())
        }

        MainStore.CurrentTable.TableData.forEach((row, rowKey) => {
          row.forEach((cell, cellKey) => {
            if (cellKey === First) {
              temp.get(rowKey).set(cellKey, cell)
            }
          })
        })

        MainStore.CurrentTable.TableData.forEach((row, rowKey) => {
          row.forEach((cell, cellKey) => {
            if (cellKey === Second) {
              MainStore.CurrentTable.TableData.get(rowKey).set(First, cell)
            }
          })
        })

        temp.forEach((row, rowKey) => {
          row.forEach((cell: TypeCell, cellKey: number) => {
            MainStore.CurrentTable.TableData.get(rowKey).set(Second, cell)
          })
        })
      }
    },
  },
})
InitStore()

export const TableEditStore = UseTableEditStore()

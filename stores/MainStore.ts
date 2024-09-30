export const UseMainStore = defineStore("MainStore", {
  state: (): StateMainStore => ({
    UserData: {
      Username: "",
      _id: "",
    },
  
    CurrentTable:undefined,
  
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
  
    TableEdit: {
      IsOpen: false,
      Error: "",
  
      Sections: {
        InsertRow: false,
        InsertColumn: false,
        SwapRows: false,
        SwapColumns: false,
        SwapCells: false,
        Navigation: false,
      },
  
      Insert: {
        Rows: {
          Row: 0,
          Position: "Above" ,
          Amount: 0,
        },
        Columns: {
          Column: 0,
          Position: "R" ,
          Amount: 0
        },
      },
  
      Swap: {
        Rows: {
          First: 0,
          Second:0,
        },
        Columns: {
          First: 0,
          Second: 0,
        }
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
        columns:[],
        InsertPosition: 0,
      }
    }
  ,
    
    NewTable: {
      IsOpen: false,
      Error: "",
      TableName: "",
      NumberOfRows: 0,
      NumberOfColumns: 0,
    },
  
    PageSettings: {
      CurrentPages:[],
      MaxPageLength: 21,
      MinPageLength: 1,
      CellWidth: 77,
      NumberOfPages: 0,
      WindowHeight: 0,
  
      CurrentPage: {
        Number: 0,
        Start: 0,
        End: 0,
      }
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
      }
    }
  }),
  getters: {
    CurrentPage: (state) => state.PageSettings.CurrentPage,
    CurrentPageStart: (state) => state.PageSettings.CurrentPage.Start,
    CurrentPageEnd: (state) => state.PageSettings.CurrentPage.End,
    FirstRowLength: (state) => state.CurrentTable?.TableData.get(1)?.size,
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
        this.PageSettings.CurrentPages[
          this.PageSettings.CurrentPage.Number - 1
        ]
      
    },
    CalculatePages() {
      this.PageSettings.CurrentPages= []
      const MaxPageLength=this.PageSettings.MaxPageLength - 1
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
      let tableWidth = this.TableSize.Width;
      let pageCount = 1;
    
      while (tableWidth >= this.PageSettings.MaxPageLength) {
        pageCount++;
        let remainingWidth = tableWidth - this.PageSettings.MaxPageLength;
        tableWidth = remainingWidth;
      }
    
      this.PageSettings.NumberOfPages = pageCount - 1;
    }
    ,
    //Seiten wechseln
PageNav(NavKey:string){

const NavKeys={
"GoBack":this.CurrentPage.Number - 2,
"GoForward":this.CurrentPage.Number,
"GoFirst":0,
"GoLast":this.CurrentPage.Number - 1,
}


  this.PageSettings.CurrentPage =
  this.PageSettings.CurrentPages[
    NavKeys[NavKey] || 0
  ]
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
    CallCellSwap() {
      this.SetAllSectonsFalse()
      this.TableEdit.Sections.SwapCells = true
    },
    CheckCellsSwap() {
      const { FirstCell, SecondCell } = this.TableEdit.SwapCells;
      const { Height, Width } = this.TableSize;
    
      if (
        FirstCell.Column < 1 || FirstCell.Row < 1 || 
        SecondCell.Column < 1 || SecondCell.Row < 1
      ) {
        this.TableEdit.Error = "One or both cells do not exist";
        return false;
      }
    
      if (
        FirstCell.Column > Width || FirstCell.Row > Height || 
        SecondCell.Column > Width || SecondCell.Row > Height
      ) {
        this.TableEdit.Error = "One or both cells are outside the table bounds";
        return false;
      }
    
      if (
        FirstCell.Column === SecondCell.Column && 
        FirstCell.Row === SecondCell.Row
      ) {
        this.TableEdit.Error = "The cells are identical";
        return false;
      }
    
      this.TableEdit.Error = "";
      return true;
    },
    

    ZellenTauschen() {
      if (this.CheckCellsSwap()) {
        this.InitZellenTauschen()
      }
    },
    initCellsSwap() {
      const { FirstCell, SecondCell } = this.TableEdit.SwapCells;
      const table = this.CurrentTable?.TableData;
      
      const temp = table?.get(FirstCell.Row)?.get(FirstCell.Column)?.CellContent;
      table.get(FirstCell.Row)?.get(FirstCell.Column)?.CellContent = table?.get(SecondCell.Row)?.get(SecondCell.Column)?.CellContent;
      table.get(SecondCell.Row).get(SecondCell.Column)?.CellContent = temp;
    }
    
    OpenAside() {
      this.TableBearbeiten.Sections.Aside = !this.TableBearbeiten.Sections.Aside
    },
    //Zeilen bearbeiten

    ZeilenEinfügenAufrufen() {
      this.SetAllSectonsFalse()
      this.TableBearbeiten.Sections.ZeileEinfügen = true
    },

    ZeilenEinfügen() {
      this.TableBearbeiten.Error = undefined

      if (this.CheckZeile()) {
        this.CreateZeile()

        this.GetIsertIndexZeile()
        this.InsertElementsZeile()
        this.InitSeitenBerechnen()
      }
    },
    GetIsertIndexZeile() {
      const { Zeile, Position } = this.TableBearbeiten.Einfügen.Zeilen
      switch (Position) {
        case "Über":
          this.TableBearbeiten.ZeileTemp.InsertPositon = Zeile - 1
          break
        case "Unter":
          this.TableBearbeiten.ZeileTemp.InsertPositon = Zeile
          break
      }
    },
    InsertElementsZeile() {
      const temp = new Map(this.CurrentTableTableData)
      const temp2 = new Map()

      temp.forEach((zellen, zeilenKey) => {
        if (zeilenKey <= this.TableBearbeiten.ZeileTemp.InsertPositon) {
          temp2.set(zeilenKey, zellen)
          temp.delete(zeilenKey)
        }
      })

      this.TableBearbeiten.ZeileTemp.zeile.forEach((zellen) => {
        temp2.set(temp2.size + 1, zellen)
      })

      temp.forEach((zellen) => {
        temp2.set(temp2.size + 1, zellen)
      })

      this.CurrentTable.TableData = temp2
    },
    CreateZeile() {
      const ZeileTemp = new Map()
      this.TableBearbeiten.ZeileTemp.zeile = []
      for (let key = 1; key <= this.FirstZeileLength; key++) {
        ZeileTemp.set(key, new Zelle())
      }

      for (
        let index = 1;
        index <= this.TableBearbeiten.Einfügen.Zeilen.Anzahl;
        index++
      ) {
        this.TableBearbeiten.ZeileTemp.zeile.push(ZeileTemp)
      }
    },
    CheckZeile() {
      const { Zeile, Anzahl } = this.TableBearbeiten.Einfügen.Zeilen
      const { höhe } = this.TabelenGröße

      if (Zeile <= 0 || Zeile > höhe) {
        this.TableBearbeiten.Error = "Diese Zeile ist nicht vorhanden"
        return false
      }

      if (Anzahl <= 0) {
        this.TableBearbeiten.Error = "Die Anzahl ist nicht gültig"
        return false
      }

      return true
    },
    GetOptionZeile(e) {
      const Position = e.target.value

      this.TableBearbeiten.Einfügen.Zeilen.Position = Position
    },

    ZeilenTauschenAufrufen() {
      this.SetAllSectonsFalse()
      this.TableBearbeiten.Sections.ZeileTauschen = true
    },

    CheckZeilenTauschen() {
      const { Erste, Zweite } = this.TableBearbeiten.Tauschen.Zeilen
      const { höhe } = this.TabelenGröße

      if (Erste <= 0 || Zweite <= 0 || Erste > höhe || Zweite > höhe) {
        this.TableBearbeiten.Error = "Diese Zeile ist nicht vorhanden"
        return false
      }

      if (Erste === Zweite) {
        this.TableBearbeiten.Error =
          "Diese Zeilen können nicht getauscht werden"
        return false
      }

      return true
    },
    ZeilenTauschen() {
      if (this.CheckZeilenTauschen()) {
        this.InitZeilenTauschen()
      }
    },
    InitZeilenTauschen() {
      let temp
      const { Erste, Zweite } = this.TableBearbeiten.Tauschen.Zeilen
      const ZweiteZeile = this.CurrentTableTableData.get(Zweite)
      temp = this.CurrentTableTableData.get(Erste)

      this.CurrentTable.TableData.set(Erste, ZweiteZeile)
      this.CurrentTable.TableData.set(Zweite, temp)
    },
    // Spalten bearbeiten

    GetOptionSpalte(e) {
      const Pos = e.target.value

      this.TableBearbeiten.Einfügen.Spalten.Position = Pos
    },
    SpaltenEinfügenAufrufen() {
      this.SetAllSectonsFalse()
      this.TableBearbeiten.Sections.SpalteEinfügen = true
    },

    SpaltenEinfügen() {
      if (this.CheckSpalte()) {
        this.GetInsertIndexSpalte()
        this.InsertElementsSpalte()
      }
    },
    CheckSpalte() {
      const { Spalte, Anzahl } = this.TableBearbeiten.Einfügen.Spalten

      if (Spalte <= 0 || Spalte > this.TabelenGröße.breite) {
        this.TableBearbeiten.Error = "Diese Spalte ist nicht vorhanden"
        return false
      }

      if (Anzahl <= 0) {
        this.TableBearbeiten.Error = "Die Anzahl ist nicht gültig"
        return false
      }

      return true
    },
    InsertElementsSpalte() {
      let temp
      const temp2 = new Map()
      const { Anzahl } = this.TableBearbeiten.Einfügen.Spalten
      temp = this.CurrentTable.TableData

      for (let key of this.range(1, this.TabelenGröße.höhe)) {
        temp2.set(key, new Map())
      }

      temp.forEach((zellen, zeilenKey) => {
        zellen.forEach((zelle, zellenKey) => {
          if (zellenKey <= this.TableBearbeiten.SpalteTemp.InsertPosition) {
            temp2.get(zeilenKey).set(zellenKey, zelle)
            temp.get(zeilenKey).delete(zellenKey)
          }
        })
      })

      for (let iterator of this.range(1, Anzahl)) {
        temp2.forEach((zellen) => {
          zellen.set(zellen.size + 1, new Zelle())
        })
      }

      temp.forEach((zellen, zeilenKey) => {
        zellen.forEach((zelle, zellenKey) => {
          const size = temp2.get(zeilenKey).size
          temp2.get(zeilenKey).set(size + 1, zelle)
        })
      })

      this.CurrentTable.TableData = temp2
    },
    GetInsertIndexSpalte() {
      const { Position, Spalte } = this.TableBearbeiten.Einfügen.Spalten

      switch (Position) {
        case "L":
          this.TableBearbeiten.SpalteTemp.InsertPositon = Spalte - 1
          break
        case "R":
          this.TableBearbeiten.SpalteTemp.InsertPositon = Spalte
          break
      }
    },
    SpaltenTauschenAufrufen() {
      this.SetAllSectonsFalse()
      this.TableBearbeiten.Sections.SpalteTauschen = true
    },
    CheckSpalteTauschen() {
      const { Erste, Zweite } = this.TableBearbeiten.Tauschen.Spalten
      const { breite } = this.TabelenGröße

      if (Erste <= 0 || Zweite <= 0 || Erste > breite || Zweite > breite) {
        this.TableBearbeiten.Error = "Diese Spalte ist nicht vorhanden"
        return false
      }

      if (Erste === Zweite) {
        this.TableBearbeiten.Error =
          "Diese Spalten können nicht getauscht werden"
        return false
      }

      return true
    },
    SpaltenTauschen() {
      if (this.CheckSpalteTauschen()) {
        this.InitSpaltenTauschen()
      }
    },
    InitSpaltenTauschen() {
      const { Erste, Zweite } = this.TableBearbeiten.Tauschen.Spalten
      const temp = new Map()

      for (let key of this.range(1, this.TabelenGröße.höhe)) {
        temp.set(key, new Map())
      }

      this.CurrentTableTableData.forEach((zeile, zeilenKey) => {
        zeile.forEach((zelle, zellenKey) => {
          if (zellenKey === Erste) {
            temp.get(zeilenKey).set(zellenKey, zelle)
          }
        })
      })

      this.CurrentTableTableData.forEach((zeile, zeilenKey) => {
        zeile.forEach((zelle, zellenKey) => {
          if (zellenKey === Zweite) {
            this.CurrentTable.TableData.get(zeilenKey).set(Erste, zelle)
          }
        })
      })

      temp.forEach((zeile, zeilenKey) => {
        zeile.forEach((zelle, zellenKey) => {
          this.CurrentTable.TableData.get(zeilenKey).set(Zweite, zelle)
        })
      })
    },
    // Download File

    async mDownlodFile(TableIndex: number) {
      const Data = this.FormatData(this.CurrentTables[TableIndex].TableData)

      this.DownloadFile.Href = `data:text/csv;charset=utf-8,${Data}`
    },
    FormatData(data: TableDataMap) {
      const Formatdata = []

      data.forEach((Zeile) => {
        const zeilen = []

        Formatdata.push(zeilen)

        Zeile.forEach((Zelle) => {
          zeilen.push(Zelle.zellenInhalt)
        })
      })
      return papa.unparse(Formatdata)
    },
    //Tabelle Löschen

    SpalteLöschen(Index: number) {
      let temp = this.CurrentTable.TableData
      let temp2 = new Map()
      let newKey = 0

      for (let key = 1; key <= temp.size; key++) {
        temp.get(key).delete(Index)
      }

      temp.forEach((zeile, zeilenKey) => {
        temp2.set(zeilenKey, new Map())

        zeile.forEach(({ ZellenInhalt, Activ }, zellenKey) => {
          newKey++
          temp2.get(zeilenKey).set(newKey, new Zelle(ZellenInhalt, Activ))
        })

        newKey = 0
      })

      this.CurrentTable.TableData = temp2
    },
    ZeileLöschen(key: number) {
      let temp = this.CurrentTable.TableData
      temp.delete(key)

      this.CurrentTable.TableData = new Map()

      let newKey = 0
      temp.forEach((zeile) => {
        newKey++
        this.CurrentTable.TableData.set(newKey, new Map(zeile))
      })
    },
    // Uploade File

    CreateTable(FileName: "",, FileData: CsvData) {
      this.CurrenTablesPuhs(
        new Table({
          TableName: FileName,
          TableData: TableDataToMap(CsvDataToTableDataArray(FileData)),
        })
      )
      this.GetSelectTabel(this.CurrentTablesSize)
    },

    async GetFileData(e: Event) {
      const [File] = await e?.target?.files

      const FileName = await File.name.slice(0, -4)

      const content = await File.text()
      const { data } = papa.parse(content)

      this.CreateTable(FileName, data)
    },

    // Zellen bearbeiten

    InitZelleBerarbeiten(Zeile, Spalte, Zelleninhalt) {
      this.SaveLastZelle()

      this.SetCurrentZelle(Zeile, Spalte, Zelleninhalt)

      this.SetFocusedZelle()
    },

    SaveLastZelle() {
      const { Zeile, Spalte, ZellenInhalt, Activ } =
        this.CurrentTable.CurrentZelle
      this.CurrentTable.LastZelle = { Zeile, Spalte, ZellenInhalt, Activ }
    },
    SetCurrentZelle(Zeile, Spalte, Zelleninhalt) {
      this.CurrentTable.CurrentZelle = {
        Zeile,
        Spalte,
        ZellenInhalt: Zelleninhalt,
      }
    },
    SetFocusedZelle() {
      const { Zeile: currentZeile, Spalte: currentSpalte } =
        this.CurrentTable.CurrentZelle
      const { Zeile: lastZeile, Spalte: lastSpalte } =
        this.CurrentTable.LastZelle

      this.CurrentTable.TableData.get(currentZeile).get(currentSpalte).Activ =
        true
      this.CurrentTable.TableData.get(lastZeile).get(lastSpalte).Activ = false
    },
    SetZellenValue() {
      const { Zeile, Spalte, ZellenInhalt } = this.CurrentTable.CurrentZelle
      this.CurrentTable.TableData.get(Zeile).get(Spalte).ZellenInhalt =
        ZellenInhalt
    },
    // selcet get set values
    range(start, end, step = 1) {
      const result = []
      if (step > 0) {
        for (let i = start; i <= end; i += step) {
          result.push(i)
        }
      } else if (step < 0) {
        for (let i = start; i >= end; i += step) {
          result.push(i)
        }
      }
      return result
    },

    SetAllSectonsFalse() {
      this.TableBearbeiten.Sections.ZeileEinfügen = false
      this.TableBearbeiten.Sections.SpalteTauschen = false
      this.TableBearbeiten.Sections.SpalteEinfügen = false
      this.TableBearbeiten.Sections.ZeileTauschen = false
      this.TableBearbeiten.Sections.ZellenTauschen = false
      this.TableBearbeiten.Sections.Aside = false
      this.TableBearbeiten.Error = undefined
    },

    SetCurrentTabelName() {
      this.CurrentTables[this.CurrentTabelleID].TableName =
        this.CurrentTable.TableName
    },
    SetTabelSize() {
      this.TabelenGröße.höhe = this.CurrentTable.TableData.size
      this.TabelenGröße.breite = this.CurrentTable.TableData?.get(1)?.size || 0
    },
    async GetSelectTabel(TableIndex: number) {
      this.CurrentTabelleID = TableIndex

      this.CurrentTable = this.CurrentTables?.get(TableIndex)
    },
    async SetCurrentURL(Api"",: "",) {
      this.ApiURLs.CurrentUrl = Api"",

      this.ApiURLs.ApiUrlUsersLogin = Api"", + this.ApiURLs.ApiUrlUsersLogin

      this.ApiURLs.ApiUrlUsersSingleUp =
        Api"", + this.ApiURLs.ApiUrlUsersSingleUp

      this.ApiURLs.requestOptions.baseURL = Api"",
    },
    async SetApiUrlUserTables() {
      const { _id } = this.UserData
      const UserUrl = this.ApiURLs.CurrentUrl + "user/"
      this.ApiURLs.ApiUrlUserTablen = `${UserUrl}${_id}/tables`
      this.ApiURLs.ApiUrlDeletTable = `${UserUrl}${_id}/tables/`
    },

    async SetUserdata(data: { Username: "",; _id: "", }) {
      this.UserData.Username = data.Username
      this.UserData._id = data._id
    },
    async Abmelden() {
      localStorage.clear()
    },

    async PrepareTableToStore(SendTables: SendTables) {
      SendTables.forEach(
        ({
          CurrentZelle,
          LastZelle,
          TableName,
          TableData,
        }: table<TableDataArray>) => {
          this.CurrenTablesPuhs(
            new Table({
              CurrentZelle,
              LastZelle,
              TableName,
              TableData: TableDataToMap(TableData),
            })
          )
        }
      )
    },
    async CurrenTablesPuhs(Table: table<TableDataMap>) {
      this.CurrentTables.set(this.CurrentTablesSize + 1, Table)
    },
    PrepareTableToSend(CurrentTables: CurrentTables): SendTables {
      return CurrentTables.map((CurrentTable) => {
        const table = new Table({
          ...CurrentTable,
        })
        table.TableDataToArray()
        return table
      })
    },

    // Requests

    async GetTables() {
      try {
        const { data } = await axios.get(
          this.ApiURLs.ApiUrlUserTablen,
          this.ApiURLs.requestOptions
        )

        await this.PrepareTableToStore(data)

        await this.GetSelectTabel(1)
      } catch (er) {
        console.log(er)
      }
    },
    async SaveTables() {
      try {
        const sendTables = this.PrepareTableToSend(this.CurrentTables)

        const res = await axios.patch(
          this.ApiURLs.ApiUrlUserTablen,
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
    async DeleteTable(tableID: "",) {
      try {
        const res = await axios.delete(
          `${this.ApiURLs.ApiUrlDeletTable}${tableID}`,
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
initStore()
export const MainStore = UseMainStore()

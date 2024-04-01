export const UseMainStore = defineStore("csv", {
  state: (): state => ({
    UserData: {
      Username: "",
      _id: "",
    },
    CurrentTable: undefined,

    CurrentTables: [],
    CurrentTabelleID: undefined,

    TabelenGröße: {
      höhe: 0,
      breite: 0,
    },

    ConfirmationWindow: {
      ConfirmationWindowOpen: false,
      Text: "",
    },

    // Uploade Download CSV File

    DownloadFileHref: "",

    //Tabelle bearbeiten
    TableBearbeitenOpen: false,
    TableBearbeiten: {
      Error: undefined,

      Sections: {
        ZeileEinfügen: true,
        SpalteEinfügen: false,
        ZeileTauschen: false,
        SpalteTauschen: false,
        ZellenTauschen: false,
        Aside: false,
      },

      Einfügen: {
        Zeilen: {
          Zeile: undefined,
          Position: "Über",
          Anzahl: undefined,
        },
        Spalten: { Spalte: undefined, Position: "L", Anzahl: undefined },
      },

      Tauschen: {
        Zeilen: {
          Erste: undefined,
          Zweite: undefined,
        },
        Spalten: {
          Erste: undefined,
          Zweite: undefined,
        },
      },
      ZellenTauschen: {
        ErsteZelle: {
          Zeile: undefined,
          Spalte: undefined,
        },
        ZweiteZelle: {
          Zeile: undefined,
          Spalte: undefined,
        },
      },
      ZeileTemp: {
        zeile: [],
        InsertPositon: undefined,
      },
      SpalteTemp: {
        spalten: [],
        InsertPositon: undefined,
      },
    },

    // Neue Tabelle erstellen
    NewTableIsOpen: false,
    NewTable: {
      Error: undefined,
      TableName: "",
      AnzahlZeilen: undefined,
      AnzahlSpalten: undefined,
    },

    // Registrieren
    Registrieren: {
      Username: undefined,
      Email: undefined,
      Passwort: undefined,
      PasswortWiederholen: undefined,
    },
    RegistrierenCheck: undefined,
    // Login

    Anmelden: {
      Email: "Lorenzo12696@gmail.com",
      Passwort: "123",
    },
    AbmeldenStatus: undefined,
    AnmeldenCheck: undefined,

    AngemedetBleiben: false,
    // Seiten

    SeitenVerwenden: {
      CurrentSeiten: [],
      SeitenLängeMax: 0,
      SeitenLängeMin: 0,
      ZellenWidth: 77,
      SeitenAnzahl: 0,
      WindowHeight: useNuxtApp().vueApp._container?.clientWidth,

      CurrentSeite: {
        Zahl: 1,
        Start: 1,
        Ende: undefined,
      },
    },

    ApiURLs: {
      CurrentUrl: "",
      BaseUrl: "https://csvdb2.cyclic.app/",
      BaseUrlLocl: "http://localhost:8080/",

      ApiUrlUsersRegistrieren: "auth/registrieren",
      ApiUrlUsersAnmelden: "auth/login",
      ApiUrlUserTablen: undefined,
      ApiUrlDeletTable: undefined,
      requestOptions: {
        withCredentials: true,
        baseURL: "",
      },
    },
  }),
  getters: {
    name: (state) => state,
    FirstZeileLength: (state) => state.CurrentTable.TableData.get(1).size,
    CurrentSeiteStart: (state) => state.SeitenVerwenden.CurrentSeite.Start,
    CurrentSeiteEnde: (state) => state.SeitenVerwenden.CurrentSeite.Ende,
    FirstZelleActive: (state) =>
      state.CurrentTable.TableData.get(1).get(1).Activ,
    FirstZelleZellenInhalt: (state) =>
      state.CurrentTable.TableData.get(1).get(1).ZellenInhalt,
    FirstZeile: (state) => state.CurrentTable.TableData.get(1),
    CurrentTableLength: (state) => state.CurrentTable.TableData.size,
    CurrentTableTableData: (state) => state.CurrentTable.TableData,
    CurrentTablesLength: (state) => state,
  },
  actions: {
    InitSeitenBerechnen() {
      this.SetTabelSize()
      this.BrechneMax()
      this.SeitenBerechnen()
    },

    SetCurrentSeiteFirst() {
      this.SeitenVerwenden.CurrentSeite = this.SeitenVerwenden.CurrentSeiten[0]
    },

    BrechneMax() {
      const { WindowHeight, ZellenWidth } = this.SeitenVerwenden
      this.SeitenVerwenden.SeitenLängeMax = Math.round(
        (WindowHeight - 200) / ZellenWidth
      )
    },
    ResizeWindow() {
      this.SeitenVerwenden.WindowHeight =
        useNuxtApp().vueApp._container?.clientWidth
      this.BrechneMax()
      this.SeitenBerechnen()

      const currentPageNumber = this.SeitenVerwenden.CurrentSeite.Zahl - 1
      this.SeitenVerwenden.CurrentSeite =
        this.SeitenVerwenden.CurrentSeiten[currentPageNumber]
    },
    SeitenBerechnen() {
      this.SeitenVerwenden.CurrentSeiten = []
      const seiteErste = new Seite(this.SeitenVerwenden.SeitenLängeMax - 1)
      this.SeitenVerwenden.CurrentSeiten.push(seiteErste)
      this.SeitenAnzahl()

      for (let i = 0; i < this.SeitenVerwenden.SeitenAnzahl; i++) {
        const currentSeite = this.SeitenVerwenden.CurrentSeiten[i]
        const seite = new Seite(
          currentSeite.Zahl + 1,
          currentSeite.Ende + 1,
          currentSeite.Ende + this.SeitenVerwenden.SeitenLängeMax - 1
        )

        this.SeitenVerwenden.CurrentSeiten.push(seite)
      }
    },
    SeitenAnzahl() {
      let tabellenBreite = this.TabelenGröße.breite
      let seitenAnzahl = 1

      while (tabellenBreite >= this.SeitenVerwenden.SeitenLängeMax) {
        seitenAnzahl++
        let restlicheBreite =
          tabellenBreite - this.SeitenVerwenden.SeitenLängeMax
        tabellenBreite = restlicheBreite
      }

      this.SeitenVerwenden.SeitenAnzahl = seitenAnzahl - 1
    },
    //Seiten wechseln

    SeiteZurück() {
      const currentPageNumber = this.SeitenVerwenden.CurrentSeite.Zahl - 2
      this.SeitenVerwenden.CurrentSeite =
        this.SeitenVerwenden.CurrentSeiten[currentPageNumber]
    },
    SeiteVor() {
      const currentPageNumber = this.SeitenVerwenden.CurrentSeite.Zahl
      this.SeitenVerwenden.CurrentSeite =
        this.SeitenVerwenden.CurrentSeiten[currentPageNumber]
    },
    SeiteFirst() {
      this.SeitenVerwenden.CurrentSeite = this.SeitenVerwenden.CurrentSeiten[0]
    },
    SeiteLast() {
      const lastPageIndex = this.SeitenVerwenden.CurrentSeiten.length - 1
      this.SeitenVerwenden.CurrentSeite =
        this.SeitenVerwenden.CurrentSeiten[lastPageIndex]
    },
    //Create new Table

    CreateNewTable() {
      const { AnzahlSpalten, AnzahlZeilen, TableName } = this.NewTable

      if (this.CheckNewTable()) {
        const NewTable = new Table(TableName)
        NewTable.GenerateTableData(AnzahlZeilen, AnzahlSpalten)
        this.CurrentTables.push(NewTable)
        this.GetSelectTabel(this.CurrentTables.length - 1)
        this.NewTableIsOpen = false
      }
    },
    CheckNewTable() {
      const { AnzahlSpalten, AnzahlZeilen, TableName } = this.NewTable
      let CheckOk = false

      const isTableNameTaken = this.CurrentTables.some(
        (Table) => Table.TableName === TableName
      )

      const isInvalidColumnCount = AnzahlSpalten <= 0
      const isInvalidRowCount = AnzahlZeilen <= 0

      if (isTableNameTaken) {
        this.NewTable.Error = "Dieser Name ist bereits vergeben"
      } else if (isInvalidColumnCount) {
        this.NewTable.Error = "Die Anzahl der Spalten ist zu klein"
      } else if (isInvalidRowCount) {
        this.NewTable.Error = "Die Anzahl der Zeilen ist zu klein"
      } else {
        CheckOk = true
      }

      return CheckOk
    },
    // Tabelle bearbeiten

    // Zellen tauschen
    ZellenTauschenAufrufen() {
      this.SetAllSectonsFalse()
      this.TableBearbeiten.Sections.ZellenTauschen = true
    },
    CheckZellenTauschen() {
      const { ErsteZelle, ZweiteZelle } = this.TableBearbeiten.ZellenTauschen
      const { höhe, breite } = this.TabelenGröße
      let error = ""

      const sindZellenVorhanden =
        ErsteZelle.Spalte >= 1 &&
        ErsteZelle.Zeile >= 1 &&
        ZweiteZelle.Spalte >= 1 &&
        ZweiteZelle.Zeile >= 1

      const sindZellenInTabelle =
        ErsteZelle.Spalte <= höhe &&
        ErsteZelle.Zeile <= höhe &&
        ZweiteZelle.Spalte <= breite &&
        ZweiteZelle.Zeile <= breite

      const sindZellenVerschieden =
        ErsteZelle.Spalte !== ZweiteZelle.Spalte ||
        ErsteZelle.Zeile !== ZweiteZelle.Zeile

      if (!sindZellenVorhanden) {
        error = "Diese Zelle ist nicht vorhanden"
      } else if (!sindZellenInTabelle) {
        error = "Diese Zelle befindet sich nicht in der Tabelle"
      } else if (!sindZellenVerschieden) {
        error = "Diese Zellen sind identisch"
      }

      this.TableBearbeiten.Error = error

      return sindZellenVorhanden && sindZellenInTabelle && sindZellenVerschieden
    },

    ZellenTauschen() {
      if (this.CheckZellenTauschen()) {
        this.InitZellenTauschen()
      }
    },
    InitZellenTauschen() {
      const { ErsteZelle, ZweiteZelle } = this.TableBearbeiten.ZellenTauschen
      const ZellenInhaltErste = this.CurrentTableTableData.get(
        ErsteZelle.Zeile
      ).get(ErsteZelle.Spalte).ZellenInhalt

      const ZellenInhaltZweite = this.CurrentTableTableData.get(
        ZweiteZelle.Zeile
      ).get(ZweiteZelle.Spalte).ZellenInhalt

      this.CurrentTable.TableData.get(ErsteZelle.Zeile).get(
        ErsteZelle.Spalte
      ).ZellenInhalt = ZellenInhaltZweite

      this.CurrentTable.TableData.get(ZweiteZelle.Zeile).get(
        ZweiteZelle.Spalte
      ).ZellenInhalt = ZellenInhaltErste
    },
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
    ZeileLöschen(key) {
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

    CreateTable(FileName, FileData) {
      const NewTable = new Table(FileName)
      NewTable.CreateTableData(FileData)

      this.CurrentTables.push(NewTable)
      this.GetSelectTabel(this.CurrentTables.length - 1)
    },

    async GetFileData(e) {
      const [File] = await e.target.files

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
      this.TabelenGröße.breite = this.CurrentTable.TableData.get(1).size
    },
    GetSelectTabel(TableIndex) {
      this.CurrentTabelleID = TableIndex

      this.CurrentTable = this.CurrentTables[TableIndex]
    },
    SetCurrentURL(ApiString: string) {
      this.ApiURLs.CurrentUrl = ApiString

      this.ApiURLs.ApiUrlUsersAnmelden =
        ApiString + this.ApiURLs.ApiUrlUsersAnmelden

      this.ApiURLs.ApiUrlUsersRegistrieren =
        ApiString + this.ApiURLs.ApiUrlUsersRegistrieren

      this.ApiURLs.requestOptions.baseURL = ApiString
    },
    async SetApiUrlUserTables() {
      const { _id: userId } = this.UserData
      const UserUrl = this.ApiURLs.CurrentUrl + "user/"
      this.ApiURLs.ApiUrlUserTablen = `${UserUrl}${userId}/tables`
      this.ApiURLs.ApiUrlDeletTable = `${UserUrl}${userId}/tables/`
    },
    async Abmelden() {
      localStorage.clear()
    },
    async CheckLogin() {
      const sessionStorageData = sessionStorage.getItem("Csv")
      const localStorageData = localStorage.getItem("Csv")

      if (sessionStorageData) {
        const AnmeldeData = await JSON.parse(sessionStorageData)
        this.Anmelden = AnmeldeData
        await this.mAnmelden()
      } else if (localStorageData) {
        const AnmeldeData = await JSON.parse(localStorageData)
        this.Anmelden = AnmeldeData
        this.AngemedetBleiben = true
        await this.mAnmelden()
      }
    },
    //Anmelden
    async mAnmelden() {
      try {
        const res = await axios.post(
          this.ApiURLs.ApiUrlUsersAnmelden,
          this.Anmelden,
          this.ApiURLs.requestOptions
        )

        if (res.status === 202) {
          this.AnmeldenCheck = res.data
          this.AbmeldenStatus = 202
        } else if (res.status === 201) {
          this.UserData = {
            Username: res.data.Username,
            _id: res.data._id,
          }

          const dataAnmelden = JSON.stringify(this.Anmelden)

          if (this.AngemedetBleiben) {
            localStorage.setItem("Csv", dataAnmelden)
          } else {
            sessionStorage.setItem("Csv", dataAnmelden)
          }

          this.AbmeldenStatus = 201
        }
      } catch (error) {
        console.error(error.message)
      }
    },
    // Registrieren

    async mRegistrieren() {
      try {
        if (
          this.Registrieren.Passwort !== this.Registrieren.PasswortWiederholen
        ) {
          this.RegistrierenCheck = "Passwörter sind nicht identisch"
        } else {
          const { PasswortWiederholen, ...UserData } = this.Registrieren

          const res = await axios.post(
            this.ApiURLs.ApiUrlUsersRegistrieren,
            UserData
          )

          if (res.status === 202) {
            this.RegistrierenCheck = res.data
          } else if (res.status === 201) {
            route.push({ path: "/Login" })
          }
        }
      } catch (error) {
        console.error(error.message)
      }
    },
    // Requests

    async GetTables() {
      try {
        const res = await axios.get(
          this.ApiURLs.ApiUrlUserTablen,
          this.ApiURLs.requestOptions
        )

        const sendTables = res.data

        this.CurrentTables = Table.PrepareTableToStore(sendTables)
        this.GetSelectTabel(0)
      } catch (error) {
        console.error(error.message)
      }
    },
    async SaveTables() {
      try {
        const sendTables = Table.PrepareTableToSend(this.CurrentTables)

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
    async DeleteTable(tableID: string) {
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

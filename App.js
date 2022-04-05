import { SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import NotaEditor from './src/componentes/NotaEditor'
import { useState, useEffect } from 'react'
import { FlatList } from 'react-native'
import { Nota } from './src/componentes/Nota'
import { createTable } from './src/servicos/Notas'

export default function App() {
  useEffect(() => {
    createTable()
  }, [])

  const [notas, setNotas] = useState([])
  async function mostraNotas() {
    setNotas(todasNotas)
  }
  return (
    <SafeAreaView style={estilos.container}>
      <FlatList
        data={notas}
        renderItem={nota => <Nota {...nota} />}
        keyExtractor={nota => nota[0]}
      />
      <NotaEditor mostraNotas={mostraNotas} />
      <StatusBar />
    </SafeAreaView>
  )
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start'
  }
})

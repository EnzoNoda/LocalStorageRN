import { SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import NotaEditor from './src/componentes/NotaEditor'
import { useState, useEffect } from 'react'
import { FlatList } from 'react-native'
import { Nota } from './src/componentes/Nota'
import { buscaNotas, createTable } from './src/servicos/Notas'

export default function App() {
  useEffect(() => {
    createTable()
    mostraNotas()
  }, [])

  const [notaSelecionada, setNotaSelecionada] = useState({})
  const [notas, setNotas] = useState([])

  async function mostraNotas() {
    const todasNotas = await buscaNotas()
    setNotas(todasNotas)
  }
  return (
    <SafeAreaView style={estilos.container}>
      <FlatList
        data={notas}
        renderItem={nota => (
          <Nota {...nota} setNotaSelecionada={setNotaSelecionada} />
        )}
        keyExtractor={nota => nota.id}
      />
      <NotaEditor
        mostraNotas={mostraNotas}
        notaSelecionada={notaSelecionada}
        setNotaSelecionada={setNotaSelecionada}
      />
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

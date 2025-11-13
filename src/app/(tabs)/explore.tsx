import { Amount } from '@/types/amount';
import { Label } from '@react-navigation/elements';
import { useState } from 'react';
import { Button, FlatList, ScrollView, StyleSheet, Text, TextInput } from 'react-native';

export default function TabTwoScreen() {
  const [amount, setAmount] = useState<Amount[]>([]);
  const [newValor, setNewValor] = useState<number | null>(0);
  const [idAmount, setIdAmount] = useState<number | null>(null);
  const [updatedValue, setUpdateValue] = useState<number>(0);

  // TODO: Moverlos a services
  const addAmount = (newValue: number | null) => {
    if (newValue === 0 || !newValue) return;

    setAmount([...amount, { id: amount.length + 1, value: newValue }]);
  }

  const removeAmount = (id: number | null) => {
    if (!id) return;

    const newAmounts = amount.filter((e) => e.id !== id);
    setAmount(newAmounts);
  }

  const updateAmount = (id: number | null, newValue: number) => {
    if (!id || !newValue ) return;

    const amountToUpdate = amount.find((e) => e.id === id);

    if (amountToUpdate === undefined) return;

    const newAmounts = amount.filter((e) => e.id !== id);
    amountToUpdate.value = newValue;
    newAmounts.push(amountToUpdate);

    setAmount(newAmounts);
  }

  const totalAmount = () => {
    let total = 0;

    for (let index = 0; index < amount.length; index++) {
      total += amount[index].value;
    }
    
    return total;
  }

  return (
    <ScrollView style={styles.viewContainer}>
      <Label style={styles.title}>Gestion de gastos</Label>
      <FlatList data={amount.toSorted((a, b) => a.id - b.id)} renderItem={({ item }) => {
        return (
          <Text>{ item.value } <Button title='Remove' onPress={() => removeAmount(item.id)}/></Text>
        )
      }}>
      </FlatList>

      <TextInput keyboardType='numeric' placeholder='Ingresar monto' onChange={(e) => setNewValor(Number(e.nativeEvent.text))}/>
      <Button title='Agregar' onPress={() => addAmount(newValor)} />


      <TextInput keyboardType='numeric' placeholder='Id a actualizar' onChange={(e) => setIdAmount(Number(e.nativeEvent.text))}/>
      <TextInput keyboardType='numeric' placeholder='Valor a actualizar' onChange={(e) => setUpdateValue(Number(e.nativeEvent.text))}/>

      <Button title='Actualizar' onPress={() => updateAmount(idAmount, updatedValue)}/>

        <Text>{totalAmount()}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    width: '100%',
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    marginTop: 500,
    flexDirection: 'row',
    gap: 8,
  },
  title: {
    marginTop: '10%',
  }
});

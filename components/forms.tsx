import { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";

export default function Forms() {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [contato, setContato] = useState("");
  const [assunto, setAssunto] = useState("");

  const onSubmit = () => {
    const data = { nome, sobrenome, email, contato, assunto };
    console.log(data);
    Alert.alert("Formulário", "Dados enviados com sucesso!");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Sobrenome"
        value={sobrenome}
        onChangeText={setSobrenome}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contato"
        value={contato}
        onChangeText={setContato}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Assunto"
        value={assunto}
        onChangeText={setAssunto}
        keyboardType="dataRef.key();"
      />
      <Button title="Enviar" onPress={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    color: "white",
    fontSize: 16,
  },
});

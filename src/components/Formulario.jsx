import React, {useState, useEffect} from 'react';
import {
  Modal,
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';

import DatePicker from 'react-native-date-picker';

const Formulario = ({
  modalVisible,
  cerrarModal,
  pacientes,
  setPacientes,
  paciente: pacienteObj,
  setPaciente: setPacienteApp,
}) => {
  // States
  const [paciente, setPaciente] = useState('');
  const [id, setId] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [sintomas, setSintomas] = useState('');

  useEffect(() => {
    if (Object.keys(pacienteObj).length > 0) {
      setPaciente(pacienteObj.paciente);
      setId(pacienteObj.id);
      setPropietario(pacienteObj.propietario);
      setEmail(pacienteObj.email);
      setTelefono(pacienteObj.telefono);
      setFecha(pacienteObj.fecha);
      setSintomas(pacienteObj.sintomas);
    }
  }, [pacienteObj]);

  // Funciones
  const handleCita = () => {
    // Validar
    if ([paciente, propietario, email, fecha, sintomas].includes('')) {
      Alert.alert(
        'Error', // Titulo de la alerta
        'Todos los campos son obligatorios', // Descripcion de la alerta
        //[{text: 'Cancelar', style: 'cancel'}, {text: 'Ok'}], // Botones, en un arreglo
      );
      return;
    }

    // Revisar si es un nuevo registro o edición
    const nuevoPaciente = {
      paciente,
      propietario,
      email,
      telefono,
      fecha,
      sintomas,
    };

    if (id) {
      // Editando
      nuevoPaciente.id = id;

      const pacientesActualizados = pacientes.map(pacienteState =>
        pacienteState.id === nuevoPaciente.id ? nuevoPaciente : pacienteState,
      );

      setPacientes(pacientesActualizados);
    } else {
      // Nuevo registro
      nuevoPaciente.id = Date.now();
      setPacientes([...pacientes, nuevoPaciente]);
      setPacienteApp({});
    }

    cerrarModal();
    setId('');
    setPaciente('');
    setPropietario('');
    setEmail('');
    setTelefono('');
    setFecha(new Date());
    setSintomas('');
  };

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <SafeAreaView style={styles.contenido}>
        <ScrollView>
          <Text style={styles.titulo}>
            {pacienteObj.id ? 'Editar' : 'Nueva'} {''}
            <Text style={styles.tituloBold}>Cita</Text>
          </Text>

          {/* Cerrar Modal */}
          <Pressable
            style={styles.btnCancelar}
            onLongPress={() => {
              cerrarModal();
              setPacienteApp({});
              setId('');
              setPaciente('');
              setPropietario('');
              setEmail('');
              setTelefono('');
              setFecha(new Date());
              setSintomas('');
            }}>
            <Text style={styles.btnCancelarTexto}>X Cancelar</Text>
          </Pressable>

          {/* Nombre Paciente */}
          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Paciente</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre Paciente"
              placeholderTextColor={'#666'}
              value={paciente}
              onChangeText={setPaciente}
            />
          </View>

          {/* Nombre Propietario */}
          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre Propietario"
              placeholderTextColor={'#666'}
              value={propietario}
              onChangeText={setPropietario}
            />
          </View>

          {/* Email Propietario */}
          <View style={styles.campo}>
            <Text style={styles.label}>Email Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Email Propietario"
              placeholderTextColor={'#666'}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Telefono Propietario */}
          <View style={styles.campo}>
            <Text style={styles.label}>Telefono Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Telefono Propietario"
              placeholderTextColor={'#666'}
              keyboardType="number-pad"
              value={telefono}
              onChangeText={setTelefono}
            />
          </View>

          {/* Fecha de la cita */}
          <View style={styles.campo}>
            <Text style={styles.label}>Fecha Alta</Text>
            <View style={styles.fechaContenedor}>
              <DatePicker
                date={fecha}
                locale="es"
                onDateChange={date => setFecha(date)}
              />
            </View>
          </View>

          {/* Sintomas */}
          <View style={styles.campo}>
            <Text style={styles.label}>Sintomas</Text>
            <TextInput
              style={[styles.input, styles.sintomasInput]}
              placeholder="Sintomas paciente"
              placeholderTextColor={'#666'}
              value={sintomas}
              onChangeText={setSintomas}
              multiline={true}
              numberOfLines={4}
            />
          </View>

          {/* Guardar Form */}
          <Pressable style={styles.btnNuevaCita} onPress={handleCita}>
            <Text style={styles.btnNuevaCitaTexto}>
              {' '}
              {pacienteObj.id ? 'Editar' : 'Agregar'} Paciente
            </Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  contenido: {
    backgroundColor: '#6D28D9',
    flex: 1,
  },
  titulo: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 30,
    color: '#fff',
  },
  tituloBold: {
    fontWeight: '900',
  },
  btnCancelar: {
    marginVertical: 30,
    backgroundColor: '#5827A4',
    marginHorizontal: 30,
    padding: 20,
    borderRadius: 10,
    // borderWidth: 1,
    // borderColor: '#fff',
  },
  btnCancelarTexto: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 20,
    textTransform: 'uppercase',
  },
  campo: {
    marginTop: 10,
    marginHorizontal: 30,
  },
  label: {
    color: '#fff',
    marginBottom: 10,
    marginTop: 15,
    fontSize: 20,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
  },
  sintomasInput: {
    height: 100,
  },
  fechaContenedor: {
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  btnNuevaCita: {
    marginVertical: 50,
    backgroundColor: '#f59e0b',
    paddingVertical: 15,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  btnNuevaCitaTexto: {
    textAlign: 'center',
    color: '#5827a4',
    fontWeight: '900',
    fontSize: 20,
    textTransform: 'uppercase',
  },
});

export default Formulario;

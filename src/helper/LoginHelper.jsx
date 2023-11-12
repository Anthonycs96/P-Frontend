  import axios from "axios";
  import toast from "react-hot-toast";
  import {useAuthStore}  from '../VariblesStore';

  const API_URL = "http://localhost:3000/api/auth";

  export async function authenticate(datos) {
    try {
      const response = await axios.post(`${API_URL}/signIn`, datos);
      if (response.data) {
        const { data } = response;
        //console.log(response);
        // Capturar el status de la respuesta
        const { status } = response;
        useAuthStore.getState().captureTokenFromAPI(data.token);
        useAuthStore.getState().capturarID(data.ID_USUARIO)
        useAuthStore.getState().captureStatusFromAPI(response.status);

        useAuthStore.setState({ token: data.token });
        toast.success("Inicio de sesión exitoso!");
        return data;
      } else {
        throw new Error('La respuesta del servidor no incluye datos');
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        navigate("/");
      } else {
        toast.error(
          "Ha ocurrido un error al iniciar sesión. Por favor, inténtelo de nuevo."
        );
      }
      throw error;
    }
  }
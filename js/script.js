const fecha = document.getElementById("fecha-actual");

if (fecha) {
    const hoy = new Date();
    fecha.textContent = hoy.toLocaleDateString("es-PE", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}
// ==========================================
// MÓDULO DE ALERTAS CLIMÁTICAS Y ODS 6
// ==========================================

// 1. DICCIONARIO DE DATOS CLIMÁTICOS Y RECOMENDACIONES
// Almacena la información de clima, nivel de afectación y acciones requeridas por ubicación.
const datosClimaticos = {
  "lima-centro": {
    clima: "Templado húmedo (18°C - 85% Humedad)",
    impacto: "Bajo",
    alertaTitulo: "Sin riesgo directo severo para la infraestructura",
    alertaMensaje: "Las condiciones meteorológicas son estables. No hay amenaza inmediata de rotura por heladas ni desabastecimiento por sequía.",
    acciones: [
      "Realizar inspección rutinaria de grifos y llaves de paso para prevenir microfugas.",
      "Revisar el medidor de agua una vez al mes para descartar consumo fantasma."
    ]
  },
  "lima-este": {
    clima: "Lluvias intensas estacionarias",
    impacto: "Alto",
    alertaTitulo: "¡Riesgo Alto! Posible turbidez y suspensión del servicio de agua",
    alertaMensaje: "Las fuertes lluvias en la cuenca alta aumentan la turbidez del río, lo que podría interrumpir la captación en la planta de tratamiento.",
    acciones: [
      "Almacenar agua en recipientes limpios con tapa para al menos 48 horas.",
      "Verificar que las tuberías externas no tengan filtraciones expuestas a la lluvia.",
      "Mantener cerradas las válvulas secundarias si la casa estará deshabitada."
    ]
  },
  "puno-altiplano": {
    clima: "Heladas extremas (-5°C en la madrugada)",
    impacto: "Alto",
    alertaTitulo: "¡Riesgo Severo! Congelamiento y rotura de tuberías",
    alertaMensaje: "Las temperaturas bajo cero congelan el agua acumulada dentro de las tuberías expuestas, pudiendo fracturarlas y causar grandes fugas al descongelarse.",
    acciones: [
      "Recubrir tuberías expuestas con material aislante (espuma, lana o cinta térmica).",
      "Dejar un grifo drenando a goteo mínimo durante la noche para evitar que el agua se estanque y congelé.",
      "Ubicar y verificar el funcionamiento de la llave general de paso para cerrarla rápido en caso de ruptura."
    ]
  },
  "piura-norte": {
    clima: "Ola de calor y sequía (33°C - Elevada evaporación)",
    impacto: "Medio",
    alertaTitulo: "Advertencia: Reducción de presión de agua por alta demanda",
    alertaMensaje: "El incremento de temperatura eleva el consumo global y reduce la presión disponible en la red pública.",
    acciones: [
      "Evitar el riego de jardines en horas de sol para reducir desperdicios por evaporación.",
      "Instalar aireadores en los grifos para mantener la sensación de presión consumiendo menos litros.",
      "Reportar inmediatamente fugas visibles en la vía pública o en el tanque elevado."
    ]
  }
};

// 2. SELECCIÓN DE ELEMENTOS DEL DOM
// Capturamos los elementos HTML mediante sus ID para manipularlos dinámicamente.
const selectUbicacion = document.getElementById("ubicacion-select");
const contenedorResultado = document.getElementById("clima-resultado");
const textoClimaEstado = document.getElementById("clima-estado-texto");
const cajaAlerta = document.getElementById("clima-alerta-box");
const tituloAlerta = document.getElementById("alerta-titulo");
const mensajeAlerta = document.getElementById("alerta-mensaje");
const listaAcciones = document.getElementById("lista-acciones");

// 3. FUNCIÓN DE ACTUALIZACIÓN DE LA INTERFAZ
function actualizarInformacionClimatica() {
  const ubicacionSeleccionada = selectUbicacion.value;
  const info = datosClimaticos[ubicacionSeleccionada];

  if (!info) return; // Si no hay datos, finaliza la ejecución

  // Criterio 1: Identificar y mostrar el clima de la ubicación
  textoClimaEstado.textContent = info.clima;

  // Criterio 2: Notificar al usuario sobre el grado de afectación
  tituloAlerta.textContent = info.alertaTitulo;
  mensajeAlerta.textContent = info.alertaMensaje;

  // Limpiar clases previas de estilo de alerta
  cajaAlerta.className = "alerta-box";

  // Asignar clase según nivel de riesgo/impacto
  if (info.impacto === "Alto") {
    cajaAlerta.classList.add("riesgo-alto");
  } else if (info.impacto === "Medio") {
    cajaAlerta.classList.add("riesgo-medio");
  } else {
    cajaAlerta.classList.add("riesgo-bajo");
  }

  // Criterio 3: Indicar las acciones recomendadas
  // Limpiamos la lista actual en el DOM antes de renderizar las nuevas acciones
  listaAcciones.innerHTML = "";

  // Iteramos sobre las acciones y creamos nodos <li> dinámicamente
  info.acciones.forEach(function(accion) {
    const itemLi = document.createElement("li");
    itemLi.textContent = accion;
    listaAcciones.appendChild(itemLi);
  });

  // Mostrar la sección de resultados removiendo la clase 'hidden'
  contenedorResultado.classList.remove("hidden");
}

// 4. REGISTRO DE EVENTO (EventListener)
// Escuchamos el evento 'change' en el selector de ubicación
selectUbicacion.addEventListener("change", actualizarInformacionClimatica);
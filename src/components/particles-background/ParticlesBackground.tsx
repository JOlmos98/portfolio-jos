"use client";                                           // Habilita el modo cliente en Next.js para usar funcionalidades específicas del navegador

import { useCallback } from "react";                   // Importa useCallback para memorizar funciones y evitar recrearlas en cada renderizado
import Particles from "react-tsparticles";             // Importa el componente Particles para renderizar las partículas
import type { Container, Engine } from "tsparticles-engine"; // Importa tipos para mejorar la tipificación con TypeScript
import { loadSlim } from "tsparticles-slim";           // Importa una versión reducida de tsparticles para optimizar el tamaño del paquete

export const ParticlesBackground = () => {             // Define un componente funcional para renderizar partículas
  const particlesInit = useCallback(async (engine: Engine) => { 
    await loadSlim(engine);                            // Inicializa el motor de partículas con la versión reducida
  }, []);                                              // Memoriza la función para que no se recree en cada renderizado

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    console.log("Particles loaded:", container);       // Muestra en consola cuando las partículas se han cargado correctamente
  }, []);                                              // Memoriza la función para evitar recrearla en cada renderizado

  const particlesOptions = {                           // Configuración para las partículas
    fullScreen: {                                      // Configuración de pantalla completa
      enable: true,                                    // Habilita el modo de pantalla completa
      zIndex: -1,                                      // Coloca las partículas detrás del contenido
    },
    particles: {                                       // Configuración de las partículas
      number: {                                        // Configuración de cantidad de partículas
        value: 50,                                     // Número inicial de partículas
        density: {                                     // Configuración de densidad
          enable: true,                                // Habilita la densidad
          area: 800,                                   // Área donde las partículas se distribuyen
        },
      },
      color: {                                         // Configuración del color de las partículas
        value: "#ffffff",                              // Define el color blanco para las partículas
      },
      shape: {                                         // Configuración de la forma de las partículas
        type: "circle",                                // Establece la forma como círculos
      },
      opacity: {                                       // Configuración de opacidad
        value: 0.5,                                    // Define una opacidad del 50%
      },
      size: {                                          // Configuración del tamaño de las partículas
        value: { min: 1, max: 5 },                     // Define un tamaño aleatorio entre 1 y 5
      },
      move: {                                          // Configuración del movimiento
        enable: true,                                  // Habilita el movimiento de las partículas
        speed: 2,                                      // Velocidad del movimiento
        direction: "none" as const,                    // Define que no hay una dirección específica
        outModes: {                                    // Configuración de salida de partículas
          default: "bounce" as const,                  // Las partículas rebotan en los bordes
        },
      },
    },
    interactivity: {                                   // Configuración de interactividad
      events: {                                        // Eventos de interacción
        onHover: {                                     // Evento al pasar el ratón sobre las partículas
          enable: true,                                // Habilita la interacción al pasar el ratón
          mode: "repulse",                             // Las partículas se repelen al pasar el ratón
        },
        onClick: {                                     // Evento al hacer clic en las partículas
          enable: true,                                // Habilita la interacción al hacer clic
          mode: "push",                                // Añade partículas al hacer clic
        },
      },
      modes: {                                        // Configuración de modos de interacción
        repulse: {                                    // Configuración del modo de repulsión
          distance: 100,                              // Define la distancia de repulsión
        },
        push: {                                       // Configuración del modo de empuje
          quantity: 4,                                // Cantidad de partículas añadidas al hacer clic
        },
      },
    },
    detectRetina: true,                               // Mejora la calidad en pantallas de alta resolución
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={particlesOptions}
    />
  );
};
/*

      id="tsparticles"                                // Identificador único para el componente de partículas
      init={particlesInit}                            // Llama a la función para inicializar el motor
      loaded={particlesLoaded}                        // Llama a la función cuando las partículas se han cargado
      options={particlesOptions}                      // Configuración definida para las partículas

*/
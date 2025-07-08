# Secuencia Perdida 🧩

[![Hazme click para jugar](https://img.shields.io/badge/JUGAR-AQUÍ-63f192?style=for-the-badge&logo=google-chrome&logoColor=white)](https://karateka2610.github.io/secuencia-perdida/)

---

## ¿Cómo jugar?

1. Observa la secuencia de números o letras y detecta el patrón lógico o matemático.
2. Escribe la respuesta que falta en el campo de texto y presiona Enter o el botón de check.
3. Usa las pistas si te atoras (máximo 3 por partida).
4. Tienes 3 vidas: cada error te quita una.
5. Sigue avanzando niveles y mejora tu racha y puntuación

## Características del Juego

### **Sistema de Juego**
- **Sistema de vidas global**: Solo 3 vidas para toda la partida
- **Anti-spam protection**: Previene exploits y trampas
- **Racha inteligente**: Se resetea correctamente al fallar
- **Pistas limitadas**: Solo 3 pistas estratégicas por partida
- **Dificultad progresiva**: Patrones más complejos en niveles avanzados

### **Tipos de Secuencias (13 tipos diferentes)**
- **Aritméticas**: Progresiones con diferencia constante
- **Geométricas**: Progresiones con razón constante
- **Fibonacci**: 4 variaciones diferentes incluyendo Tribonacci
- **Cuadrados perfectos**: n², números elevados al cuadrado
- **Números cúbicos**: n³, números elevados al cubo
- **Alfabéticas**: Patrones con letras y saltos
- **Números primos**: Secuencias de números primos
- **Triangulares**: Números triangulares (1, 3, 6, 10...)
- **Factoriales**: 1!, 2!, 3!, 4!...
- **Potencias**: Bases variables con exponentes crecientes
- **Catalan**: Números de Catalan matemáticos
- **Pentagonales**: Números pentagonales geométricos
- **Alternantes**: Patrones complejos alternados

### **Cálculo de Puntos**
```
Puntos = Base (10) + Nivel×2 + Racha×5 + Vidas×3 - Pista (5)
```

- **Puntos base**: 10 puntos por respuesta correcta
- **Bonus de nivel**: +2 puntos por cada nivel alcanzado
- **Bonus de racha**: +5 puntos por cada respuesta consecutiva correcta
- **Bonus de vidas**: +3 puntos por cada vida restante
- **Penalización**: -5 puntos si usas una pista

### **Mecánicas de Progresión**
- **Niveles 1-3**: Secuencias aritméticas básicas
- **Niveles 4-6**: Introducción de geométricas
- **Niveles 7-10**: Alfabéticas y Fibonacci
- **Niveles 11-15**: Cuadrados, primos, triangulares
- **Niveles 16-20**: Factoriales, potencias, Catalan
- **Niveles 21+**: Todas las secuencias con máxima dificultad

## Tecnologías y Arquitectura

### **Frontend**
- **HTML5 semántico** con estructura accesible
- **CSS3 avanzado** con variables y funciones modernas
- **JavaScript ES6+** con clases y módulos
- **Web Audio API** para generación de sonido en tiempo real
- **Responsive Grid/Flexbox** para layouts adaptativos

### **Sistema de Diseño**
- **Design tokens** con variables CSS organizadas
- **Componentes reutilizables** y modulares
- **Estados consistentes** para todos los elementos interactivos
- **Paleta de colores** cuidadosamente seleccionada
- **Tipografía escalable** con jerarquías claras

### **Patrones de Código**
- **Arquitectura orientada a objetos** con separación de responsabilidades
- **Gestión de estado** centralizada y predecible
- **Manejo de errores** robusto y user-friendly
- **Optimización de rendimiento** con throttling y debouncing
- **Código limpio** con comentarios y documentación

## Compatibilidad

### **Navegadores Soportados**
- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+
- Opera 74+

### **Dispositivos**
- **Desktop**: Experiencia completa optimizada
- **Tablet**: Layout adaptado con controles touch
- **Mobile**: Diseño responsive con gestos táctiles
- **Lectores de pantalla**: Completamente compatible

### **Shortcuts de Teclado**
- **Enter**: Enviar respuesta
- **Ctrl/Cmd + H**: Obtener pista
- **Ctrl/Cmd + N**: Nueva secuencia
- **Ctrl/Cmd + M**: Toggle audio
- **Escape**: Cerrar modal

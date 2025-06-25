<template>
  <div class="container-fluid p-0">
    <!-- Título de la Sección -->
    <div class="row no-gutters">
      <div class="section-title blog-title text-center">
        <h2 class="title">¡Encuéntranos aquí!</h2>
        <p>
          Visítanos en nuestra ubicación física y conoce más sobre nuestros servicios. 
          Estamos listos para ayudarte. Usa el mapa interactivo para llegar fácilmente a nuestras oficinas. 
          ¡Te esperamos!
        </p>
    </div>
  </div>

  <!-- Mapa de Google Maps -->
  <div class="row no-gutters">
    <div class="col-12">
      <div class="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.3517743557354!2d-65.2600836!3d-19.0482651!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93fbcf36656fb06b%3A0x5e4f23584d3c808f!2sPl.%2025%20de%20Mayo%2C%20Sucre!5e0!3m2!1ses-419!2sbo!4v1731473447163!5m2!1ses-419!2sbo"
          style="border: 0; width: 100%; height: 450px" allowfullscreen loading="lazy"
          referrerpolicy="no-referrer-when-downgrade" title="Google Maps"></iframe>
      </div>
    </div>
  </div>
  </div>
</template>

<style>
.map-container {
  border: 2px solid #0d6efd;
  /* Color del borde */
  border-radius: 10px;
  /* Bordes redondeados */
  overflow: hidden;
  /* Para que el iframe no sobresalga de los bordes redondeados */
  padding: 5px;
  /* Espaciado entre el marco y el iframe (opcional) */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  /* Sombra para darle profundidad */
}
</style>